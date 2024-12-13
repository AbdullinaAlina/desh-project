<template>
    <v-form
        @submit.prevent="submitForm"
        class="color-white flex flex-col items-center"
      >
        <h3 class="text-center p-5 font-bold text-2xl">
          {{ $t("add.event") }}
        </h3>
        <v-col>
          <v-text-field
            ref="input"
            :label="$t('label.discipline')"
            :placeholder="$t('placeholder')"
            variant="outlined"
            v-model="disciplineName"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            :label="$t('label.day')"
            :placeholder="$t('placeholder')"
            variant="outlined"
            list="days"
            data-list="days"
            type="text"
            v-model="day"
            id="day"
            name="day"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <datalist id="days">
          <option v-for="day of store.days" :value="day.name"></option>
        </datalist>
        <v-col>
          <v-text-field
            :label="$t('label.time')"
            :placeholder="$t('placeholder')"
            variant="outlined"
            type="number"
            v-model="time"
            id="time"
            maxlength="2"
            min="8"
            max="20"
            step="1"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            list="tutors"
            data-list="tutors"
            id="tutor-choice"
            name="tutor-choice"
            v-model="tutorId"
            :label="$t('label.tutor')"
            :placeholder="$t('placeholder')"
            type="input"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <datalist id="tutors">
          <option v-for="tutor of store.tutors" :value="tutor.id">
            {{ tutor.name }} {{ tutor.surname }}
          </option>
        </datalist>
        <v-col>
          <v-text-field
            :label="$t('label.group')"
            :placeholder="$t('placeholder')"
            type="input"
            variant="outlined"
            v-model="groupId"
            list="groups"
            id="group-choice"
            name="group-choice"
          ></v-text-field>
        </v-col>
        <datalist id="groups">
          <option
            v-for="group of store.groups"
            :key="group.id"
            :value="group.id"
          >
            {{ group.name }}
          </option>
        </datalist>
        <v-col>
          <v-text-field
            :label="$t('label.room')"
            list="rooms"
            id="room-choice"
            name="room-choice"
            v-model="roomId"
            :placeholder="$t('placeholder')"
            type="input"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <datalist id="rooms">
          <option v-for="room of store.rooms" :value="room.id">
            {{ room.name }}
          </option>
        </datalist>
        <v-col cols="6">
          <v-btn
            color="#4DD0E1"
            :loading="store.isLoading"
            block
            text="white"
            size="large"
            type="submit"
            variant="elevated"
          >
            {{ $t("button.add") }}
          </v-btn>
        </v-col>
      </v-form>
</template>

<script setup lang="ts">
const { t: $t } = useI18n();
import { ref, useTemplateRef } from 'vue';
import { useStore } from '~/store/store';

const store = useStore();
const { rules } = useValidation();


const time = ref("");
const day = ref("");
const disciplineName = ref("");
const tutorId = ref("");
const groupId = ref("");
const roomId = ref("");

const inputRef = useTemplateRef('input');

onMounted(() => {
    if (inputRef.value) {
        inputRef.value.focus();
    }
})

const props = defineProps({
    submitForm: {
        type: Function,
        required: true
    }
})

const submitForm = () => {
    if (props.submitForm) {
        props.submitForm({
            time: Number(time.value),
            day: day.value,
            disciplineName: disciplineName.value,
            tutorId: Number(tutorId.value),
            groupId: Number(groupId.value),
            roomId: Number(roomId.value)
        });
        time.value = "";
        day.value = "";
        disciplineName.value = "";
        tutorId.value = "";
        groupId.value = "";
        roomId.value = "";
    }
};
</script>