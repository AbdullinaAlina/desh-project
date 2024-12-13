<template>
    <v-form
        @submit.prevent="submitForm"
        class="color-white flex flex-col items-center"
      >
        <h3 class="text-center p-5 font-bold text-2xl">
          {{ $t("add.group") }}
        </h3>
        <v-col>
          <v-text-field
            ref="nameInput"
            :label="$t('label.name3')"
            :placeholder="$t('placeholder')"
            variant="outlined"
            v-model="groupName"
            :rules="[rules.required, rules.group]"
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
import { useStore } from '~/store/store'; 
import { onMounted, ref, useTemplateRef } from 'vue';

const store = useStore();
const groupName = ref("");

const { rules } = useValidation();

const props = defineProps({
    onSubmit: {
        type: Function,
        required: true,
    }
})

const inputRef = useTemplateRef('nameInput');

onMounted(() => {
    if (inputRef.value) {
        inputRef.value.focus();
    }
})

const submitForm = () => {
    if (props.onSubmit) {
        props.onSubmit({
            name: groupName.value
        })
        groupName.value = "";
    }
}


</script>