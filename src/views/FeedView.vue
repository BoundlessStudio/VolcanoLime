<script setup lang="ts">
import { FeedAccess, type CommentDocument, type FeedDocument } from '@/api/electric-raspberry'
import { nextTick, ref, watch } from 'vue'
import { formatTimeAgo } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { useThreadStore } from '@/stores//thread'
import { MdPreview, config } from 'md-editor-v3'
import MarkdownIt from 'markdown-it'
import FeedEditPanel from '@/components/FeedEditPanel.vue'
import FeedPrompt from '@/components/FeedPrompt.vue'
import Header from '@/components/Header.vue'

config({
  markdownItConfig: (md: MarkdownIt) => {
    var fence = md.renderer.rules.fence
    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
      const token = tokens[idx]
      if (token.info == 'chart') {
        return `<img src="https://quickchart.io/chart?c=${encodeURIComponent(
          token.content
        )}" title="" alt="Chart" zoom="" class="medium-zoom-image">`
      } else {
        return fence ? fence(tokens, idx, options, env, self) : ''
      }
    }
  }
})

const route = useRoute()
const { getFeed, listComments, createComment, deleteComment, start, joinFeed, onCommentsChanged } =
  useThreadStore()

const loading = ref(true)

const id = ref<string>('')
const open = ref(false)

const feed = ref<FeedDocument>()
const comments = ref<CommentDocument[]>([])

onCommentsChanged(async (args) => {
  if (id.value == args.feedId) {
    await loadComments()
  }
})

const loadFeed = async () => {
  feed.value = await getFeed(id.value)
}
const loadComments = async () => {
  comments.value = await listComments(id.value)
  nextTick(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })
}

const addComment = async (prompt: string) => {
  const dto = {
    body: prompt,
    feedId: id.value,
    type: 'comment'
  }
  const comment = await createComment(dto)
  comments.value.push(comment)
  await nextTick()
  window.scrollTo(0, document.body.scrollHeight)
  counter.value = 0
}

const removeComment = async (id: string | undefined | null) => {
  if (id) {
    await deleteComment(id)
    comments.value = comments.value.filter((c) => c.commentId !== id)
  }
}

const fromNow = (date?: string) => {
  if (date) {
    return formatTimeAgo(new Date(date))
  } else {
    return ''
  }
}

watch(
  () => route.params.id,
  async (newId) => {
    loading.value = true
    id.value = newId as string
    await start()
    await loadFeed()
    await loadComments()
    await joinFeed(id.value)
    loading.value = false
    await nextTick()
    window.scrollTo(0, document.body.scrollHeight)
  },
  { immediate: true }
)

const counter = ref(0)
setInterval(() => {
  counter.value++
}, 1000)
</script>

<!-- 
TOOD: Add Mock Comments to Test UI 
[-] Comment (info) [MARKDOWN]
[x] File (data) [URLS]/[MARKDOWN]
[x] Answer (summarized memories) [MARKDOWN]
[x] Plan (kernel planner) (JSON) => [MARKDOWN]
[x] Objective(s) (kernel results) [Status] => Result[MARKDOWN]
[x] UI? (forms.io) (JSON/SCHEMA/LAYOUT) => [MARKDOWN]
-->

<template>
  <FeedEditPanel :id="id" :show="open" @canceled="open = false" @saved="loadFeed"></FeedEditPanel>

  <div v-if="loading">
    <div class="flex h-screen">
      <div class="m-auto text-center">
        <img src="https://i.imgur.com/MpXedd3.png" class="animate-pulse w-32 h-32" />
        <span>Loading</span>
      </div>
    </div>
  </div>
  <div v-else class="container max-w-5xl">
    <Header />
    <div class="relative py-3">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300" />
      </div>
      <div class="relative flex justify-center">
        <div class="w-full flex justify-between">
          <div class="bg-white px-1 text-lg text-gray-500">
            <span>{{ feed?.name }}</span>
          </div>
          <div @click="open = true" class="bg-white px-1 text-lg text-gray-500">
            <font-awesome-icon icon="pen-to-square" class="" title="Public" />
          </div>
        </div>
      </div>
    </div>
    <div class="px-4 pb-3">
      <div class="text-sm text-gray-500">
        <div v-if="feed?.access == FeedAccess.Private">
          <span>Access: Private </span>
          <font-awesome-icon icon="lock" />
        </div>
        <div v-else>
          <span>Access: Public </span>
          <font-awesome-icon icon="users" />
        </div>
      </div>
      <div>
        <span class="bg-white px-1 text-xs italic text-gray-500">{{ feed?.description }}</span>
      </div>
    </div>
    <div class="pt-1 pb-3">
      <ul role="list" class="space-y-6">
        <template v-for="(item, ix) in comments">
          <li>
            <div class="flex parent">
              <div class="w-1/12">
                <div class="h-full relative">
                  <div
                    :class="[
                      item.inContext == true && item.type == 'comment'
                        ? 'border-green-600'
                        : item.inContext == false && item.type == 'comment'
                        ? 'border-red-600'
                        : 'border-neutral-400 border-dashed',
                      'absolute top-0 left-[50%] h-full border-l-2'
                    ]"
                  ></div>
                  <div
                    :class="[
                      item.inContext == true && item.type == 'comment'
                        ? 'border-green-600'
                        : item.inContext == false && item.type == 'comment'
                        ? 'border-red-600'
                        : 'border-neutral-400 border-dashed',
                      'absolute -bottom-6 left-[50%] h-6 border-l-2'
                    ]"
                  ></div>
                  <div class="w-full flex justify-center">
                    <img
                      :src="item.author.picture"
                      alt=""
                      class="relative h-7 w-7 md:h-9 md:w-9 flex-none rounded-full bg-gray-50 transition-all"
                    />
                  </div>
                </div>
              </div>
              <div class="w-11/12">
                <div class="flex justify-between pb-1">
                  <div>
                    <div>
                      <time
                        :datetime="item.timestamp"
                        class="flex-none text-xs leading-5 text-gray-500"
                        >{{ fromNow(item.timestamp) }}</time
                      >
                    </div>
                    <div class="flex">
                      <span class="text-xs">{{ item.author.name }} {{ item.type }}</span>
                    </div>
                  </div>
                  <div class="child transition-all">
                    <div @click="removeComment(item.commentId)" class="text-gray-400">
                      <font-awesome-icon icon="eraser" />
                    </div>
                  </div>
                </div>
                <div
                  v-if="item.type == 'comment'"
                  class="rounded-md p-1 pt-4 ring-1 ring-inset ring-gray-200 text-sm text-gray-500"
                >
                  <MdPreview
                    :editor-id="`editor-${item.commentId}`"
                    v-model="item.body"
                    previewTheme="github"
                  ></MdPreview>
                </div>
                <div
                  v-if="item.type == 'planing'"
                  class="rounded-md p-1 pt-4 ring-1 ring-inset ring-gray-200 text-sm text-gray-500"
                >
                  <MdPreview
                    :editor-id="`editor-${item.commentId}`"
                    v-model="item.body"
                    previewTheme="github"
                  ></MdPreview>
                </div>
                <div v-if="item.type == 'memory'">
                  <span class="text-xs">{{ item.body }}</span>
                </div>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <FeedPrompt :id="id" @submit="addComment"></FeedPrompt>
  </div>
</template>

<style scoped>
.parent .child {
  visibility: hidden;
}
.parent:hover .child {
  visibility: visible;
}
</style>
