<script
  setup
  lang="ts"
>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="bg-gray-400 p-2 flex gap-5 pl-4">
        <RouterLink
          class="flex-initial"
          to="/"
          exact-path
        >Home</RouterLink>
        <RouterLink
          class="flex-initial"
          to="/about"
          exact-path
        >About</RouterLink>
      </nav>
    </div>
  </header>

  <main class="p-4">
    <RouterView />
  </main>
</template>

<style scoped>
.router-link-active {
  font-weight: bold;
}
</style>
