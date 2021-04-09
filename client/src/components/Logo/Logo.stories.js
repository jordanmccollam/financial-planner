import React from 'react';
import Logo from './Logo';

export default {
  title: 'components/Logo',
  component: Logo,
  argTypes: {

  }
}

const Template = (args) => <Logo {...args} />

export const Default = Template.bind({})
Default.args = {

}

