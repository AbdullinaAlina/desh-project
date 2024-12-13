<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script lang="ts">

export default {
  setup() {
    const { locale } = useI18n();

    useHead({
      title: "DESH",
    });

    onMounted(async () => {
      const localLang = localStorage.getItem("lang");
      locale.value = localLang || "en";
    });
  },
};
</script>
