import React from 'react';
import Expenses from './Expenses';

export default {
  title: 'components/Expenses',
  component: Expenses,
  argTypes: {

  }
}

const Template = (args) => <Expenses {...args} />

export const Default = Template.bind({})
Default.args = {

}

