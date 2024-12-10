<template>
    <div>
      <div v-if="isLoading" class="py-16">
        <v-progress-circular indeterminate :size="67" :width="5"></v-progress-circular>
      </div>
      <div v-else>
        <div v-for="user in students" :key="user.id" class="card">
          <div class="name">
            {{ $t("card.name") }}: {{ user.name }} {{ user.surname }},
            {{ $t("card.email") }}: {{ user.email }}
          </div>
          <div class="details">
            <button class="delete" @click="deleteStudent(user.id)">
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
  const students = ref([]);
  const isLoading = ref(false);
  
  const loadStudents = async () => {
    isLoading.value = store.isLoading;
    students.value = store.students;
  };
  
  // Fetch students when the component is mounted
  watchEffect(() => {
    loadStudents();
  });
  
  const deleteStudent = async (studentId: number) => {
    if (!studentId) return;
  
    try {
      await store.deleteUser(studentId, "students");
      students.value = store.students; // Refresh the list
    } catch (error) {
      console.error("Error deleting student:", error);
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
  