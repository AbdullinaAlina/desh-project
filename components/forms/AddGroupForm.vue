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
  
  <script lang="ts">
  import { ref, onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import { useStore } from "../../store/store";
  import validationMixin from "../mixins/validationMixin";
  import type { PropType } from "vue";
  
  export default {
    mixins: [validationMixin],
    props: {
      onSubmit: {
        type: Function as PropType<(formData: { name: string }) => void>,
        required: true,
      },
    },
    setup(props) {
      const { t: $t } = useI18n();
      const store = useStore();
      const groupName = ref<string>("");
      const nameInput = ref<null | HTMLInputElement>(null);
  
      onMounted(() => {
        if (nameInput.value) {
          nameInput.value.focus();
        }
      });
  
      const submitForm = () => {
        if (groupName.value) {
          props.onSubmit({
            name: groupName.value,
          });
          groupName.value = ""; 
        }
      };
  
      return {
        $t,
        store,
        groupName,
        nameInput,
        submitForm,
      };
    },
  };
  </script>
  