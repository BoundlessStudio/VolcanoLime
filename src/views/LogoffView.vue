<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
const { logout } = useAuth0()
onMounted(() => {
  logout({
    logoutParams: {
      returnTo: ''
    }
  })
})
</script>
