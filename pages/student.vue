<template>
  <Header />
  <div class="mt-20">
    <Schedule />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "role"],
});
</script>