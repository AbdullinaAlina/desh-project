<template>
    <div class="w-full p-4">
      <!-- Groups List -->
      <div class="flex justify-between items-center mb-4">
        <h1>{{ $t("tab.groups") }}</h1>
        <div class="search-bar flex items-center px-3 py-1 rounded-full bg-gray-100 shadow-sm w-52">
          <v-icon class="text-gray-500 mr-2">mdi-magnify</v-icon>
          <v-text-field
            v-model="nameFilter"
            @input="filterGroups"
            :label="$t('label.filterByName')"
            hide-details
            solo
            dense
            class="search-input bg-transparent placeholder-gray-500 text-gray-800"
          ></v-text-field>
        </div>
      </div>
  
      <div class="rooms w-full">
        <table class="min-w-full w-full table-auto border-0">
          <thead>
            <tr class="uppercase text-left">
              <th class="px-4 py-2 border-0 border-t-0">{{ $t("label.name") }}</th>
              <th class="px-4 py-2 border-0 border-t-0">{{ $t("button.actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="group in filteredGroups" :key="group.id">
              <td class="border-t border-t-gray-200 border-0 px-4 py-2">{{ group.name }}</td>
              <td class="border-t border-t-gray-200 border-0 px-4 py-2">
                <button
                  class="delete bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  @click="deleteItem(group.id, 'group', 'groups')"
                >
                  {{ $t("button.delete") }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Add Group Form Overlay -->
      <div v-if="showAddGroupForm" class="overlay">
        <div class="overlay-content">
          <h3>{{ $t("add.group") }}</h3>
          <v-form @submit.prevent="addNewGroup" class="flex flex-col">
            <v-text-field
              :label="$t('label.groupName')"
              v-model="addGroupName"
              :rules="[rules.required]"
            ></v-text-field>
            <v-btn color="primary" type="submit">{{ $t("button.add") }}</v-btn>
            <v-btn @click="showAddGroupForm = false">{{ $t("button.cancel") }}</v-btn>
          </v-form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useStore } from "@/store/store";
  import { useI18n } from 'vue-i18n';
  
  const { t: $t } = useI18n();
  const store = useStore();
  const nameFilter = ref("");
  const showAddGroupForm = ref(false);
  const addGroupName = ref("");
  
  const filteredGroups = computed(() => {
    return store.groups.filter(group =>
      group.name.toLowerCase().includes(nameFilter.value.toLowerCase())
    );
  });
  
  const deleteItem = async (itemId: number | null, itemType: string, role: string) => {
    if (!itemId || !itemType || !role) return;
    await store.deleteUser(itemId, role);
  };
  
  const addNewGroup = async () => {
    if (addGroupName.value) {
      await store.addNewGroup(addGroupName.value);
      addGroupName.value = "";
      showAddGroupForm.value = false; // Hide the form after submission
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
  
  .rooms .delete {
    background-color: #f44336; /* Red background */
    color: white; /* White text */
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .rooms .delete:hover {
    background-color: #d32f2f; /* Darker red on hover */
  }
  </style>
  