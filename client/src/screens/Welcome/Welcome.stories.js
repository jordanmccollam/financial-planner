import React from 'react';
import Welcome from './Welcome';

export default {
  title: 'screens/Welcome',
  component: Welcome,
  argTypes: {

  }
}

const Template = (args) => <Welcome {...args} />

export const Default = Template.bind({})
Default.args = {

}

