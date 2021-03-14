import React, { useState, useEffect, useMemo } from "react";
import { Card, Tooltip, Table, Modal, Checkbox, DatePicker } from '../../components';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import apis from '../../api';

const logger = "Sheet/Expenses:: ";

const initialExpense = {
    label: '',
    amount: 0,
    autopay: false,
    estimated: false,
    repeat: 1,
    date: '01'
}

const Expenses = (props) => {
    const {
        user,
        setUser
    } = props;
    const [ addModal, setAddModal ] = useState(false);
    const [ newExpense, setNewExpense ] = useState(initialExpense);

    const columns = [
        { label: 'label' },
        { label: 'amount' },
        { label: 'autopay' },
        { label: 'Est.', accessor: 'estimated' },
        { label: 'date' },
    ];

    const addHandler = () => {
        console.log(logger + "addHandler");
        toggleShow();
    }
    const deleteHandler = async (selected) => {
        console.log(logger + "deleteHandler: target", selected);
        selected.forEach(el => {
            apis.deleteExpense(user.token, el._id).then(res => {
                console.log(logger + "deleteHandler: res", res);
            }).catch(e => {
                console.error(logger + 'deleteHandler', e);
            })
        });
        setUser({
            ...user,
            expenses: user.expenses.filter(e => !selected.find(s => s._id === e._id))
        })
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

    const toggleShow = () => {
        setAddModal(!addModal);
    }

    const onChange = (event) => {
        setNewExpense({
            ...newExpense,
            [event.target.name]: event.target.value
        })
    }

    const onChangeDate = (date) => {
        setNewExpense({
            ...newExpense,
            date: date
        })
    }

    const handleCheck = (field) => {
        setNewExpense({
            ...newExpense,
            [field]: !newExpense[field]
        })
    }

    const done = () => {
        apis.createExpense(user.token, {...newExpense, user: user._id}).then(res => {
            console.log(logger + 'createExpense: res ', res);
            setUser({
                ...user,
                expenses: [...user.expenses, res.data.output]
            })
            setAddModal(false);
            setNewExpense(initialExpense);
        }).catch(e => {
            console.error(logger + 'createExpense', e);
        })
    }

    const validate = () => {
        if (newExpense.label && newExpense.amount > -1 && newExpense.date && newExpense.repeat) {
            return false;
        } else {
            return true;
        }
    }

    const renderTable = () => {
        return (
            <Table  
                title="Expenses"
                data={user.expenses}
                columns={columns}
                actions={actions}
                sortAccessor={'date'}
                size={9}
            />
        )
    }

    return (
        <Row>
            <Col>
                {renderTable()}
            </Col>

            <Modal title="Add Expense" show={addModal} setShow={setAddModal} >
                <Form.Label >Label</Form.Label>
                <Form.Control placeholder="Ex: Rent" name="label" value={newExpense.label} onChange={onChange} />

                <Row>
                    <Col lg={4}>
                        <Form.Label className="mt-3" >Amount</Form.Label>
                        <Form.Control type="number" name="amount" value={newExpense.amount} onChange={onChange} />
                    </Col>
                    <Col>
                        <Form.Label className="mt-3" >Due Date</Form.Label>
                        <Form.Control name="date" value={newExpense.date} onChange={onChange} />
                    </Col>
                </Row>

                <Row className="text-center mt-3 mb-4">
                    <Col>
                        <Form.Label >Autopay</Form.Label>
                        <div><Checkbox checked={newExpense.autopay} onCheck={() => handleCheck('autopay')} /></div>
                    </Col>
                    <Col>
                        <Form.Label >Estimated</Form.Label>
                        <div><Checkbox checked={newExpense.estimated} onCheck={() => handleCheck('estimated')} /></div>
                    </Col>
                </Row>

                <Button block onClick={done} disabled={validate()} >Done</Button>
            </Modal>
        </Row>
    )
}

export default Expenses;


