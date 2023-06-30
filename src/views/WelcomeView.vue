<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useThreadStore } from '@/stores/thread';

const router = useRouter();
const { createFeed } = useThreadStore()

const create = async (template: string) => {
  var feed = await createFeed(template)
  router.push({ name: 'feed', params: { id: feed.feedId } })
}

const faqs = [
  {
    question: 'How do you make holy water?',
    answer:
      'You boil the hell out of it.',
  },
  {
    question: 'What is the best thing about Switzerland?',
    answer:
      'I do not know, but the flag is a big plus.',
  },
  {
    question: 'What do you call someone with no body and no nose?',
    answer:
      'Nobody knows!',
  },
  {
    question: 'Why do you never see elephants hiding in trees?',
    answer:
      'Because they are so good at it.',
  },
]

const items = [
  {
    name: 'Empty Feed',
    description: 'A void for you to fill with your dreams.',
    template: 'empty',
    iconColor: 'bg-indigo-500',
    icon: 'plus',
    link: 'chevron-right'
  },
  {
    name: 'Marketing Campaign',
    description: 'I think the kids call these memes these days.',
    template: 'marketing',
    iconColor: 'bg-pink-500',
    icon: 'bullhorn',
    link: 'lock'
  },
  {
    name: 'Engineering Project',
    description: 'Something really expensive that will ultimately get cancelled.',
    template: 'project',
    iconColor: 'bg-purple-500',
    icon: 'compass-drafting',
    link: 'lock'
  },
  {
    name: 'Event',
    description: 'Like a conference all about you that no one will care about.',
    template: 'event',
    iconColor: 'bg-yellow-500',
    icon: 'calendar',
    link: 'lock'
  },
]
</script>

<template>
  <div class="container max-w-3xl">
    <div class="py-6">
      <div class="lg:grid lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-5">
          <h2 class="text-lg font-bold leading-10 tracking-tight  text-gray-900">Frequently Asked Questions</h2>
          <p class="mt-4 text-sm italic leading-6 text-gray-600">
            Can't find the answer you're looking for? Just click the Empty Feed and <span class="text-lime-500">@george</span> as message. 
            They love to chat although sometimes makes things up.
          </p>
        </div>
        <div class="mt-10 lg:col-span-7 lg:mt-0">
          <dl class="space-y-10">
            <div v-for="faq in faqs" :key="faq.question">
              <dt class="text-base font-semibold leading-7 text-gray-900">{{ faq.question }}</dt>
              <dd class="mt-2 text-base leading-7 text-gray-600">{{ faq.answer }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
    <div>
      <hr />
    </div>
    <div class="mx-auto py-6">
      <h2 class="text-base font-semibold leading-6 text-gray-900">Create a new feed</h2>
      <p class="mt-1 text-sm text-gray-500">Get started by selecting a template or start from an empty feed.</p>
      <ul role="list" class="mt-6 divide-y divide-gray-200 border-b border-t border-gray-200">
        <li v-for="(item, itemIdx) in items" :key="itemIdx">
          <div class="group relative flex items-start space-x-3 px-2 py-4 hover:bg-gray-200">
            <div class="flex-shrink-0">
              <span :class="[item.iconColor, 'inline-flex h-10 w-10 items-center justify-center rounded-lg']">
                <font-awesome-icon :icon="item.icon" class="h-6 w-6 text-white" aria-hidden="true" />
              </span>
            </div>
            <div class="min-w-0 flex-1">
              <div class="text-sm font-medium text-gray-900">
                <a @click="create(item.template)" href="#">
                  <span class="absolute inset-0" aria-hidden="true" />
                  {{ item.name }}
                </a>
              </div>
              <p class="text-sm text-gray-500">{{ item.description }}</p>
            </div>
            <div class="flex-shrink-0 self-center">
              <font-awesome-icon :icon="item.link" class="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
            </div>
          </div>
        </li>
      </ul>
     
    </div>
  </div>
</template>

<style scoped></style>
