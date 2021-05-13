export const text = {
  description: "Um texto personalizado (formatado) para ser exibido no chip",
  type: {
    name: "string",
    required: false,
  },
  table: {
    type: {
      summary: "14:27",
    },
  },
  control: "text",
};

export const date = {
  description: "Data da qual sera retirada a horas para exibir no chip.",
  type: {
    name: "Date",
    required: false,
  },
  table: {
    type: {
      summary: "Date",
    },
    defaultValue: {
      summary: Date(),
    },
  },
  control: "text",
};

export const hourColor = {
  description: "Cor do chip",
  type: {
    name: "string",
    required: true,
  },
  table: {
    type: {
      summary: "string",
    },
    defaultValue: {
      summary: "#0000",
    },
  },
  control: "color",
};
