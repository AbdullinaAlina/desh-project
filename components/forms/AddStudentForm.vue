<template>
    <v-form
      @submit.prevent="submitForm"
      class="color-white flex flex-col items-center"
    >
      <h3 class="text-center p-5 font-bold text-2xl">
        {{ $t("add.student") }}
      </h3>
      <v-col>
        <v-text-field
          ref="nameInput"
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
          v-for="group in store.groups"
          :key="group.id"
          :value="group.id"
        >
          {{ group.name }}
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
  
  <script lang="ts">
  import { ref, onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import { useStore } from "../../store/store"; 
  import validationMixin from "../mixins/validationMixin";
  
  export default {
    mixins: [validationMixin],
    props: {
      onSubmit: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        name: "",
        surname: "",
        email: "",
        groupId: "",
      };
    },
    computed: {
      store() {
        return useStore();
      },
    },
    mounted() {
      const nameInput = this.$refs.nameInput as HTMLElement;
      if (nameInput) {
        nameInput.focus();
      }
    },
    methods: {
      submitForm() {
        if (this.name && this.surname && this.email && this.onSubmit) {
          this.onSubmit({
            name: this.name,
            surname: this.surname,
            email: this.email,
            groupId: this.groupId,
          });
          this.name = "";
          this.surname = "";
          this.email = "";
          this.groupId = "";
        }
      },
    },
  };
  </script>
  