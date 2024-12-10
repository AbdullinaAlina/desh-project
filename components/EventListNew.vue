<template>
    <div>
      <div v-if="isLoading" class="py-16">
        <v-progress-circular indeterminate :size="67" :width="5"></v-progress-circular>
      </div>
      <div class="events" v-else>
        <div v-for="event in events" :key="event.id" class="card">
          <div
            v-if="event.day && event.event_start_time && event.tutor && event.room"
            class="name"
          >
            {{ event.discipline }}, {{ event.tutor.name }} {{ event.tutor.surname }},
            {{ store.days[event.day].name }} {{ event.event_start_time }}:00 -
            {{ event.event_start_time + 1 }}:00, {{ $t("card.room") }}: {{ event.room.name }}
          </div>
          <div class="details">
            <button class="delete" @click="deleteEvent(event.id)">
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
  const events = ref([]);
  const isLoading = ref(false);
  
  const loadEvents = async () => {
    isLoading.value = store.isLoading;
    events.value = store.events;
  };
  
  // Fetch events when the component is mounted
  watchEffect(() => {
    loadEvents();
  });
  
  const deleteEvent = async (eventId: number) => {
    if (!eventId) return;
  
    try {
      await store.deleteItem(eventId, "event", "events");
      events.value = store.events; // Refresh the list
    } catch (error) {
      console.error("Error deleting event:", error);
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
  