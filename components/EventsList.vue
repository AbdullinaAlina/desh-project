<template>
      <div class="events">
        <div v-for="event of store.events" :key="event.id" class="card mb-4">
          <div
            v-if="
              event.day && event.event_start_time && event.tutor && event.room
            "
            class="event-details"
          >
            <div class="name">
              <span class="font-bold">{{ event.discipline }}</span>, 
              <span class="font-semibold">{{ event.tutor.name }} {{ event.tutor.surname }}</span>, 
              <span class="text-gray-600">{{ store.days[event.day].name }}</span>, 
              <span class="text-gray-600">{{ event.event_start_time }}:00 - {{ event.event_start_time + 1 }}:00</span>, 
              <span class="text-gray-600">{{ $t("card.room") }}: {{ event.room.name }}</span>
            </div>
            <div class="details mt-2">
              <v-icon 
                class="delete cursor-pointer text-red-500 hover:text-red-700" 
                @click="deleteItem(event.id, 'event', 'events')"
              >
                mdi-delete
              </v-icon>
            </div>
          </div>
        </div>
      </div>
  </template>
  
  <script setup lang="ts">
  import { useStore } from "@/store/store";
  import { useI18n } from 'vue-i18n';
  
  const { t: $t } = useI18n();
  const store = useStore();
  
  const deleteItem = async (itemId: number | null, itemType: string, role: string) => {
    if (!itemId || !itemType || !role) return;
    await store.deleteUser(itemId, role);
  };
  </script>
  
  <style scoped>
  .events {
    padding: 16px;
  }
  
  .card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 16px;
    transition: transform 0.2s;
  }
  
  .card:hover {
    transform: translateY(-2px);
  }
  
  .name {
    font-size: 1rem;
    line-height: 1.5;
  }
  
  .details {
    margin-top: 8px;
  }
  
  /* Icon Styles */
  .cursor-pointer {
    cursor: pointer;
  }
  </style>
  