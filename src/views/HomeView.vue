<script setup lang="ts">
import { uniqueNamesGenerator, names, type Config } from 'unique-names-generator';
import { useAuth0 } from '@auth0/auth0-vue';
import { ref } from 'vue';

function spotlight<T>(a: Array<T>, n: number) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, n);
}

// TODO:
// chat types:
// - User (prompt)
// - Job (thinking)
// - Ai Reponse
// - Reponse Enchantments
// - 1. [X] Mermaid.js (Mermaid scripts) => diagrams
// - 2. [ ] JsonForms.io (jsonschema and/or uischema scripts) => form submit creates comment with jsoen results into script tag
// - 3. [?] Citations (citation scripts) => links to document with author, source, origin, provider, confidence, text and timestamp
// - Reponse Sudgestions
// - 1. [ ] Question => tell me more, sudgestions, etc
// - 2. [ ] Memorize => memorize this  comment
// - 3. [ ] Plan => create a plan for the this goal
// - Ai followup
// - 1. [ ] Answer => to Question Sudgestions
// - 1. [ ] Plan's Step => the results of the each step of plan int response to the run plan command.
// - 4. [?] Citations (citation scripts) => links to document with author, source, origin, provider, confidence, text and timestamp

/*
TODO: Personalities
@dalle - Artist
@jeeves - Question and Answer
@tessla - planner
@mary - Story Teller
@thor - Mythologist
+ Add your own using semtic skills
*/

const configBot: Config = {
  separator: ".",
  dictionaries: [names, names],
  style: "lowerCase",
}

const veterans = [
  {
    name: '@george',
    role: 'Conversationalist',
    bio: 'is your charming conversationalist, excels at engaging with others through meaningful dialogues. He makes sure that even the most complex ideas are articulated and understood in an approachable way, bringing our team closer together.',
    imageUrl: 'https://i.imgur.com/h1sVmBR.png',
  },
  {
    name: '@jeeves',
    role: 'Mentats',
    bio: 'is your chief knowledge curator. He helps you store, and retrieve memories, making sure we never lose a single valuable insight.',
    imageUrl: 'https://i.imgur.com/D19JghL.png',
  },
  {
    name: '@dalle',
    role: 'Artist',
    bio: 'is your resident artist, bringing creativity and imagination to everything they touch. Creating stunning visuals and captivating designs that bring your ideas to life.',
    imageUrl: 'https://i.imgur.com/8PhftEq.png',
  },
  {
    name: '@mary',
    role: 'Librarian',
    bio: 'is your guide through the vast web of interconencted services. She is the go-to for managing memory sources through our catalogue of providers.',
    imageUrl: 'https://i.imgur.com/L0nlbw2.png',
  },
  {
    name: '@tessla',
    role: 'Architect',
    bio: 'is your exceptional strategist and problem solver. Gifted with exceptional analytical abilities, they bring organization and clarity to even the most complex goals.',
    imageUrl: 'https://i.imgur.com/lW4OkVJ.png',
  },
  {
    name: '@shuri',
    role: 'Engineer',
    bio: 'is your brilliant engineer, responsible for designing, building, and maintaining the skills used by others. Her technical expertise and innovative solutions drive our team towards success and new heights of excellence.',
    imageUrl: 'https://i.imgur.com/C9xQbAy.png',
  },
]
const rookies = [
  {
    name: '@jiminy',
    role: 'Writer',
    bio: 'is your gifted storyteller, expertly weaving narratives that captivate and inspire our audience. Through his imaginative storytelling, he engages and transports us to new realms of possibilities.',
    imageUrl: 'https://i.imgur.com/uVjynIy.png',
  },
  {
    name: '@gale',
    role: 'Meteorologist',
    bio: 'is your weather expert, uses advanced scientific knowledge to predict and analyze weather patterns or just tell you if it is going to rain today.',
    imageUrl: 'https://i.imgur.com/H9vTZaQ.png',
  },
  {
    name: '@melanie',
    role: 'Musician',
    bio: 'is your personal music guide, helping you discover new songs and artists, and creating playlists tailored to your preferences. With her extensive knowledge of music, she always knows the perfect tune for any occasion.',
    imageUrl: 'https://i.imgur.com/5T1PfDc.png',
  },
  {
    name: '@skyler',
    role: 'Travel',
    bio: 'is your consultant for planning the perfect getaway. From finding hidden gems to organizing custom itineraries, their expertise ensures that every trip is memorable and stress-free.',
    imageUrl: 'https://i.imgur.com/JCyTEXa.png',
  },
  {
    name: '@theo',
    role: 'Cheif',
    bio: 'is your personal chef, sharing mouth-watering recipes, cooking tips, and meal planning ideas. With her culinary prowess, she makes every dining experience unforgettable.',
    imageUrl: 'https://i.imgur.com/UnSjzye.png',
  },
]
const assistant_name = ref(uniqueNamesGenerator(configBot))
const assistant_img = ref('https://placehold.co/100X100?text=' + assistant_name.value[0].toUpperCase())

