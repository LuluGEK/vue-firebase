<template>
  <div class="card mt-4">
    <form @submit.prevent="onSubmit">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input v-model="form.name" class="input" required />
        </div>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            v-model="form.email"
            class="input"
            type="email"
            required
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button type="submit" class="button is-success">Create User</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { createUser } from '@/firebase'
import { reactive } from 'vue'
export default {
  setup () {
    const form = reactive({ name: '', email: '' })
    const onSubmit = async () => {
      try {
        await createUser({ ...form })
        form.name = ''
        form.email = ''
      } catch (e) {
        console.log(e)
      }
    }
    return { form, onSubmit }
  }
}
</script>
