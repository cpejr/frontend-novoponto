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
  notHexColor: () => ({
    validator(_, value) {
      const hexColorRegex = /^#(?:[0-9a-fA-F]{3,4}){1,2}$/;
      return hexColorRegex.test(value)
        ? Promise.resolve()
        : Promise.reject("Insira um valor de cor em hexadecimal válido");
    },
  }),
  charLimit: (limit) => ({
    validator(_, value) {
      return value.toString().length <= limit
        ? Promise.resolve()
        : Promise.reject(`Limite de ${limit} caracteres`);
    },
  }),
  antdInsideOptions: (options) => (form) => ({
    validator(_, value) {
      if (value?.text && value?.text?.trim() !== "") {
        let valid = options?.find(
          (option) => option?.value === value?.selectedOption?.value
        );

        if (valid) return Promise.resolve();

        return Promise.reject(
          new Error("Esse valor não existe entre as opções")
        );
      }
      return Promise.resolve();
    },
  }),
};

export default validators;
