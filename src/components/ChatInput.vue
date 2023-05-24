<script setup lang="ts">
import { ChatBubbleBottomCenterIcon } from '@heroicons/vue/20/solid'
import { Combobox, ComboboxInput } from '@headlessui/vue'
</script>

<template>
<Combobox class="transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
    <div class="relative">
        <ChatBubbleBottomCenterIcon class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400" aria-hidden="true" />
        <ComboboxInput class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" placeholder="Chat..." />
    </div>
</Combobox>
</template>