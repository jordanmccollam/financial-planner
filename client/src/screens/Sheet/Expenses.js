import React, { useState, useEffect } from "react";
import { Card, Tooltip, Table } from '../../components';
import { Row, Col, Button } from 'react-bootstrap';
import { BiPlus, BiMinus } from 'react-icons/bi';

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
        // { label: 'estimated' },
        { label: 'date' },
    ];

    const addHandler = () => {
        console.log(logger + "addHandler");
    }
    const deleteHandler = () => {
        console.log(logger + "deleteHandler");
    }

	const actions = [
		{
			title: 'Add Expenses',
			icon: <BiPlus />,
			type: 'global', // single, multi, global?
			handler: addHandler,
		},
		{
			title: 'Delete Expenses',
			icon: <BiMinus />,
			type: 'multi', // single, multi, global?
			handler: deleteHandler,
            variant: 'danger'
		},
	]

    return (
        <Row>
            <Col>
                <Table  
                    title="Expenses"
                    data={testExpenses}
                    columns={columns}
                    actions={actions}
                />
            </Col>
        </Row>
    )
}

export default Expenses;


