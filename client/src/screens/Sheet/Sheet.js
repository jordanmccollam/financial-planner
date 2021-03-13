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

const Sheet = (props) => {

  const renderMonthlyExpenses = () => {
    let total = 0;
    testExpenses.forEach(expense => {
      total += expense.amount;
    });
    return total;
  }

  const renderTodaysExpenses = () => {
    let total = 0;
    testExpenses.filter(e => e.date === moment(new Date()).format('DD')).forEach(expense => {
      total += expense.amount;
    })
    return total;
  }

  const renderTodaysEstimated = () => {
    let total = 0;
    testExpenses.filter(e => e.estimated && e.date === moment(new Date()).format('DD')).forEach(expense => {
      total += expense.amount;
    })
    return total;
  }

  const renderMonthlyEstimated = () => {
    let total = 0;
    testExpenses.filter(e => e.estimated).forEach(expense => {
      total += expense.amount;
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
                <h3>4005</h3>
              </Card>
            </Col>
            <Col xs={4} className="mb-3">
              <Card className="d-flex flex-column align-items-center">
                <h5 className="title">Monthly Balance</h5>
                <h3>4005</h3>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={4} className="mb-3">
              <Card className="d-flex flex-column align-items-center">
                <h5 className="title">Today</h5>
                <Tooltip id="todays-estimated" message={`${renderTodaysEstimated()}/${renderTodaysExpenses()} is estimated`} place="bottom" >
                  <h3 className={renderTodaysExpenses() === 0 ? "text-primary" : "text-danger"}>-{renderTodaysExpenses()}</h3>
                </Tooltip>
              </Card>
            </Col>
            <Col className="mb-3">
              <Card className="d-flex flex-column align-items-center">
                <h5 className="title">Monthly</h5>
                <Tooltip id="monthly-estimated" message={`${renderMonthlyEstimated()}/${renderMonthlyExpenses()} is estimated`} place="bottom" >
                  <h3 className={renderMonthlyExpenses() === 0 ? "text-primary" : "text-danger"}>-{renderMonthlyExpenses()}</h3>
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


