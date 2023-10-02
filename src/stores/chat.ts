import { nextTick, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useAuth0 } from '@auth0/auth0-vue'
import * as signalR from '@microsoft/signalr'
import { Api, Role, type GoalDocument, type MessageDocument } from '@/api/electric-raspberry'


export interface ChatState {
  isLoading: boolean,
  messages: MessageDocument[]
}

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

function handleAnyType(result: any): string {
  if (result === null) {
    return "null";
  }

  if (typeof result === "undefined") {
    return "undefined";
  }

  if (result instanceof Error) {
    return `${result.name}: ${result.message}`;
  }

  if (typeof result === "string") {
    return result;
  }

  if (typeof result === "number" || typeof result === "boolean") {
    return result.toString();
  }

  if (Array.isArray(result)) {
    return JSON.stringify(result);
  }

  if (result instanceof Date) {
    return result.toISOString();
  }

  if (typeof result === "object") {
    return JSON.stringify(result);
  }

  if (typeof result === "function") {
    return result.toString();
  }

  if (typeof result === "symbol") {
    return result.toString();
  }

  return "Unknown type";
}

export const useChatStore = defineStore('chat', () => {
  const { getAccessTokenSilently } = useAuth0()

  const chat = reactive<ChatState>({
    isLoading: false,
    messages: []
  })

  const connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.None)
    .withUrl(import.meta.env.VITE_API + '/hub/feed', {
      accessTokenFactory: getAccessTokenSilently
    })
    .build()

  connection.on('AskQuestion', async (question) => {
    let promise = new Promise((resolve, reject) => {
      try {
        let answer = prompt(question)
        resolve(answer)
      } catch (e) {
        resolve(`Unable to answer: ${question}`)
      }
    });
    return promise;
  })

  connection.on('EvalCode', async (code) => {
    console.log("Code:", code)
    let promise = new Promise(async (resolve, reject) => {
      try {
        document.getElementById("sandbox")?.replaceChildren()
        let fn = new AsyncFunction(code)
        let result = await fn()
        let response = handleAnyType(result)
        resolve(response)
        console.log("Result:", response)
      } catch (e) {
        console.error("Error:", e)
        let response = handleAnyType(e)
        reject(response)
      }
    });
    return promise
  })

  async function getController(): Promise<Api<unknown>> {
    const token = await getAccessTokenSilently()
    const client = new Api({
      headers: {
        Authorization: `Bearer ${token}`
      },
      baseURL: import.meta.env.VITE_API
    })
    return client
  }
  function scrollToBottom() {
    setTimeout(() => {
      document.getElementById('anchor')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
  async function submit(goal: string): Promise<void> {
    try {
      chat.messages.push({
        role: Role.User,
        content: goal,
        logs: [],
        show: false,
      })
      scrollToBottom()
      chat.isLoading = true
      const controller = await getController()
      await connection.start()
      const dto = {
        messages: chat.messages.slice(0, -1),
        goal: goal,
        connectionId: connection.connectionId
      } as GoalDocument
      const { data: msg } = await controller.api.goal(dto)
      chat.messages.push(msg)
      scrollToBottom()
      await connection.stop()
    } finally {
      chat.isLoading = false
    }
  }

  return {
    chat,
    submit
  }
})
