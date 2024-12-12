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
      <TutorListNew :onDelete="deleteUser"/>
    </div>
    
    <div class="tabcontent" v-if="activeTab === 2">
      <StudentListNew />
    </div>
    
    <div class="tabcontent" v-if="activeTab === 3">
      <GroupListNew />
    </div>
    
    <div class="tabcontent" v-if="activeTab === 4">
      <RoomListNew />
    </div>

     <div class="tabcontent" v-if="activeTab === 5">
      <EventListNew />
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: ["auth", "role"],
});

import { useStore } from "@/store/store";
import EventListNew from "~/components/EventListNew.vue";
import GroupListNew from "~/components/GroupListNew.vue";
import RoomListNew from "~/components/RoomListNew.vue";
import StudentListNew from "~/components/StudentListNew.vue";
import TutorList from "~/components/TutorList.vue";
import TutorListNew from "~/components/TutorListNew.vue";
import { Room, Group } from "~/composables/classes";
const { t: $t } = useI18n();

const tabs = [
  { name: "tab.tutors", num: 1 },
  { name: "tab.students", num: 2 },
  { name: "tab.groups", num: 3 },
  { name: "tab.rooms", num: 4 },
  { name: "tab.events", num: 5 },
];
const activeTab = ref(1);
const addName = ref("");
const addSurname = ref("");
const addEmail = ref("");
const addGroupId = ref("");
const groupName = ref("");
const roomName = ref("");
const roomCap = ref(0);
const addTime = ref(0);
const addDay = ref("");
const disciplineName = ref("");
const addTutorId = ref("");
const addRoomId = ref(0);
const addTutorGroup = null;
const store = useStore();

const setTab = (tabNumber: number) => {
  activeTab.value = tabNumber;
};

const rules = {
  required: (value: any) => !!value || $t("rules.required"),
  email: (value: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || $t("rules.email");
  },
  group: (value: string) => {
    const pattern = /^[a-z]+-[a-z]+-\d$/;
    return pattern.test(value) || $t("rules.group");
  },
};

const getData = async () => {
  await store.getAllData();
};
const deleteUser = async (userId: number | null, users: any) => {
  if (!userId || !users) return;
  await store.deleteUser(userId, users);
};
const deleteItem = async (id: number | undefined, path: string, items: any) => {
  if (!id || !path || !items) return;
  await store.deleteItem(id, path, items);
};

onMounted(getData);

useHead({
  title: "Admin page",
});
</script>

<style scoped>
.nav button.active {
  background-color: #ccc;
}
</style>
