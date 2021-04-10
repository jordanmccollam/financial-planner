import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Card, Table, Icon, Modal, Button, Checkbox, Expenses, Tooltip } from '../../components';
import apis from '../../api';
import moment from 'moment';

import './_sheet.scss';

const logger = "Sheet:: ";

const iconSize = 25;

const Sheet = (props) => {
  const [ newBalance, setNewBalance ] = useState(-1);
  let classes = {
		[`sheet`]: true
	};

  const toggleEditBalace = () => {
    if (newBalance > -1) {
      updateBalance(newBalance);
      setNewBalance(-1);
    } else {
      setNewBalance(props.user.monthlyEarnings ? props.user.monthlyEarnings : 0);
    }
  }

  const updateBalance = (_balance) => {
    console.log(logger + 'updateBalance', _balance);
    apis.updateUser(props.user.token, props.user._id, {monthlyEarnings: _balance}).then(res => {
      console.log(logger + 'updateBalance:: res', res);
      props.setUser({
        ...props.user,
        monthlyEarnings: _balance
      })
    }).catch(e => {
      console.error(logger + 'updateBalance', e);
    });
  }

  const getMonthlyExpenses = () => {
    let total = 0;
    props.user.expenses.forEach(expense => {
      total += expense.amount;
    });
    return total;
  }

  const getMonthlyEstimated = () => {
    let total = 0;
    props.user.expenses.filter(e => e.estimated).forEach(expense => {
      total += expense.amount;
    })
    return total;
  }

  const getBalanceAfterExpenses = () => {
    let total = props.user.monthlyEarnings || 0;
    let modifer = getMonthlyExpenses();
    total -= modifer;
    return total;
  }

  const getEstimatedRemainingExpenses = () => {
    let total = 0;
    props.user.expenses.filter(e => parseInt(e.date) >= parseInt(moment(new Date()).format('DD'))).forEach(expense => {
      if (expense.estimated) {
        total += expense.amount;
      }
    })
    return total;
  }

  const getRemainingExpenses = () => {
    let total = getMonthlyExpenses();
    props.user.expenses.filter(e => parseInt(e.date) <= parseInt(moment(new Date()).format('DD'))).forEach(expense => {
      total -= expense.amount;
    })
    return total;
  }

  const getCurrentBalance = () => {
    let total = props.user.monthlyEarnings || 0;
    props.user.expenses.filter(e => parseInt(e.date) <= parseInt(moment(new Date()).format('DD'))).forEach(expense => {
      total -= expense.amount;
    })
    return total;
  }

  const getCurrentBalanceEstimated = () => {
    let total = 0;
    props.user.expenses.filter(e => e.estimated && parseInt(e.date) <= parseInt(moment(new Date()).format('DD'))).forEach(expense => {
      total += expense.amount;
    })
    return total;
  }

  const getTodaysExpenses = () => {
    let total = 0;
    props.user.expenses.filter(e => e.date === moment(new Date()).format('DD')).forEach(expense => {
      console.log("EXPENSE", expense.label);
      total += expense.amount;
    })
    return total;
  }

  const getTodaysEstimated = () => {
    let total = 0;
    props.user.expenses.filter(e => e.estimated && e.date === moment(new Date()).format('DD')).forEach(expense => {
      total += expense.amount;
    })
    return total;
  }

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col lg={5} className="mb-3">
        <Card className="full" >
          <>
            <Expenses {...props} />
          </>
        </Card>
      </Col>

      <Col>
        <Row >
          <Col md={4} className="mb-3" >
            <Card className="sheet-card" >
              <>
                <h3>Monthly Balance
                  <Tooltip content={newBalance > -1 ? "Done Editing" : "Edit Monthly Balance"} position="bottom" >
                    {newBalance > -1 ? (
                      <Button className="p-1" kind="ghost" onClick={toggleEditBalace}><Icon icon="BiCheck"/></Button>
                    ) : (
                      <Button className="p-1" kind="ghost" onClick={toggleEditBalace}><Icon icon="MdEdit"/></Button>
                    )}
                  </Tooltip>
                </h3>
                {newBalance > -1 ? (
                  <Form.Control type="number" value={newBalance} onChange={(event) => setNewBalance(event.target.value)} />
                ) : (
                  <h1 className="text-primary"><Icon icon="BiDollar" size={iconSize} className="mb-1"/>{props.user.monthlyEarnings ?? 0}</h1>
                )}
              </>
            </Card>
          </Col>
          <Col className="mb-3" >
            <Card className="sheet-card" >
              <>
                <h3>Balance After Expenses</h3>
                <h1 className="text-primary"><Icon icon="BiDollar" size={iconSize} className="mb-1"/>{getBalanceAfterExpenses()}</h1>
              </>
            </Card>
          </Col>
        </Row>
        <Row >
          <Col md={7} className="mb-3" >
            <Card className="sheet-card" >
              <>
                <h3>Current Balance</h3>
                <h1 className="text-primary"><Icon icon="BiDollar" size={iconSize} className="mb-1"/>{getCurrentBalance()}</h1>
              </>
            </Card>
          </Col>
          <Col className="mb-3" >
            <Card className="sheet-card" >
              <>
                <h3>Total Expenses</h3>
                <Tooltip content={`${getMonthlyEstimated()}/${getMonthlyExpenses()} is estimated`} position="bottom" >
                  <h1 className="text-primary"><Icon icon="BiDollar" size={iconSize} className="mb-1"/>{getMonthlyExpenses()}</h1>
                </Tooltip>
              </>
            </Card>
          </Col>
        </Row>
        <Row >
          <Col className="mb-3" >
            <Card className="sheet-card" >
              <>
                <h3>Remaining Expenses</h3>
                <Tooltip content={`${getEstimatedRemainingExpenses()}/${getRemainingExpenses()} is estimated`} position="bottom" >
                  <h1 className="text-primary"><Icon icon="BiDollar" size={iconSize} className="mb-1"/>{getRemainingExpenses()}</h1>
                </Tooltip>
              </>
            </Card>
          </Col>
          <Col className="mb-3" >
            <Card className="sheet-card" >
              <>
                <h3>Withdrawn Today</h3>
                <Tooltip content={`${getTodaysEstimated()}/${getTodaysExpenses()} is estimated`} position="bottom" >
                  <h1 className="text-primary"><Icon icon="BiDollar" size={iconSize} className="mb-1"/>{getTodaysExpenses()}</h1>
                </Tooltip>
              </>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card >
              <>
                <h3>Tips</h3>
                <ul>
                  <li className="mb-2">Click on the icon next to the Monthly Balance card to change your monthly balance</li>
                  <li className="mb-2">Hover over the numbers above to see how much of it may be estimated</li>
                  <li className="mb-2">Try selecting items from the expenses table to see what actions are available</li>
                </ul>
              </>
            </Card>
          </Col>
        </Row>
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
  user: {expenses: []},
  setUser: () => console.log(logger + 'setUser')
}

export default Sheet;


