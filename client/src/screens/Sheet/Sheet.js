import React, { useState, useEffect } from "react";
import { Card, Tooltip } from '../../components';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Expenses from './Expenses';
import moment from 'moment';
import { MdEdit } from 'react-icons/md';
import { BiCheck } from 'react-icons/bi';
import apis from "../../api";

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
  const { user, setUser } = props;
  const [ newBalance, setNewBalance ] = useState(-1);

  const toggleEditBalace = () => {
    if (newBalance > -1) {
      updateBalance(newBalance);
      setNewBalance(-1);
    } else {
      setNewBalance(user.monthlyEarnings ? user.monthlyEarnings : 0);
    }
  }

  const updateBalance = (_balance) => {
    console.log(logger + 'updateBalance', _balance);
    apis.updateUser(user.token, user._id, {monthlyEarnings: _balance}).then(res => {
      console.log(logger + 'updateBalance:: res', res);
      setUser({
        ...user,
        monthlyEarnings: _balance
      })
    }).catch(e => {
      console.error(logger + 'updateBalance', e);
    });
  }

  const getMonthlyExpenses = () => {
    let total = 0;
    user.expenses.forEach(expense => {
      total += expense.amount;
    });
    return total;
  }

  const getMonthlyEstimated = () => {
    let total = 0;
    user.expenses.filter(e => e.estimated).forEach(expense => {
      total += expense.amount;
    })
    return total;
  }

  const getBalanceAfterExpenses = () => {
    let total = user.monthlyEarnings || 0;
    let modifer = getMonthlyExpenses();
    total -= modifer;
    return total;
  }

  const getEstimatedRemainingExpenses = () => {
    let total = 0;
    user.expenses.filter(e => parseInt(e.date) >= parseInt(moment(new Date()).format('DD'))).forEach(expense => {
      if (expense.estimated) {
        total += expense.amount;
      }
    })
    return total;
  }

  const getRemainingExpenses = () => {
    let total = getMonthlyExpenses();
    user.expenses.filter(e => parseInt(e.date) <= parseInt(moment(new Date()).format('DD'))).forEach(expense => {
      total -= expense.amount;
    })
    return total;
  }

  const getCurrentBalance = () => {
    let total = user.monthlyEarnings || 0;
    user.expenses.filter(e => parseInt(e.date) <= parseInt(moment(new Date()).format('DD'))).forEach(expense => {
      total -= expense.amount;
    })
    return total;
  }

  const getCurrentBalanceEstimated = () => {
    let total = 0;
    user.expenses.filter(e => e.estimated && parseInt(e.date) <= parseInt(moment(new Date()).format('DD'))).forEach(expense => {
      total += expense.amount;
    })
    return total;
  }

  const getTodaysExpenses = () => {
    let total = 0;
    user.expenses.filter(e => e.date === moment(new Date()).format('DD')).forEach(expense => {
      console.log("EXPENSE", expense.label);
      total += expense.amount;
    })
    return total;
  }

  const getTodaysEstimated = () => {
    let total = 0;
    user.expenses.filter(e => e.estimated && e.date === moment(new Date()).format('DD')).forEach(expense => {
      total += expense.amount;
    })
    return total;
  }

  return (
    <div className="sheet">
      <Row>
        <Col lg={5}>
          <Card className="full" title="Expenses" >
            <Expenses user={user} setUser={setUser} />
          </Card>
        </Col>
        <Col>

          <Row>
            <Col xs={4} className="mb-3">
              <Card className="d-flex flex-column align-items-center">
                <h5 className="title d-flex align-items-center">
                  Monthly Balance
                  <Tooltip id="edit-monthly-balance" message={newBalance > -1 ? "Done Editing" : "Edit Monthly Balance"} >
                    {newBalance > -1 ? (
                      <BiCheck onClick={toggleEditBalace} className="clear-btn"/>
                    ) : (
                      <MdEdit onClick={toggleEditBalace} className="clear-btn"/>
                    )}
                  </Tooltip>
                </h5>
                {newBalance > -1 ? (
                  <Form.Control type="number" value={newBalance} onChange={(event) => setNewBalance(event.target.value)} />
                ) : (
                  <h3>{user.monthlyEarnings ?? 0}</h3>
                )}
              </Card>
            </Col>
            <Col className="mb-3">
              <Card className="d-flex flex-column align-items-center">
                <h5 className="title">Balance After Expenses</h5>
                {/* <Tooltip id="balance-after" message={`${getEstimatedRemainingExpenses()}/${getBalanceAfterExpenses()} is estimated`} place="bottom" > */}
                  <h3 className="text-primary">{getBalanceAfterExpenses()}</h3>
                {/* </Tooltip> */}
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={7} className="mb-3">
              <Card className="d-flex flex-column align-items-center">
                <h5 className="title">Current Balance</h5>
                {/* <Tooltip id="current-balance" message={`${getCurrentBalanceEstimated()}/${getCurrentBalance()} is estimated`} place="bottom" > */}
                  <h3 className="text-primary">{getCurrentBalance()}</h3>
                {/* </Tooltip> */}
              </Card>
            </Col>
            <Col className="mb-3">
              <Card className="d-flex flex-column align-items-center">
                <h5 className="title">Total Expenses</h5>
                <Tooltip id="monthly-expenses" message={`${getMonthlyEstimated()}/${getMonthlyExpenses()} is estimated`} place="bottom" >
                  <h3 className="text-danger">{getMonthlyExpenses()}</h3>
                </Tooltip>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col className="mb-3">
              <Card className="d-flex flex-column align-items-center">
                <h5 className="title">Remaining Expenses</h5>
                <Tooltip id="remaining-expenses" message={`${getEstimatedRemainingExpenses()}/${getRemainingExpenses()} is estimated`} place="bottom" >
                  <h3 className="text-danger">{getRemainingExpenses()}</h3>
                </Tooltip>
              </Card>
            </Col>
            <Col className="mb-3">
              <Card className="d-flex flex-column align-items-center">
                <h5 className="title">Withdrawn Today</h5>
                <Tooltip id="todays-expenses" message={`${getTodaysEstimated()}/${getTodaysExpenses()} is estimated`} place="bottom" >
                  <h3 className="text-danger">{getTodaysExpenses()}</h3>
                </Tooltip>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card className="pb-0">
                <h5 className="title">Tips</h5>
                <ul>
                  <li className="mb-2">Click on the icon next to the Monthly Balance card to change your monthly balance</li>
                  <li className="mb-2">Hover over the numbers above to see how much of it may be estimated</li>
                  <li className="mb-2">Try selecting items from the expenses table to see what actions are available</li>
                </ul>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Sheet;


