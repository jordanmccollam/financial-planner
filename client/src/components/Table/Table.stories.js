import React from 'react';
import Table from './Table';

export default {
  title: 'components/Table',
  component: Table,
  argTypes: {

  }
}

const Template = (args) => <Table {...args} />

export const Default = Template.bind({})
Default.args = {

}
export const WithActions = Template.bind({})
WithActions.args = {
  actions: [
    {
      title: 'Global Action',
      // icon: null,
      type: 'global',
      handler: () => console.log('Table:: Global Action!')
    }
  ]
}

