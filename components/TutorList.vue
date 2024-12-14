<template>
    <div>
      <v-btn @click="showModal = true" class="mb-4">
        {{ $t("add.tutor") }}
      </v-btn>
  
      <teleport to="body">
        <Modal :isVisible="showModal" :onClose="closeModal">
          <AddTutorForm :onSubmit="handleAddTutor" />
        </Modal>
      </teleport>
  
      <div v-if="isLoading" class="py-16">
        <v-progress-circular indeterminate :size="67" :width="5"></v-progress-circular>
      </div>
      
      <div v-else>
        <transition-group name="list" tag="div">
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
        </transition-group>
        
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useI18n } from "vue-i18n";
  const { t: $t } = useI18n();

  import { ref, watchEffect } from "vue";
  import { useStore } from "@/store/store";
  import { defineAsyncComponent } from "vue";
  const Modal = defineAsyncComponent(() => import("./Modal.vue"));
  import AddTutorForm from "@/components/forms/AddTutorForm.vue";
  
  const store = useStore();
  const isLoading = ref(false);
  const tutors = ref<User[]>([]);
  const showModal = ref(false);
  
  const loadTutors = async () => {
    // isLoading.value = store.isLoading;
    tutors.value = store.tutors;
  };
  
  watch(() => store.isLoading, (newVal) => {
  isLoading.value = newVal;
});

  // Fetch tutors when the component is mounted
  watchEffect(() => {
    loadTutors();
  });
  
  const deleteUser = async (userId: number | null, users: any) => {
    if (userId === null || !users) return;
    await store.deleteUser(userId, users);
  };
  
  const closeModal = () => {
    showModal.value = false;
  };
  
  const handleAddTutor = async (data: { name: string; surname: string; email: string }) => {
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
        role: 3, // Assuming 3 is the role ID for tutors
        organization: Number(org_id),
        group: null,
      });
      tutors.value = store.tutors; // Refresh the list
      showModal.value = false; // Close the modal
    } catch (error) {
      console.error("Error adding tutor:", error);
    }
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
  .list-enter-active,
    .list-leave-active {
        transition: all 0.3s ease;
    }
    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
  </style>
  