import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import { Card, Table } from '../../components';

import './_sheet.scss';

const logger = "Sheet:: ";

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

const Sheet = (props) => {
  let classes = {
		[`sheet`]: true
	};

  const actions = [
    {
      title: 'Global Action',
      // icon: null,
      type: 'global',
      handler: () => console.log('Table:: Global Action!')
    }
  ]

  const columns = [
    { label: 'label' },
    { 
        label: 'amount',
        customCol: (el) => {
            return (
                <div className="center-v">
                  {/* <BiDollar size={10} /> */}
                {el.amount}</div>
            )
        }
    },
    { label: 'autopay' },
    { label: 'Est.', accessor: 'estimated' },
    { label: 'date' },
];

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col lg={5}>
        <Card className="full" >
          <>
            <Table 
              data={props.user.expenses.sort((a, b) => parseInt(a.date) - parseInt(b.date))}
              actions={actions}
              columns={columns}
            />
          </>
        </Card>
      </Col>
    </Row>
  )
}

Sheet.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object
}

Sheet.defaultProps = {
  className: ""
}

export default Sheet;


