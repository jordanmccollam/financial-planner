import React from 'react';
import Tooltip from './Tooltip';

export default {
  title: 'components/Tooltip',
  component: Tooltip,
  argTypes: {

  }
}

const Template = (args) => <div className="mt-5 ml-5"><Tooltip {...args} /></div>

export const Default = Template.bind({})
Default.args = {
  
}
export const Bottom = Template.bind({})
Bottom.args = {
  position: 'bottom'
}

