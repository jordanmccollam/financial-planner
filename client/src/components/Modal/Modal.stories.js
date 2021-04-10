import React from 'react';
import Modal from './Modal';

export default {
  title: 'components/Modal',
  component: Modal,
  argTypes: {

  }
}

const Template = (args) => <Modal {...args} />

export const Open = Template.bind({})
Open.args = {
  show: true
}

