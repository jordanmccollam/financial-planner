import React, { useState, useEffect } from "react";
import { Card, Tooltip } from '../../components';
import { Row, Col, Button } from 'react-bootstrap';
import Expenses from './Expenses';

const logger = "Sheet:: ";

const testExpenses = [
  {
    label: 'Rent',
    amount: 1280,
    autopay: false,
    estimated: true,
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

  const renderTotal = () => {
    var total = 0;
    testExpenses.forEach(expense => {
      total += expense.amount;
    });
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
          <Card>
            <Row>
              <Col className="d-flex flex-column align-items-center">
                  <h5 className="title">Monthly Expenses</h5>
                  <h3 className="text-danger">-{renderTotal()}</h3>
              </Col>
              <Col className="d-flex flex-column align-items-center">
                  <h5 className="title">Monthly Expenses</h5>
                  <h3 className="text-danger">-{renderTotal()}</h3>
              </Col>
              <Col className="d-flex flex-column align-items-center">
                  <h5 className="title">Monthly Expenses</h5>
                  <h3 className="text-danger">-{renderTotal()}</h3>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Sheet;


