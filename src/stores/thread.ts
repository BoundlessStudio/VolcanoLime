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

export const useThreadStore = defineStore('thread', () => {
  const { getAccessTokenSilently } = useAuth0()

  const thread = reactive<ThreadState>({
    connectionId: null,
    connected: false,
    logs: []
  })

  const connection = new signalR.HubConnectionBuilder()
    .withAutomaticReconnect()
    .withUrl(import.meta.env.VITE_API + '/hub/feed', {
      accessTokenFactory: getAccessTokenSilently
    })
    .build()

  connection.onclose(() => {
    thread.connected = false
  })
  connection.onreconnected(() => {
    thread.connected = true
    thread.connectionId = connection.connectionId
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
    let promise = new Promise(async (resolve, reject) => {

      let _log = console.log
      let _error = console.error
      let response = {
        result: '',
        logs: [] as string[],
        errors: [] as string[],
      }

      try {
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

        console.log = (m) => response.logs.push(JSON.stringify(m))
        console.error = (m) => response.errors.push(JSON.stringify(m))
        
        let fn = new AsyncFunction(code)
        let result = await fn()

        response.result = result ? JSON.stringify(result) : "The function executed successfully."
        resolve(JSON.stringify(response))
      } catch (e) {
        response.result = "The function throw an exception."
        
        if (e instanceof Error) {
          response.errors.push(JSON.stringify({name: e.name, message: e.message}))
        } else if (typeof e === "string") {
          response.errors.push(e)
        } else if (typeof e === "object") {
          response.errors.push(e ? JSON.stringify(e) : "Unknown error.")
        } else {
          response.errors.push("Unknown error.")
        }
        
        resolve(JSON.stringify(response))
      } finally {
        console.log = _log
        console.error = _error
      }
    });
    return promise;
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
