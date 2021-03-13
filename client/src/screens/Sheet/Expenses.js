import React, { useState, useEffect } from "react";
import { Card, Tooltip, Table } from '../../components';
import { Row, Col, Button } from 'react-bootstrap';

const logger = "Sheet/Expenses:: ";

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

const Expenses = (props) => {

    const columns = [
        {
            label: 'label',
            // accessor: 'label'
            // customCol: (el) => {
            //     return <div>{el.label}</div>;
            // }
        },
        {
            label: 'amount',
        }
    ];

    return (
        <Row>
            <Col xs={12} className="d-flex justify-content-between mb-3">
                <h5 className="border-bottom-custom" style={{width: 'min-content'}}>Expenses</h5>
                <Tooltip id="test" message="Add Expense" >
                    <Button className="px-3 py-0" >+</Button>
                </Tooltip>
            </Col>

            <Col className="px-0">
                <Table  
                    data={testExpenses}
                    columns={columns}
                />
            </Col>
        </Row>
    )
}

export default Expenses;


