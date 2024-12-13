<template>
    <div class="nav">
      <button
        v-for="tab of tabs"
        :key="tab.num"
        @click="setTab(tab.num)"
        :class="activeTab === tab.num ? 'active' : ''"
      >
        {{ $t(tab.name) }}
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  const {t: $t} = useI18n();
  
  const props = defineProps({
    tabs: Array,
    activeTab: Number,
    setTab: Function,
  });
  </script>
  
  <style scoped>
  .nav button.active {
    background-color: #ccc;
  }
  </style>
  