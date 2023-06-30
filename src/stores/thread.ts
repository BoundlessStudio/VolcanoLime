import { reactive } from 'vue'
import { createEventHook } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useAuth0 } from "@auth0/auth0-vue"
import { uniqueNamesGenerator, colors, animals,  type Config } from 'unique-names-generator'
import * as signalR from "@microsoft/signalr"
import { Api, type FeedDocument, type FeedCreateDocument, type FeedEditDocument, type CommentCreateDocument, type CommentDocument } from '@/api/electric-raspberry'

export interface ThreadState {
  connected: Boolean
}

export interface FeedArgs {
  feedId: string
}
export interface CommentArgs {
  feedId: string,
  commentId: string
}

const config: Config = {
  dictionaries: [colors, animals],
  separator: '-',
  length: 2,
}

export const useThreadStore = defineStore('thread', () => {
  const { getAccessTokenSilently } = useAuth0()
 
  const state = reactive<ThreadState>({
    connected: false
  })

  const connection = new signalR.HubConnectionBuilder()
    .withUrl('https://electric-raspberry.ngrok.app/hub/feed', { 
      accessTokenFactory: getAccessTokenSilently,
    }).build()

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
  connection.on("onCommentsChanged", async (feedId, commentId) => {
    commentsChanged.trigger({ feedId, commentId })
  })

  async function start() {
    if(connection.state == signalR.HubConnectionState.Disconnected) {
      await connection.start()
      state.connected = true
    }
  }
  async function joinFeed(feedId: string): Promise<void> {
    await connection.invoke("JoinFeed", feedId)
  }
  async function getController(): Promise<Api<unknown>> {
    const token = await getAccessTokenSilently()
    const client = new Api({ 
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return client
  }

  async function createFeed(template: string) : Promise<FeedDocument> {
    const controller = await getController()
    var dto = {
      name: uniqueNamesGenerator(config),
      template: template
    } as FeedCreateDocument
    var {data: feed} = await controller.api.createFeed(dto)
    return feed
  }
  async function listFeeds() : Promise<FeedDocument[]> {
    const controller = await getController()
    var reponse = await controller.api.listFeed()
    return reponse.data || []
  }
  async function getFeed(id: string) : Promise<FeedDocument> {
    const controller = await getController()
    var {data: feed} = await controller.api.getFeed(id)
    return feed
  }
  async function editFeed(feed: FeedEditDocument) : Promise<void> {
    const controller = await getController()
    await controller.api.editFeed(feed)
  }
  async function deleteFeed(id: string) : Promise<void> {
    const controller = await getController()
    await controller.api.deleteFeed(id)
  }
  async function listComments(id: string) {
    const controller = await getController()
    const reponse = await controller.api.listComments(id)
    return reponse.data || []
  }
  async function createComment(body: CommentCreateDocument): Promise<CommentDocument>  {
    const controller = await getController()
    var {data: comment} = await controller.api.createComment(body)
    return comment
  }
  async function deleteComment(id: string): Promise<void>  {
    const controller = await getController()
    await controller.api.deleteComment(id)
  }
  
  return { 
    state, 
    start, createFeed, listFeeds, getFeed, editFeed, deleteFeed, joinFeed, listComments, createComment, deleteComment,
    onCommentsChanged: commentsChanged.on
  }
})

