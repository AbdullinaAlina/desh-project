<template>
    <div>
      <v-btn @click="showModal = true" class="mb-4">
        {{ $t("add.student") }}
      </v-btn>

      <teleport to="body">
        <Modal :isVisible="showModal" :onClose="closeModal">
          <AddStudentForm :onSubmit="handleAddStudent"/>
        </Modal>
      </teleport>

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
  const { t: $t } = useI18n();

  import { ref, watchEffect } from "vue";
  import { useStore } from "@/store/store";
import AddStudentForm from "./forms/AddStudentForm.vue";
  
  const store = useStore();
  const students = ref<User[]>([]);
  const isLoading = ref(false);
  const showModal = ref(false);
  
  const loadStudents = async () => {
    isLoading.value = store.isLoading;
    students.value = store.students;
  };

  const closeModal = () => {
    showModal.value = false;
  }
  
  // Fetch students when the component is mounted
  watchEffect(() => {
    loadStudents();
  });

  const handleAddStudent = async (data: { name: string; surname: string; email: string }) => {
    const org_id = localStorage.getItem("org_id");
    if (org_id) {
    try {
      await store.addNewUser({
        id: null,
        username: null,
        password: null,
        name: data.name,
        surname: data.surname,
        email: data.email,
        role: 2, 
        organization: Number(org_id),
        group: null
      });
      students.value = store.students; // Refresh the list
      showModal.value = false; // Close the modal
    } catch (error) {
      console.error("Error adding tutor:", error);
    }
    }
    
  };
  
  const deleteStudent = async (studentId: number | null) => {
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
  