const validators = {
  notEmpty(value) {
    if (!!!value || value === "") {
      return "Não deixe o campo vazio";
    }
    return "ok";
  },
  notEmptyAndInsideArray(value, options) {
    if (value === "") {
      return "Não deixe o campo vazio";
    }

    let valid = options?.find((option) => option.label === value);

    if (!valid) {
      return "Esse valor não existe entre as opções";
    }
    return "ok";
  },

  antdRequired() {
    return {
      required: true,
      message: "Não deixe o campo vazio",
    };
  },

  antdInsideOptions: (options) => (form) => ({
    validator(_, value) {
      console.log("🚀 ~ file: validators.js ~ line 30 ~ validator ~ value", value)
      let valid = options?.find(
        (option) => option?.value === value?.selectedOption?.value
      );

      if (valid) return Promise.resolve();

      return Promise.reject(new Error("Esse valor não existe entre as opções"));
    },
  }),
};

export default validators;
