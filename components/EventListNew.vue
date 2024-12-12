<template>
    <div>
      <v-btn @click="showModal = true">
        {{ $t("button.addEvent") }}
      </v-btn>

      <Modal :isVisible="showModal" :close="closeModal">
        <AddEventForm :submitForm="handleAddEvent"/>
      </Modal>

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
import { Eventt } from "~/composables/classes";
import Modal from "./Modal.vue";
import AddEventForm from "./forms/AddEventForm.vue";
  const { t: $t } = useI18n();

  const store = useStore();
  const events = ref<Eventt[]>([]);
  const isLoading = ref(false);
  
  const showModal = ref(false);

  const closeModal = () => {
    showModal.value = false;
  }

  const loadEvents = async () => {
    isLoading.value = store.isLoading;
    events.value = store.events;
  };
  
  // Fetch events when the component is mounted
  watchEffect(() => {
    loadEvents();
  });
  
  const handleAddEvent = async (data: {
    time: number;
    day: string;
    disciplineName: string;
    tutorId: number;
    groupId: number;
    roomId: number;
}) => {
    const org_id = localStorage.getItem("org_id") || null;
    const dayIndex = store.days.findIndex((day) => day.name === data.day.trim());
    
    if (org_id && dayIndex !== -1) {
        try {
            await store.addNewEvent(
                data.time,
                data.roomId,
                data.disciplineName,
                dayIndex,
                data.tutorId,
                data.groupId
            );
            // Refresh the event list
            events.value = store.events;
            showModal.value = false; // Close the modal
        } catch (error) {
            console.error("Error adding event:", error);
        }
    } else {
        console.error("Invalid day or organization ID");
    }
};

  const deleteEvent = async (eventId: number | undefined) => {
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
  