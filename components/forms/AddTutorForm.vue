<template>
    <v-form @submit.prevent="submitForm" class="flex flex-col items-center">
      <h3 class="text-center p-5 font-bold text-2xl">
        {{ $t("add.tutor") }}
      </h3>
      <v-col>
        <v-text-field
          ref="inputName"
          :label="$t('label.name')"
          :placeholder="$t('placeholder')"
          variant="outlined"
          v-model="name"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          :label="$t('label.surname')"
          :placeholder="$t('placeholder')"
          variant="outlined"
          v-model="surname"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          :label="$t('label.email')"
          :placeholder="$t('placeholder')"
          type="email"
          variant="outlined"
          v-model="email"
          :rules="[rules.required, rules.email]"
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
    import { useI18n } from "vue-i18n";
    const { t: $t } = useI18n();

  import { onMounted, ref, useTemplateRef } from "vue";
  import { useStore } from "@/store/store";

  const store = useStore();

  const props = defineProps({
    onSubmit: {
      type: Function,
      required: true,
    }
  });
  
  const name = ref("");
  const surname = ref("");
  const email = ref("");

  const inputRef = useTemplateRef('inputName');

  onMounted(() => {
    if (inputRef.value){
      inputRef.value?.focus();
    }
  })
  
  const { rules } = useValidation();
  
  const submitForm = () => {
    if (props.onSubmit) {
      props.onSubmit({ name: name.value, surname: surname.value, email: email.value });
      name.value = "";
      surname.value = "";
      email.value = "";
    }
  };
  </script>
  