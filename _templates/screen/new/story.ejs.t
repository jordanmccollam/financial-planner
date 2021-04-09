---
to: client/src/screens/<%= name %>/<%= name %>.stories.js
unless_exists: true
---
import React from 'react';
import <%= name %> from './<%= name %>';

export default {
  title: 'screens/<%= name %>',
  component: <%= name %>,
  argTypes: {

  }
}

const Template = (args) => <<%= name %> {...args} />

export const Default = Template.bind({})
Default.args = {

}

