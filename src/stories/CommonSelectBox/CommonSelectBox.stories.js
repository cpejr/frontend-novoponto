import React from 'react';

import CommonSelectBox from '../../components/atoms/CommonSelectBox';
import { 
  optionsList,
} from './Props'

export default {
  title: 'Componentes/atoms/CommonSelectBox',
  component: CommonSelectBox,
  argTypes: {
    optionsList, 
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
};

const Template = (args) => <CommonSelectBox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  optionsList: [
    {
      value: 'Arthur Braga',
      label: 'Arthur Braga'
    },
    {
      value: 'Arthur Lima',
      label: 'Arthur Lima'
    },
    {
      value: 'Diogo Almazan',
      label: 'Diogo Almazan'
    },
    {
      value: 'João Prates',
      label: 'João Prates'
    },
  ], 
};
