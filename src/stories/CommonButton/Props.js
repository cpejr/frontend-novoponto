
export const children = {
    description: 'Componente que será renderizado internamente.',
    type: { 
      name: 'element', 
      required: false 
    },
    table: {
      type: { 
        summary: 'func' 
      },
    },
  };

export const buttonLabel = {
    description: 'Label que aparecerá dentro do botão.',
    type: { 
      name: 'string', 
      required: true 
    },
    table: {
      type: { 
        summary: 'string' 
      },
      defaultValue: {
        summary: 'Hello World' 
      },
    },
    control: 'text',
  };

export const loading = {
    description: '???',
    type: { 
      name: 'loading', 
      required: false 
    },
    table: {
      type: { 
        summary: 'boolean' 
      },
      defaultValue: {
        summary: false 
      },
    },
    control: 'boolean',
  };

export const icon = {
    description: 'Ícone que aparecerá dentro do botão, ao lado da label.',
    type: { 
      name: 'string', 
      required: false 
    },
    table: {
      type: { 
        summary: 'string' 
      },
    },
  };