<script setup lang="ts">
import { useWindowSize, useDebounceFn } from '@vueuse/core'
import { MdEditor, NormalToolbar  } from "md-editor-v3";
import { ref, watch } from "vue";

type ToolbarNames = number | 'pageFullscreen' | '=' | '-';

const editorRef = ref<typeof MdEditor>()
const toolbars = ref<ToolbarNames[]>([0,'pageFullscreen'])
const { width } = useWindowSize()
const message = ref('')

const hidePreview = useDebounceFn(() => {
  editorRef.value?.togglePreview();
}, 100)

const showPreview = useDebounceFn(() => {
  editorRef.value?.togglePreview();
}, 100)

watch(
  () => width.value,
  async width => {
    if(width > 1024) {
      await showPreview();
    } else{
      await hidePreview();
    }
  }
)
</script>

<template>
  <div class="flex items-start space-x-4">
    <div class="min-w-0 flex-1">
      <form action="#">
        <div class="border-b border-gray-200 focus-within:border-indigo-600">
          <MdEditor ref="editorRef" v-model="message" :toolbars="toolbars" language="en-US" codeTheme="github" previewTheme="github" >
            <template #defToolbars>
              <NormalToolbar title="whisper" @onClick="() => {}">
                <template #trigger>
                  <font-awesome-icon icon="fa-microphone" />
                </template>
              </NormalToolbar>
            </template>
          </MdEditor>
        </div>
        <div class="flex justify-between pt-2">
          <div class="flex items-center space-x-5">
            <div class="flow-root">
              <!-- Footer Left -->
            </div>
          </div>
          <div class="flex-shrink-0">
            <button type="submit"
              class="inline-flex items-center rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <font-awesome-icon class="h-5 w-5" icon="fa-paper-plane" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.md-editor {
  height: 10em;
  border-radius: 0.3rem;
}
</style>
  