import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from 'react-bootstrap';
import apis from "../../api";
import { Card } from '../../components';

const logger = "CreateSheet:: ";

const CreateSheet = (props) => {
  const { user } = props;
  const [ value, setValue ] = useState('');
  const [ done, setDone ] = useState(false);

  const onChange = (event) => {
    setValue(event.target.value);
  }

  const checkDone = () => {
    if (value.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  const onDone = () => {
    apis.updateUser(user.token, user._id, {currentSheet: value, sheets: [...user.sheets, value]}).then(res => {
      console.log("updateUser:: res", res);
      setDone(true);
    }).catch(e => {
      console.error("updateUser", e);
    })
  }

  return (
    <div className="create-sheet">
      <Row className="justify-content-center align-items-center pt-4">
        <Col lg={6}>
          <Card className="scale-up-center">
            <h5 className="title">Let's name your first sheet.</h5>
            <Form.Control placeholder="My First Sheet" className="mt-2" value={value} onChange={onChange} />
            <Button className="mt-3" onClick={onDone} disabled={checkDone()}>Done</Button>
          </Card>
        </Col>
      </Row>
      <Row className={`justify-content-center align-items-center pt-4 scale-up-center ${!done && 'd-none'}`}>
        <Col lg={6}>
          <Card className="py-5">
            <Row className="align-items-center justify-content-center">
              <Col sm={7} lg={8} className="d-flex flex-column text-center align-items-center">
                <h4 className="title">Easy!</h4>
                <p>Now we'll show you your sheet and how you can add your first expense to start seeing some helpful numbers.</p>
                <Button onClick={() => window.location.reload()}>Sounds good!</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CreateSheet;


