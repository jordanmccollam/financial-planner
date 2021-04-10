import React from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'components/Checkbox',
  component: Checkbox,
  argTypes: {

  }
}

const Template = (args) => <Checkbox {...args} />

export const NotChecked = Template.bind({})
NotChecked.args = {

}
export const Checked = Template.bind({})
Checked.args = {
  checked: true
}

