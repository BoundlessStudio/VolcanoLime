import { reactive } from 'vue'
import { nextTick } from 'vue'
import { defineStore } from 'pinia'
import { useAuth0 } from '@auth0/auth0-vue'
import * as signalR from '@microsoft/signalr'
import { Api, type FileDocument, type GoalDocument } from '@/api/electric-raspberry'

export interface ThreadState {
  connectionId: string | null
  connected: Boolean,
  logs: string[]
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

export const useThreadStore = defineStore('thread', () => {
  const { getAccessTokenSilently } = useAuth0()

  const thread = reactive<ThreadState>({
    connectionId: null,
    connected: false,
    logs: []
  })

  const connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.None)
    .withAutomaticReconnect()
    .withUrl(import.meta.env.VITE_API + '/hub/feed', {
      accessTokenFactory: getAccessTokenSilently
    })
    .build()

  connection.onclose(() => {
    thread.connected = false
    console.log("connection:closed", thread.connectionId)
  })
  connection.onreconnected(() => {
    thread.connected = true
    thread.connectionId = connection.connectionId
    console.log("connection:reconnected", thread.connectionId)
  })

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

  connection.on('Log', (log) => {
    try {
      const passive = window.innerHeight + window.scrollY >= document.body.offsetHeight

      thread.logs.push(log)

      if(log.includes("Function execution finished")) {
        setTimeout(() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'}), 500)
        return
      }
      if(passive) {
        setTimeout(() => window.scrollTo({top: 999999, left: 0, behavior: 'smooth'}), 500)
      }
    } finally {
      // do nothing
    }
  })

  async function initialize() {
    if (connection.state == signalR.HubConnectionState.Disconnected) {
      await connection.start()
      thread.connectionId = connection.connectionId
      thread.connected = true
      thread.logs = []
    }
  }

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
  async function createGoal(goal: string): Promise<string> {
    const controller = await getController()
    const dto = {
      goal: goal,
      connectionId: thread.connectionId
    } as GoalDocument
    thread.logs = []
    const { data: result } = await controller.api.goal(dto)
    return result
  }
  async function uploadFiles(files: File[]): Promise<FileDocument[]> {
    const controller = await getController()
    const response = await controller.api.upload({
      files: files
    })
    return response.data
  }

  return {
    thread,
    initialize,
    createGoal,
    uploadFiles
  }
})
