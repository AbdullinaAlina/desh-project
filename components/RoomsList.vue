<template>
    <div class="w-full p-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold">{{ $t("tab.rooms") }}</h3>
        <button class="uppercase items-center flex cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <v-icon left>mdi-plus</v-icon>
          {{ $t("button.newRoom") }}
        </button>
      </div>
  
      <div class="rooms w-full">
        <table class="min-w-full table-auto border-0">
          <thead>
            <tr class="uppercase text-left">
              <th class="px-4 py-2 border-0 border-t-0">{{ $t("label.name2") }}</th>
              <th class="px-4 py-2 border-0 border-t-0">{{ $t("card.places") }}</th>
              <th class="px-4 py-2 border-0 border-t-0">{{ $t("button.actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="room in store.rooms" :key="room.id">
              <td class="border-t border-t-gray-200 border-0 px-4 py-2">{{ room.name }}</td>
              <td class="border-t border-t-gray-200 border-0 px-4 py-2">{{ room.capacity }}</td>
              <td class="border-t border-t-gray-200 border-0 px-4 py-2">
                <v-icon 
                  class="cursor-pointer text-red-500 hover:text-red-700" 
                  @click="deleteItem(room.id, 'room', 'rooms')"
                >
                  mdi-delete
                </v-icon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Add Room Form Overlay -->
      <div v-if="showAddRoomForm" class="overlay">
        <div class="overlay-content">
          <h3>{{ $t("add.room") }}</h3>
          <v-form @submit.prevent="addNewRoom" class="flex flex-col">
            <v-text-field
              :label="$t('label.roomName')"
              v-model="addRoomName"
              :rules="[rules.required]"
            ></v-text-field>
            <v-btn color="primary" type="submit">{{ $t("button.add") }}</v-btn>
            <v-btn @click="showAddRoomForm = false">{{ $t("button.cancel") }}</v-btn>
          </v-form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useStore } from "@/store/store";
  import { useI18n } from 'vue-i18n';
  
  const { t: $t } = useI18n();
  const store = useStore();
  const showAddRoomForm = ref(false);
  const addRoomName = ref("");
  
  const deleteItem = async (itemId: number | null, itemType: string, role: string) => {
    if (!itemId || !itemType || !role) return;
    await store.deleteUser(itemId, role);
  };
  
  const addNewRoom = async () => {
    if (addRoomName.value) {
      await store.addNewRoom(addRoomName.value);
      addRoomName.value = "";
      showAddRoomForm.value = false; // Hide the form after submission
    }
  };
  </script>
  
  <style scoped>
  /* Overlay Styles */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .overlay-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    max-width: 90%;
  }
  
  /* Table Styles */
  .rooms table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .rooms th,
  .rooms td {
    padding: 12px;
    border: 1px solid #ddd;
  }
  
  .rooms th {
    background-color: #f4f4f4;
  }
  
  /* Icon Styles */
  .cursor-pointer {
    cursor: pointer;
  }
  </style>
  