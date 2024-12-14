<template>
    <div>
      <v-btn @click="showModal = true" class="mt-5 ml-5">
        {{ $t("add.group") }}
      </v-btn>
      
      <teleport to="body">
        <Modal :isVisible="showModal" :onClose="closeModal">
          <AddGroupForm :onSubmit="handleAddGroup"/>
        </Modal>
      </teleport>
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
  import AddGroupForm from "./forms/AddGroupForm.vue";
  import { Group } from "~/composables/classes";
  const {t: $t} = useI18n();
  import { defineAsyncComponent } from "vue";
  const Modal = defineAsyncComponent(() => import("./Modal.vue"));
  
  const store = useStore();
  const groups = ref<Group[]>([]);
  const isLoading = ref(false);
  const showModal = ref(false);

  const closeModal = () => {
    showModal.value = false;
  }

  const loadGroups = async () => {
    isLoading.value = store.isLoading;
    groups.value = store.groups;
  };
  
  // Fetch groups when the component is mounted
  watchEffect(() => {
    loadGroups();
  });

  const handleAddGroup = async (data: { name: string }) => {
  const org_id = localStorage.getItem("org_id");
  if (org_id) {
    try {
      await store.addNewGroup(data.name, org_id);
      groups.value = store.groups; // Refresh the list
      showModal.value = false; // Close the modal
    } catch (error) {
      console.error("Error adding group:", error);
    }
  }
};
  
  const deleteGroup = async (groupId: number | undefined) => {
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
  