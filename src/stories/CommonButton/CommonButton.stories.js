import React from 'react';

import CommonButton from '../../components/atoms/CommonButton';
import { 
  children,
  buttonLabel, 
  loading,
  icon 
} from './Props'

export default {
  title: 'Componentes/atoms/CommonButton',
  component: CommonButton,
  argTypes: {
    children, 
    buttonLabel, 
    loading, 
    icon
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
};

const Template = (args) => <CommonButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: '', 
  buttonLabel: 'Clique aqui',
  loading: false, 
  icon: ''
};
