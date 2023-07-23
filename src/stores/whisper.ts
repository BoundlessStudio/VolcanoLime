import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuth0 } from '@auth0/auth0-vue'
import { Api } from '@/api/electric-raspberry'

export const useWhisperStore = defineStore('whisper', () => {
  const { getAccessTokenSilently } = useAuth0()

  const recorder = ref<MediaRecorder | undefined>(undefined)
  const isRecording = ref(false)
  const transcription = ref('')

  async function getController(): Promise<Api<unknown>> {
    const token = await getAccessTokenSilently()
    const client = new Api({
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return client
  }

  async function start(): Promise<void> {
    const controller = await getController()
    transcription.value = ''
    isRecording.value = true
    recorder.value?.stop()
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const options = { mimeType: 'audio/webm; codecs=opus' }
    recorder.value = new MediaRecorder(stream, options)
    recorder.value.addEventListener('dataavailable', async (evt) => {
      const file = new File([evt.data], 'recording.webm', { type: 'audio/webm' })
      const { data: result } = await controller.api.whisper({ file: file })
      transcription.value += result
    })
    recorder.value.start()

    setTimeout(() => stop(), 60000)
  }

  function stop() {
    recorder.value?.stop()
    isRecording.value = false
  }

  return { isRecording, transcription, start, stop }
})
