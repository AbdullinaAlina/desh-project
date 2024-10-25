<template>
    <div class="w-full p-4">
      <!-- Tutors List -->
      <div class="flex items-center mb-4">
        <h2>{{ $t("tab.tutors") }}</h2>
        <button @click="showAddTutorForm = true" class="uppercase flex items-center cursor-pointer">
          <v-icon left>mdi-plus</v-icon>
          {{ $t("button.addTutor") }}
        </button>
        <div class="rounded-2xl">
            <v-icon left>mdi-search</v-icon>
            <v-text-field
            v-model="nameFilter"
            @input="filterTutors"
            :label="$t('label.filterByName')"
            class="rounded-2xl w-45"
            prepend-inner-icon="mdi-magnify"
            ></v-text-field>
        </div>
        

        

      </div>
  
      <div class="tutors w-full">
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
            <tr v-for="user in filteredTutors" :key="user.id">
              <td class="border-t border-t-gray-200 border-0 px-4 py-2">{{ user.name }}</td>
              <td class="border-t border-t-gray-200 border-0 px-4 py-2">{{ user.surname }}</td>
              <td class="border-t border-t-gray-200 border-0 px-4 py-2">{{ user.email }}</td>
              <td class="border-t border-t-gray-200 border-0 px-4 py-2">
                <button
                  class="delete bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  @click="deleteUser(user.id, 'tutors')"
                >
                  {{ $t("button.delete") }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Add Tutor Form Overlay -->
      <div v-if="showAddTutorForm" class="overlay">
        <div class="overlay-content">
          <h3>{{ $t("add.tutor") }}</h3>
          <v-form @submit.prevent="addNewUser('tutor')" class="flex flex-col">
            <v-text-field
              :label="$t('label.name')"
              v-model="addName"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              :label="$t('label.surname')"
              v-model="addSurname"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              :label="$t('label.email')"
              v-model="addEmail"
              type="email"
              :rules="[rules.required, rules.email]"
            ></v-text-field>
            <v-btn color="primary" type="submit">{{ $t("button.add") }}</v-btn>
            <v-btn @click="showAddTutorForm = false">{{ $t("button.cancel") }}</v-btn>
          </v-form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useStore } from "@/store/store";
  import { useI18n } from 'vue-i18n';
  
  const { t: $t } = useI18n();
  const store = useStore();
  const showAddTutorForm = ref(false);
  
  // Fields and form methods
  const addName = ref("");
  const addSurname = ref("");
  const addEmail = ref("");
  const nameFilter = ref("");
  
  const filteredTutors = computed(() => {
  return store.tutors.filter(user => 
    user.name.toLowerCase().includes(nameFilter.value.toLowerCase())
  );
});

  const rules = {
    required: (value: any) => !!value || $t("rules.required"),
    email: (value: string) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value) || $t("rules.email");
    },
  };
  
  const addNewUser = async (role: string) => {
    const role_id = role === "student" ? 2 : 3;
    const org_id = localStorage.getItem("org_id") || null;
    if (org_id && role_id === 3) {
      const newUser: User = {
        id: null,
        username: null,
        password: null,
        name: addName.value,
        surname: addSurname.value,
        email: addEmail.value,
        role: role_id,
        organization: Number(org_id),
        group: null, // Assuming this is correct as per your initial code
      };
      await store.addNewUser(newUser);
      resetForm();
    }
    if (org_id && role_id === 2) {
      const newUser: User = {
        id: null,
        username: null,
        password: null,
        name: addName.value,
        surname: addSurname.value,
        email: addEmail.value,
        role: role_id,
        organization: Number(org_id),
        group: Number(addGroupId.value),
      };
      await store.addNewUser(newUser);
      resetForm();
    }
  };
  
  const resetForm = () => {
    addName.value = "";
    addSurname.value = "";
    addEmail.value = "";
    showAddTutorForm.value = false; // Hide the form after submission
  };
  
  const deleteUser = async (userId: number | null, users: any) => {
    if (!userId || !users) return;
    await store.deleteUser(userId, users);
  };
  
  // Call this function to load initial data if needed
  const getData = async () => {
    await store.getAllData();
  };
  
  onMounted(getData);
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
  .tutors table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .tutors th,
  .tutors td {
    padding: 12px;
    border: 1px solid #ddd;
  }
  
  .tutors th {
    background-color: #f4f4f4;
  }
  
  .tutors .delete {
    background-color: #f44336; /* Red background */
    color: white; /* White text */
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .tutors .delete:hover {
    background-color: #d32f2f; /* Darker red on hover */
  }
  </style>
  