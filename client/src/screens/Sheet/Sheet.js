import React, { useState, useEffect } from "react";
import { Card, Tooltip } from '../../components';
import { Row, Col, Button } from 'react-bootstrap';
import Expenses from './Expenses';

const logger = "Sheet:: ";

const Sheet = (props) => {

  return (
    <div className="sheet">
      <Row>
        <Col lg={5}>
          <Card className="full" title="Expenses" >
            <Expenses />
          </Card>
        </Col>
        <Col >
          <Card className="half mb-4">
            
          </Card>
          <Card className="half">

          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Sheet;


