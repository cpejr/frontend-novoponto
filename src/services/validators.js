const validators = {
  notEmpty(value) {
    if (!!!value || value === "") {
      return "Não deixe o campo vazio";
    }
    return "ok";
  },
  notEmptyAndInsideArray(value, array) {
    if (value === "") {
      return "Não deixe o campo vazio";
    }
    var index = array.indexOf(value);
    if (index === -1) {
      return "Esse valor não existe entre as opções";
    }
    return "ok";
  },
};

export default validators;
