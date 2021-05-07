
export const optionsList = {
    description: 'Array de objetos, contendo chave e valor, sendo respectivas às opções mostradas no select.',
    type: { 
      name: 'array', 
      required: false 
    },
    table: {
      type: { 
        summary: 'array' 
      },
      defaultValue: {
        summary: [],
      },
    },
    control: 'array',
  };