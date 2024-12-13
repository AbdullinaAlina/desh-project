export const useValidation = () => {
  const { t: $t } = useI18n();

  const rules = {
    required: (value: any) => !!value || $t("rules.required"),
    email: (value: string) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || $t("rules.email");
    },
    group: (value: string) => {
      const pattern = /^[a-z]+-[a-z]+-\d$/;
      return pattern.test(value) || $t("rules.group");
    },
  };

  return { rules };
};
