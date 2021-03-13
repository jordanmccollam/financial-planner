import React, { useState, useEffect } from "react";
import { Card, Tooltip } from '../../components';
import { Row, Col, Button } from 'react-bootstrap';

const logger = "Sheet";

const Sheet = (props) => {

  return (
    <div className="sheet">
      <Row>
        <Col lg={4}>
          <Card className="full" title="Expenses" >
            <div className="d-flex justify-content-between" style={{width: '100%'}}>
              <h5 className="border-bottom-custom" style={{width: 'min-content'}}>Expenses</h5>
              <Tooltip id="test" message="Add Expense" >
                <Button className="px-3 py-0" >+</Button>
              </Tooltip>
            </div>
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


