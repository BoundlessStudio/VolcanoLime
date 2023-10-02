import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useFileDialog } from '@vueuse/core'
import { useAuth0 } from '@auth0/auth0-vue'
import { Api, type FileDocument } from '@/api/electric-raspberry'

export interface UploadState {
  isLoading: Boolean,
  files: FileDocument[]
}

export const useUploadStore = defineStore('upload', () => {
  const { getAccessTokenSilently } = useAuth0()
  const { open, onChange } = useFileDialog()

  const upload = reactive<UploadState>({
    isLoading: false,
    files: []
  })

  onChange(async (list: FileList | null) => {
    var files = Array.from(list ?? [])
    await handleFiles(files)
  })

  async function handleFiles(files: File[]) {
    upload.isLoading = true
    upload.files = await uploadFiles(files)
    upload.isLoading = false
  }
  async function uploadFiles(files: File[]): Promise<FileDocument[]> {
    const token = await getAccessTokenSilently()
    const client = new Api({
      headers: {
        Authorization: `Bearer ${token}`
      },
      baseURL: import.meta.env.VITE_API
    })
    const response = await client.api.upload({
      files: files
    })
    return response.data
  }
  return { upload, open }
})
