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
  
  <script lang="ts">
  import { ref, onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import { useStore } from "../../store/store"
  import validationMixin from "../mixins/validationMixin" ;
  
  export default {
    mixins: [validationMixin],
    props: {
      onSubmit: {
        type: Function,
        required: true,
      },
    },
    setup() {
      const store = useStore();
  
      const roomName = ref("");
      const roomCap = ref(0);
      const nameInput = ref<HTMLInputElement | null>(null);
  
      onMounted(() => {
        if (nameInput.value) {
          nameInput.value.focus();
        }
      });

      return {
        store,
        roomName,
        roomCap,
        nameInput,
      };
    },
    methods: {
        submitForm() {
            if (this.roomName && this.roomCap && this.onSubmit) {
                this.onSubmit({
                name: this.roomName,
                capacity: this.roomCap,
                });
                this.roomName = "";
                this.roomCap = 0;
            }
        },
    },
  };
  </script>
  