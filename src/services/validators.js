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
};

export default validators;
