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
        { label: 'label' },
        { label: 'amount' },
        { label: 'autopay' },
        { label: 'estimated' },
        { label: 'date' },
    ];

    return (
        <Row>
            <Col>
                <Table  
                    title="Expenses"
                    data={testExpenses}
                    columns={columns}
                />
            </Col>
        </Row>
    )
}

export default Expenses;


