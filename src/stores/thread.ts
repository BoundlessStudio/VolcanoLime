import { reactive } from 'vue'
import { createEventHook } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useAuth0 } from '@auth0/auth0-vue'
import { uniqueNamesGenerator, colors, animals, type Config } from 'unique-names-generator'
import * as signalR from '@microsoft/signalr'
import {
  Api,
  type FeedDocument,
  type FeedCreateDocument,
  type FeedEditDocument,
  type CommentCreateDocument,
  type CommentDocument,
  type FileDocument,
  type SkillDocument
} from '@/api/electric-raspberry'

export interface ThreadState {
  connected: Boolean
}

export interface FeedArgs {
  feedId: string
}
export interface CommentArgs {
  feedId: string
}

const config: Config = {
  dictionaries: [colors, animals],
  separator: '-',
  length: 2
}

export const useThreadStore = defineStore('thread', () => {
  const { getAccessTokenSilently } = useAuth0()

  const state = reactive<ThreadState>({
    connected: false
  })

  const connection = new signalR.HubConnectionBuilder()
    .withUrl(import.meta.env.VITE_API + '/hub/feed', {
      accessTokenFactory: getAccessTokenSilently
    })
    .build()

  connection.onclose(() => {
    state.connected = false
  })
  connection.onreconnected(() => {
    state.connected = true
  })

  // const feedDeleted = createEventHook<FeedArgs>()
  // connection.on("onFeedDeleted", (feedId) => {
  //   feedDeleted.trigger({ feedId })
  // })
  // const feedChanged = createEventHook<FeedArgs>()
  // connection.on("onFeedChanged", (feedId) => {
  //   feedChanged.trigger({ feedId })
  // })
  const commentsChanged = createEventHook<CommentArgs>()
  connection.on('onCommentsChanged', async (feedId) => {
    commentsChanged.trigger({ feedId })
  })

  async function start() {
    if (connection.state == signalR.HubConnectionState.Disconnected) {
      await connection.start()
      state.connected = true
    }
  }
  async function joinFeed(feedId: string): Promise<void> {
    await connection.invoke('JoinFeed', feedId)
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
  async function listSkills(): Promise<SkillDocument[]> {
    const controller = await getController()
    const response = await controller.api.listSkills()
    return response.data || []
  }
  async function createFeed(template: string): Promise<FeedDocument> {
    const controller = await getController()
    const dto = {
      name: uniqueNamesGenerator(config),
      template: template
    } as FeedCreateDocument
    const { data: feed } = await controller.api.createFeed(dto)
    return feed
  }
  async function listFeeds(): Promise<FeedDocument[]> {
    const controller = await getController()
    const response = await controller.api.listFeeds()
    return response.data || []
  }
  async function getFeed(id: string): Promise<FeedDocument> {
    const controller = await getController()
    const { data: feed } = await controller.api.getFeed(id)
    return feed
  }
  async function editFeed(feed: FeedEditDocument): Promise<void> {
    const controller = await getController()
    await controller.api.editFeed(feed)
  }
  async function deleteFeed(id: string): Promise<void> {
    const controller = await getController()
    await controller.api.deleteFeed(id)
  }
  async function listComments(id: string) {
    const controller = await getController()
    const response = await controller.api.listComments(id)
    return response.data || []
  }
  async function createComment(body: CommentCreateDocument): Promise<CommentDocument> {
    const controller = await getController()
    const { data: comment } = await controller.api.createComment(body)
    return comment
  }
  async function deleteComment(id: string): Promise<void> {
    const controller = await getController()
    await controller.api.deleteComment(id)
  }
  async function uploadFiles(id: string, files: File[]): Promise<FileDocument[]> {
    const controller = await getController()
    const response = await controller.api.upload(id, {
      files: files
    })
    return response.data
  }

  return {
    state,
    start,
    listSkills,
    createFeed,
    listFeeds,
    getFeed,
    editFeed,
    deleteFeed,
    joinFeed,
    listComments,
    createComment,
    deleteComment,
    uploadFiles,
    onCommentsChanged: commentsChanged.on
  }
})
