import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import { Card, Table, Icon } from '../../components';
import apis from '../../api';

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

const initialExpense = {
  label: '',
  amount: 0,
  autopay: false,
  estimated: false,
  repeat: 1,
  date: '01'
}

const Sheet = (props) => {
  const [ addModal, setAddModal ] = useState(false);
  const [ editModal, setEditModal ] = useState(false);
  const [ newExpense, setNewExpense ] = useState(initialExpense);
  let classes = {
		[`sheet`]: true
	};

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

  const addHandler = () => {
    console.log(logger + "addHandler");
    toggleShow();
  }
  const deleteHandler = async (selected) => {
      console.log(logger + "deleteHandler: target", selected);
      selected.forEach(el => {
          apis.deleteExpense(props.user.token, el._id).then(res => {
              console.log(logger + "deleteHandler: res", res);
          }).catch(e => {
              console.error(logger + 'deleteHandler', e);
          })
      });
      props.setUser({
          ...props.user,
          expenses: props.user.expenses.filter(e => !selected.find(s => s._id === e._id))
      })
  }
  const editHandler = (el) => {
      console.log(logger + "editHandler", el);
      setNewExpense(el);
      setEditModal(el);
  }

  const actions = [
    {
      title: 'Add Expenses',
      icon: "BiPlus",
      type: 'global', // single, multi, global?
      handler: addHandler,
    },
    {
      title: 'Delete Expenses',
      icon: "BiMinus",
      type: 'multi', // single, multi, global?
      handler: deleteHandler,
      variant: 'danger'
    },
    {
      title: 'Edit Expense',
      icon: "MdEdit",
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

  const handleCheck = (field) => {
    setNewExpense({
      ...newExpense,
      [field]: !newExpense[field]
    })
  }

  const add = () => {
    apis.createExpense(props.user.token, {...newExpense, user: props.user._id}).then(res => {
      console.log(logger + 'createExpense: res ', res);
      props.setUser({
        ...props.user,
        expenses: [...props.user.expenses, res.data.output]
      })
      setAddModal(false);
      setNewExpense(initialExpense);
    }).catch(e => {
      console.error(logger + 'createExpense', e);
    })
  }

  const edit = () => {
    if (newExpense._id) {
      let _user = JSON.parse(JSON.stringify(props.user));
      apis.updateExpense(props.user.token, newExpense._id, {...newExpense}).then(res => {
        console.log(logger + 'editExpense: res ', res);
        _user.expenses.splice(_user.expenses.indexOf(_user.expenses.find(e => e._id === newExpense._id)), 1, res.data.output);
        props.setUser(_user);
        setEditModal(false);
        setNewExpense(initialExpense);
      }).catch(e => {
        console.error(logger + 'editExpense', e);
      })
    }
  }

  const validate = () => {
    if (newExpense.label && newExpense.amount > -1 && newExpense.date && newExpense.repeat) {
      return false;
    } else {
      return true;
    }
  }

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
  user: PropTypes.object,
  setUser: PropTypes.func
}

Sheet.defaultProps = {
  className: "",
}

export default Sheet;


