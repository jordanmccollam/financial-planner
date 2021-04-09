import React from 'react';
import Icon from './Icon';

export default {
  title: 'components/Icon',
  component: Icon,
  argTypes: {

  }
}

const Template = (args) => <Icon {...args} />

export const Default = Template.bind({})
Default.args = {
  size: 200
}

