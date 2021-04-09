import React from 'react';
import Card from './Card';

export default {
  title: 'components/Card',
  component: Card,
  argTypes: {

  }
}

const Template = (args) => <Card {...args} />

export const Default = Template.bind({})
Default.args = {

}

