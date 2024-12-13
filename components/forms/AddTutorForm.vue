<template>
  <v-form
    @submit.prevent="submitForm"
    class="color-white flex flex-col items-center"
  >
    <h3 class="text-center p-5 font-bold text-2xl">
      {{ $t("add.tutor") }}
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
    };
  },
  computed: {
    store() {
      return useStore();
    },
    $t() {
      return useI18n().t;
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
        });
        this.name = "";
        this.surname = "";
        this.email = "";
      }
    },
  },
};
</script>
