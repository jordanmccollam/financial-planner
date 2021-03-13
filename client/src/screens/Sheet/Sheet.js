import React, { useState, useEffect } from "react";
import { Card, Tooltip } from '../../components';
import { Row, Col, Button } from 'react-bootstrap';
import Expenses from './Expenses';
import moment from 'moment';

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
    estimated: false,
    repeat: 1, // once a month
    date: '28'
  },
]

const totalBalance = 4005;

const Sheet = (props) => {

  const getMonthlyExpenses = () => {
    let total = 0;
    testExpenses.forEach(expense => {
      total += expense.amount;
    });
    return total;
  }

  const getTodaysExpenses = () => {
    let total = 0;
    testExpenses.filter(e => e.date === moment(new Date()).format('DD')).forEach(expense => {
      total += expense.amount;
    })
    return total;
  }

  const getTodaysEstimated = () => {
    let total = 0;
    testExpenses.filter(e => e.estimated && e.date === moment(new Date()).format('DD')).forEach(expense => {
      total += expense.amount;
    })
    return total;
  }

  const getMonthlyEstimated = () => {
    let total = 0;
    testExpenses.filter(e => e.estimated).forEach(expense => {
      total += expense.amount;
    })
    return total;
  }

  const getCurrentBalance = () => {
    let total = totalBalance;
    testExpenses.filter(e => parseInt(e.date) <= parseInt(moment(new Date()).format('DD'))).forEach(expense => {
      total -= expense.amount;
    })
    return total;
  }

  return (
    <div className="sheet">
      <Row>
        <Col lg={5}>
          <Card className="full" title="Expenses" >
            <Expenses expenses={testExpenses} />
          </Card>
        </Col>
        <Col>

          <Row>
            <Col className="mb-3">
              <Card className="d-flex flex-column align-items-center">
                <h5 className="title">Current Balance</h5>
                <h3>{getCurrentBalance()}</h3>
              </Card>
            </Col>
            <Col xs={4} className="mb-3">
              <Card className="d-flex flex-column align-items-center">
                <h5 className="title">Monthly Balance</h5>
                <h3>{totalBalance}</h3>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={4} className="mb-3">
              <Card className="d-flex flex-column align-items-center">
                <h5 className="title">Today</h5>
                <Tooltip id="todays-estimated" message={`${getTodaysEstimated()}/${getTodaysExpenses()} is estimated`} place="bottom" >
                  <h3 className={getTodaysExpenses() === 0 ? "text-primary" : "text-danger"}>-{getTodaysExpenses()}</h3>
                </Tooltip>
              </Card>
            </Col>
            <Col className="mb-3">
              <Card className="d-flex flex-column align-items-center">
                <h5 className="title">Monthly</h5>
                <Tooltip id="monthly-estimated" message={`${getMonthlyEstimated()}/${getMonthlyExpenses()} is estimated`} place="bottom" >
                  <h3 className={getMonthlyExpenses() === 0 ? "text-primary" : "text-danger"}>-{getMonthlyExpenses()}</h3>
                </Tooltip>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Sheet;


