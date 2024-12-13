<template>
    <v-form
        @submit.prevent="submitForm"
        class="color-white flex flex-col items-center"
      >
        <h3 class="text-center p-5 font-bold text-2xl">{{ $t("add.room") }}</h3>
        <v-col>
          <v-text-field
            ref="nameInput"
            :label="$t('label.name2')"
            :placeholder="$t('placeholder')"
            variant="outlined"
            v-model="roomName"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            :label="$t('label.places')"
            :placeholder="$t('placeholder')"
            variant="outlined"
            v-model="roomCap"
            :rules="[rules.required]"
            type="number"
          ></v-text-field>
        </v-col>
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

const inputRef = useTemplateRef("nameInput");

onMounted(() => {
    if (inputRef.value) {
        inputRef.value.focus();
    }
})

const props = defineProps({
    onSubmit: {
        type: Function,
        required: true
    }
});

const roomName = ref("");
const roomCap = ref(0);

const { rules } = useValidation();


const submitForm = () => {
    if (props.onSubmit) {
        props.onSubmit({
            name: roomName.value,
            capacity: roomCap.value,
        })
    }
    roomName.value = "";
    roomCap.value = 0;
}

</script>