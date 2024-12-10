<template>
    <div>
      <div v-if="isLoading" class="py-16">
        <v-progress-circular indeterminate :size="67" :width="5"></v-progress-circular>
      </div>
      <div v-else>
        <div v-for="user in tutors" :key="user.id" class="card">
          <div class="name">
            {{ $t("card.name") }}: {{ user.name }} {{ user.surname }},
            {{ $t("card.email") }}: {{ user.email }}
          </div>
          <div class="details">
            <button class="delete" @click="deleteUser(user.id, 'tutors')">
              {{ $t("button.delete") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useStore } from "@/store/store";
  import { ref } from "vue";
  
  const props = defineProps({
    onDelete: Function, // Callback for delete
  });
  
  const store = useStore();
  const isLoading = ref(store.isLoading);
  const tutors = ref(store.tutors);

  const deleteUser = async (userId: number | null, users: any) => {
  if (!userId || !users) return;
  await store.deleteUser(userId, users);
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
  