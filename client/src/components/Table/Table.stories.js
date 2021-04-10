import React from 'react';
import Table from './Table';
import { Icon } from '../index';

export default {
  title: 'components/Table',
  component: Table,
  argTypes: {

  }
}

const testExpenses = [
  {
    label: 'Rent',
    amount: 1280,
    autopay: false,
    estimated: false,
    repeat: 1, // once a month
    date: '01'
  },
  {
    label: 'Power',
    amount: 150,
    autopay: true,
    estimated: true,
    repeat: 1, // once a month
    date: '28'
  },
]

const columns = [
  { label: 'label' },
  { 
      label: 'amount',
      customCol: (el) => {
          return (
              <div className="center-v">
              <Icon icon="BiDollar" size={13} />
              {el.amount}</div>
          )
      }
  },
  { label: 'autopay' },
  { label: 'Est.', accessor: 'estimated' },
  { label: 'date' },
];

const Template = (args) => <Table {...args} />

export const Default = Template.bind({})
Default.args = {

}
export const WithData = Template.bind({})
WithData.args = {
  actions: [
    {
      title: 'Global Action',
      // icon: null,
      type: 'global',
      handler: () => console.log('Table:: Global Action!')
    },
    {
      title: 'Single Action',
      // icon: null,
      type: 'single',
      handler: () => console.log('Table:: Single Action!')
    },
    {
      title: 'Multi Action',
      // icon: null,
      type: 'multi',
      handler: () => console.log('Table:: Multi Action!')
    },
  ],
  data: testExpenses,
  columns: columns
}

