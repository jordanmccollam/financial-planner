import React, { useState, useEffect } from "react";
import { Card, Tooltip, Table } from '../../components';
import { Row, Col, Button } from 'react-bootstrap';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';

const logger = "Sheet/Expenses:: ";

const Expenses = (props) => {
    const {
        expenses
    } = props;

    const columns = [
        { label: 'label' },
        { label: 'amount' },
        { label: 'autopay' },
        { label: 'Est.', accessor: 'estimated' },
        { label: 'date' },
    ];

    const addHandler = () => {
        console.log(logger + "addHandler");
    }
    const deleteHandler = () => {
        console.log(logger + "deleteHandler");
    }
    const editHandler = () => {
        console.log(logger + "editHandler");
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
		{
			title: 'Edit Expense',
			icon: <MdEdit />,
			type: 'single', // single, multi, global?
			handler: editHandler,
		},
	]

    return (
        <Row>
            <Col>
                <Table  
                    title="Expenses"
                    data={expenses}
                    columns={columns}
                    actions={actions}
                />
            </Col>
        </Row>
    )
}

export default Expenses;


