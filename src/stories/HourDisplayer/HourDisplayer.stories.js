import React from 'react';

import HourDisplayer from '../../components/atoms/HourDisplayer';
import { 
  text,
  date, 
  hourColor,
} from './Props'

export default {
  title: 'Componentes/atoms/HourDisplayer',
  component: HourDisplayer,
  argTypes: {
    text, 
    date, 
    hourColor,
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
};

const Template = (args) => <HourDisplayer {...args} />;

export const Text = Template.bind({});
Text.args = {
  text: '', 
  date: 'Clique aqui',
  hourColor: "#0000", 
};

export const Date = Template.bind({});
Text.args = {
  date: Date(),
  hourColor: "#0000", 
};
