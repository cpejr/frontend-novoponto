const phoneNumberValidator = {
  validPhoneNumber(value) {
    const phoneRegex = /^\+?\d{11,14}$/;
    return phoneRegex.test(value)
      ? null
      : "Número de celular inválido. Use um número com 11 a 14 dígitos.";
  },
};

export default phoneNumberValidator;
