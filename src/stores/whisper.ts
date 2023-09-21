import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useAuth0 } from '@auth0/auth0-vue'
import { Api } from '@/api/electric-raspberry'

export interface WhisperState {
  isRecording: Boolean,
  transcription: string
}

export const useWhisperStore = defineStore('whisper', () => {
  const { getAccessTokenSilently } = useAuth0()

  const recorder = ref<MediaRecorder | undefined>(undefined)

  const whisper = reactive<WhisperState>({
    isRecording: false,
    transcription: ''
  })

  async function start(): Promise<void> {
    const token = await getAccessTokenSilently()
    const client = new Api({
      headers: {
        Authorization: `Bearer ${token}`
      },
      baseURL: import.meta.env.VITE_API
    })
    whisper.transcription = ''
    whisper.isRecording = true
    recorder.value?.stop()
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const options = { mimeType: 'audio/webm; codecs=opus' }
    recorder.value = new MediaRecorder(stream, options)
    recorder.value.addEventListener('dataavailable', async (evt) => {
      const file = new File([evt.data], 'recording.webm', { type: 'audio/webm' })
      const { data: result } = await client.api.whisper({ file: file })
      whisper.transcription += result
    })
    recorder.value.start()

    setTimeout(() => stop(), 60000)
  }

  function stop() {
    recorder.value?.stop()
    whisper.isRecording = false
  }

  return { whisper, start, stop }
})
