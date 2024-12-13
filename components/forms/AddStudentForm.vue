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
            v-for="group of store.groups"
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
<script setup lang="ts">
    import { onMounted, ref, useTemplateRef } from "vue";
    import { useI18n } from "vue-i18n";
    import { useStore } from "~/store/store";
    const store = useStore();
    const { t: $t } = useI18n();

    const name = ref("");
    const surname = ref("");
    const email = ref("");
    const groupId = ref("");

    const inputRef = useTemplateRef('nameInput');

  onMounted(() => {
    if (inputRef.value){
      inputRef.value?.focus();
    }
  })

    const { rules } = useValidation();

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
    })

    const submitForm = () => {
        if (props.onSubmit) {
            props.onSubmit({
                name: name.value,
                surname: surname.value, 
                email: email.value,
                groupId: groupId.value
            })
            name.value = "";
            surname.value = "";
            email.value = "";
        }
    }
</script>