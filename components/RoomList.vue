<template>
    <div>
      <v-btn @click="showModal = true" class="mt-5 ml-5">
        {{ $t("add.room") }}
      </v-btn>

      <teleport to="body">
        <Modal :isVisible="showModal" :onClose="closeModal">
          <AddRoomForm :onSubmit="handleAddRoom"/>
        </Modal>
      </teleport>

      <div v-if="isLoading" class="py-16">
        <v-progress-circular indeterminate :size="67" :width="5"></v-progress-circular>
      </div>
      <div class="rooms" v-else>
        <div v-for="room in rooms" :key="room.id" class="card">
          <div class="name">
            {{ $t("label.name2") }}: {{ room.name }}, {{ $t("card.places") }}:
            {{ room.capacity }}
          </div>
          <div class="details">
            <button class="delete" @click="deleteRoom(room.id)">
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
  import { Room } from "~/composables/classes";
  import { defineAsyncComponent } from "vue";
  const Modal = defineAsyncComponent(() => import("./Modal.vue"));import AddRoomForm from "./forms/AddRoomForm.vue";
  const { t: $t } = useI18n();
  
  const store = useStore();
  const rooms = ref<Room[]>([]);
  const isLoading = ref(false);
  const showModal = ref(false);

  const closeModal = () => {
    showModal.value = false;
  }
  
  const loadRooms = async () => {
    isLoading.value = store.isLoading;
    rooms.value = store.rooms;
  };
  
  // Fetch rooms when the component is mounted
  watchEffect(() => {
    loadRooms();
  });
  
  const handleAddRoom = async(data: {name: string, capacity: number}) => {
    const org_id = localStorage.getItem("org_id") || null;
    if (org_id) {
    await store.addNewRoom(data.name, data.capacity, org_id);
  }
  }

  const deleteRoom = async (roomId: number | undefined) => {
    if (!roomId) return;
  
    try {
      await store.deleteItem(roomId, "room", "rooms");
      rooms.value = store.rooms; 
    } catch (error) {
      console.error("Error deleting room:", error);
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
  .details {
    margin-top: 0.5rem;
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
  