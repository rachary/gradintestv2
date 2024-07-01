<script setup lang="ts">
import ComponentUser from './component-user.vue'
const props = defineProps<{ users: User[] }>()

</script>

<template>
  <transition-group tag="ul" name="list">
    <li v-for="(user, index) in props.users" :key="index" class="w-full">
      <component-user :user="user"></component-user>
    </li>
  </transition-group>
</template>
<style lang="postcss" scoped>
.list-enter-active,
.list-leave-active {
  @apply transition-all ease-in 
}
.list-enter-from,
.list-leave-to {
  @apply opacity-0 -translate-x-full
}
</style>