const navigation = {
  solutions: [
    { name: 'George', href: '/team/#george' },
    { name: 'Dalle', href: '/team/#dalle' },
    { name: 'Jeeves', href: '/team/#jeeves' },
    { name: 'Tessla', href: '/team/#tessla' },
    { name: 'Mary', href: '/team/#mary' },
    { name: 'Shuri', href: '/team/#shuri' },
  ],
  system: [
    { name: 'Feeds', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Theme 🔆', href: '#' },
  ],
  support: [
    { name: 'About', href: '/about' },
    { name: 'Guides', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Status', href: '#' },
  ],
  account: [
    { name: 'Profile', href: '#' },
    { name: 'Intergreations', href: '#' },
    { name: 'Login', href: '/login' },
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/RGBKnights',
      icon: 'fa-brands fa-twitter',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/RGBKnights',
      icon: 'fa-brands fa-github',
    },
  ],
}
</script>

<template>
  <div class="relative isolate overflow-hidden bg-white">
    <svg class="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
      <defs>
        <pattern id="0787a7c5-978c-4f66-83c7-11c213f99cb7" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" stroke-width="0" fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
    </svg>
    <div class="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-10">
      <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
        <div class="flex">
          <img src="https://i.imgur.com/MpXedd3.png" class="w-48 h-48" alt="Volcano Lime" />
          <span class="pt-4 md:pt-8 text-6xl text-lime-500 font-logo">Volcano Lime</span>
        </div>
        <div class="mt-24 sm:mt-32 lg:mt-16">
          <div class="inline-flex space-x-6">
            <span class="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">What's new</span>
            <span class="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
              <span>Alpha</span>
            </span>
          </div>
        </div>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Introducing <span class="text-lime-500 font-bold text-lg">Volcano Lime</span> the collaborative Feed where you can seamlessly engage with AI agents .
          Our intelligent team members once invited are always ready to listen, think, and respond, ensuring a more efficient and productive teamwork experience between you and each other.
          Elevate your collaboration experience with our enhanced chat interface that supports markdown, images, diagrams, charts, forms and more, providing you with a dynamic and visually appealing workspace. 
          But wait there is more, with memory capabilities, Agents can easily recall information from long conversations, documents, pages, and various other sources, thanks to our open source memory providers.
        </p>
        <div class="mt-10 flex items-center gap-x-6">
          <a href="/welcome" class="rounded-md bg-lime-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">Get started</a>
          <a href="/history" class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Feeds</a>
          <a href="/about" class="text-sm font-semibold leading-6 text-gray-900">About <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <div class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-32 lg:max-w-none lg:flex-none xl:ml-32">
        <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
          <div class="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <img src="https://placehold.co/2432x1442?text=Hello+Volcano+Lime" alt="App screenshot" width="2432" height="1442" class="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="bg-white py-12 sm:py-24">
      <div class="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">Meet the Team!</h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Our team is your team
          </p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            We are proud of our diverse, talented and fictional team, which is dedicated to providing you the best possible services with their respective AI skills.
          </p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Our actors are designed to be your personal assistants each speicalized with unique skills, pinch of their own personality and are here to help.
          </p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            We are always looking for more talented adgents to join our team. See our github project for open positions.
          </p>
        </div>
        <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-6 xl:col-span-2">
          <li class="col-span-2">
            <div class="relative">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center">
                <span class="bg-white px-2 text-sm text-gray-500">AI Veterans</span>
              </div>
            </div>
          </li>
          <li v-for="person in veterans" :key="person.name">
            <div class="flex items-center gap-x-6">
              <img class="h-16 w-16 rounded-full" :src="person.imageUrl" alt="" />
              <div>
                <h3 class="text-base font-semibold leading-7 tracking-tight text-gray-900">{{ person.name }}</h3>
                <p class="text-sm font-semibold leading-6 text-indigo-600">{{ person.role }}</p>
                <p class="text-xs text-gray-400">{{ person.bio }}</p>
              </div>
            </div>
          </li>
          <li class="col-span-2">
            <div class="relative">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center">
                <span class="bg-white px-2 text-sm text-gray-500">AI Rookies Spotlight</span>
              </div>
            </div>
          </li>
          <li v-for="person in spotlight(rookies, 2)" :key="person.name">
            <div class="flex items-center gap-x-6">
              <img class="h-16 w-16 rounded-full" :src="person.imageUrl" alt="" />
              <div>
                <h3 class="text-base font-semibold leading-7 tracking-tight text-gray-900">{{ person.name }}</h3>
                <p class="text-sm font-semibold leading-6 text-indigo-600">{{ person.role }}</p>
                <p class="text-xs text-gray-400">{{ person.bio }}</p>
              </div>
            </div>
          </li>
          <li class="col-span-2">
            <div class="relative">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center">
                <span class="bg-white px-2 text-sm text-gray-500">AI Made to Order</span>
              </div>
            </div>
          </li>
          <li>
            <div class="flex items-center gap-x-6">
              <img class="h-16 w-16 rounded-full" :src="assistant_img" alt="" />
              <div>
                <h3 class="text-base font-semibold leading-7 tracking-tight text-gray-900">@{{ assistant_name }}</h3>
                <p class="text-sm font-semibold leading-6 text-indigo-600">Assistant</p>
                <p class="text-xs text-gray-400">Your custom agent created from our functions and/or your semantic skills.</p>
              </div>
            </div>
          </li>
          <li>
            <span class="text-sm italic leading-6 text-gray-400">
              No complex menus, no endlesss lists of commands, no custom builders and no code needed! 
              Just chat with <span class="text-lime-500">@shuri</span> and they will help you craft new semantic skills, use functions from our providers, and craft a personality for your adgent.
            </span>
          </li>
          <li class="col-span-2">
            <div class="relative">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center">
                <span class="bg-white px-2 text-sm text-gray-500">Users</span>
              </div>
            </div>
          </li>
          <li>
            <span class="text-sm italic leading-6 text-gray-400">
              Right now everything you create is private. We are working hard to unlock the ability to share feeds with other users and collaborator together with your team and ours.
            </span>
          </li>
          <li >
            <div class="flex items-center gap-x-6">
              <img class="h-16 w-16 rounded-full" src="https://placehold.co/100X100?text=me" alt="" />
              <div>
                <h3 class="text-base font-semibold leading-7 tracking-tight text-gray-900">@me</h3>
                <p class="text-sm font-semibold leading-6 text-indigo-600">User</p>
                <p class="text-xs text-gray-400">You, the user, are the most important part of the team. You are the reason we do what we do.</p>
              </div>
            </div>
          </li>
          
        </ul>
      </div>
    </div>
  </div>

  <footer class="bg-white" aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-4">
          <div>
            <img src="https://i.imgur.com/lPkdSu2.png" class="w-6 h-6 inline" /><img src="https://i.imgur.com/mYwoufP.png" class="w-8 h-8 inline" />
          </div>
          <blockquote>
            <p class="text-xs italic text-gray-600">While we are still in the early stages of development, we are excited to share our progress with you and hope you enjoy our work.</p>
          </blockquote>
          <div class="flex space-x-6">
            <a v-for="item in navigation.social" :key="item.name" :href="item.href" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">{{ item.name }}</span>
              <font-awesome-icon :icon="item.icon" class="h-6 w-6" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold leading-6 text-gray-900">Agents</h3>
              <ul role="list" :class="['marker:text-lime-500','mt-6 space-y-4 list-disc transition-all duration-200']">
                <li v-for="item in navigation.solutions" :key="item.name">
                  <a :href="item.href" class="text-sm leading-6 text-gray-600 hover:text-gray-900">{{ item.name }}</a>
                </li>
              </ul>
            </div>
            <div class="mt-10 md:mt-0">
              <h3 class="text-sm font-semibold leading-6 text-gray-900">Support</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in navigation.support" :key="item.name">
                  <a :href="item.href" class="text-sm leading-6 text-gray-600 hover:text-gray-900">{{ item.name }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold leading-6 text-gray-900">System</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in navigation.system" :key="item.name">
                  <a :href="item.href" class="text-sm leading-6 text-gray-600 hover:text-gray-900">{{ item.name }}</a>
                </li>
              </ul>
            </div>
            <div class="mt-10 md:mt-0">
              <h3 class="text-sm font-semibold leading-6 text-gray-900">Account</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in navigation.account" :key="item.name">
                  <a :href="item.href" class="text-sm leading-6 text-gray-600 hover:text-gray-900">{{ item.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
        <p class="text-xs leading-5 text-gray-500">&copy; 2023 Venatio Studios. Working with AI before it was cool.</p>
      </div>
    </div>
  </footer>

</template>

<style>
</style>