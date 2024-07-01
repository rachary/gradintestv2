<script setup lang="ts">
import ComponentUser from './component-user.vue'
const props = defineProps<{ users: User[] }>()

</script>

<template>
  <div v-for="(user, index) in props.users" :key="index" class="w-full">
    <component-user :user="user"></component-user>
  </div>
</template>
<style lang="postcss" scoped></style>