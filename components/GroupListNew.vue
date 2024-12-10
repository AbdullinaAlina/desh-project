<template>
    <div>
      <div v-if="isLoading" class="py-16">
        <v-progress-circular indeterminate :size="67" :width="5"></v-progress-circular>
      </div>
      <div v-else>
        <div v-for="group in groups" :key="group.id" class="card">
          <div class="name">
            {{ group.name }}
          </div>
          <div class="details">
            <button class="delete" @click="deleteGroup(group.id)">
              {{ $t("button.delete") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watchEffect } from "vue";
  import { useStore } from "@/store/store";
  
  const store = useStore();
  const groups = ref([]);
  const isLoading = ref(false);
  
  const loadGroups = async () => {
    isLoading.value = store.isLoading;
    groups.value = store.groups;
  };
  
  // Fetch groups when the component is mounted
  watchEffect(() => {
    loadGroups();
  });
  
  const deleteGroup = async (groupId: number) => {
    if (!groupId) return;
  
    try {
      await store.deleteItem(groupId, "group", "groups");
      groups.value = store.groups; // Refresh the list
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };
  </script>
  
  <style scoped>
  .card {
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  .name {
    font-weight: bold;
  }
  .delete {
    background-color: red;
    color: white;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 4px;
  }
  .delete:hover {
    background-color: darkred;
  }
  </style>
  