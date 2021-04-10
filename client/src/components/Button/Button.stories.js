import React from 'react';
import Button from './Button';

export default {
  title: 'components/Button',
  component: Button,
  argTypes: {

  }
}

const Template = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {

}
export const Ghost = Template.bind({})
Ghost.args = {
  kind: 'ghost'
}

