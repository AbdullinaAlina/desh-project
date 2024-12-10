<template>
    <div class="w-full p-4">
      <!-- Students List -->
      <div class="flex justify-between items-center mb-4">
        <h1>{{ $t("tab.students") }}</h1>
  
        <div class="search-bar flex items-center px-3 py-1 rounded-full bg-gray-100 shadow-sm w-52">
          <v-icon class="text-gray-500 mr-2">mdi-magnify</v-icon>
          <v-text-field
            v-model="nameFilter"
            @input="filterStudents"
            :label="$t('label.filterByName')"
            hide-details
            solo
            dense
            class="search-input bg-transparent placeholder-gray-500 text-gray-800"
          ></v-text-field>
        </div>
      </div>
  
      <div class="students w-full">
        <div v-if="store.isLoading" class="py-16">
          <v-progress-circular
            indeterminate
            :size="67"
            :width="5"
          ></v-progress-circular>
        </div>
        <div v-else>
          <table class="min-w-full w-full table-auto border-0">
            <thead>
              <tr class="uppercase text-left">
                <th class="px-4 py-2 border-0 border-t-0">{{ $t("label.name") }}</th>
                <th class="px-4 py-2 border-0 border-t-0">{{ $t("label.surname") }}</th>
                <th class="px-4 py-2 border-0 border-t-0">{{ $t("label.email") }}</th>
                <th class="px-4 py-2 border-0 border-t-0">{{ $t("button.actions") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredStudents" :key="user.id">
                <td class="border-t border-t-gray-200 border-0 px-4 py-2">{{ user.name }}</td>
                <td class="border-t border-t-gray-200 border-0 px-4 py-2">{{ user.surname }}</td>
                <td class="border-t border-t-gray-200 border-0 px-4 py-2">{{ user.email }}</td>
                <td class="border-t border-t-gray-200 border-0 px-4 py-2">
                  <button
                    class="delete bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    @click="deleteUser(user.id, 'students')"
                  >
                    {{ $t("button.delete") }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useStore } from "@/store/store";
  import { useI18n } from 'vue-i18n';
  
  const { t: $t } = useI18n();
  const store = useStore();
  
  const nameFilter = ref("");
  
  const filteredStudents = computed(() => {
    return store.students.filter(user => 
      user.name.toLowerCase().includes(nameFilter.value.toLowerCase())
    );
  });
  
  const deleteUser = async (userId: number | null, role: string) => {
    if (!userId || !role) return;
    await store.deleteUser(userId, role);
  };
  
  const getData = async () => {
    await store.getAllData();
  };
  
  onMounted(getData);
  </script>
  
  <style scoped>
  /* Add any additional styles for the student list here if needed */
  
  /* Overlay Styles (if you have an add user form, include those styles here) */
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
  </style>
  