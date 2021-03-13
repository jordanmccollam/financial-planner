import React, { useState, useEffect } from "react";
import { Card } from '../../components';
import { Row, Col } from 'react-bootstrap';

const logger = "Sheet";

const Sheet = (props) => {

  return (
    <div className="sheet">
      <Row>
        <Col lg={5}>
          <Card className="full" title="Expenses" >
            <h5 className="border-bottom-custom" style={{width: 'min-content'}}>Expenses</h5>
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


