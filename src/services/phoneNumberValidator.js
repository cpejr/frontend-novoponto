const phoneNumberValidator = {
  validPhoneNumber(value) {
    const phoneRegex = /^\+?\d{11,14}$/;
    return !phoneRegex.test(value);
  },
};

export default phoneNumberValidator;
