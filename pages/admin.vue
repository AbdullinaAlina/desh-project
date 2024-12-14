<template>
  <Header />
  <div class="mt-24" style="min-height: 1080px">
    <div class="nav">
      <button
        v-for="tab of tabs"
        @click="setTab(tab.num)"
        :class="activeTab === tab.num ? 'active' : ''"
      >
        {{ $t(tab.name) }}
      </button>
    </div>
    <div class="tabcontent" v-if="activeTab === 1">
      <TutorList/>
    </div>
    
    <div class="tabcontent" v-if="activeTab === 2">
      <StudentList />
    </div>
    
    <div class="tabcontent" v-if="activeTab === 3">
      <GroupList />
    </div>
    
    <div class="tabcontent" v-if="activeTab === 4">
      <RoomList />
    </div>

     <div class="tabcontent" v-if="activeTab === 5">
      <EventList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "../store/store"; 
import { nextTick, ref } from "vue";

definePageMeta({
  middleware: ["auth", "role"],
});
const { t: $t } = useI18n();

const tabs = [
  { name: "tab.tutors", num: 1 },
  { name: "tab.students", num: 2 },
  { name: "tab.groups", num: 3 },
  { name: "tab.rooms", num: 4 },
  { name: "tab.events", num: 5 },
];
const activeTab = ref(1);
const store = useStore();

const setTab = async (tabNumber: number) => {
  activeTab.value = tabNumber;
  window.scrollTo(0, 0);
};


const getData = async () => {
  await store.getAllData();
};


onMounted(getData);

useHead({
  title: "Admin page",
});
</script>

<style scoped>
.nav button.active {
  border-radius: 0;
  background-color: #ccc;
}
</style>
