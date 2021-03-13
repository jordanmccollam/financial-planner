import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container } from 'react-bootstrap';
import { Tooltip } from '../index';
import { BiCheck, BiX } from 'react-icons/bi';

const logger = "Table:: ";

const Table = (props) => {
  const {
    children, className,
    columns,
    data,
    title
  } = props;

  const renderElement = (el, row) => {
    if (row && el) {
      if (el.customCol) {
        return el.customCol();
      }
      else if (el.accessor) {
        if (typeof row[el.accessor] === 'boolean') {
          if (row[el.accessor]) {
            return <BiCheck className="text-primary" />;
          } else {
            return <BiX className="text-danger" />;
          }
        } else {
          return row[el.accessor];
        }
      } 
      else if (el.label) {
        if (typeof row[el.label] === 'boolean') {
          if (row[el.label]) {
            return <BiCheck className="text-primary" />;
          } else {
            return <BiX className="text-danger" />;
          }
        } else {
          return row[el.label];
        }
      } 
      else return '-';
    } else return '-';
  }

  return (
    <Container className={`${className} table`}>
      <Row>
        <Col xs={12} className="d-flex justify-content-between mb-3 px-0">
            <h5 className="border-bottom-custom" style={{width: 'max-content'}}>{title ? title : 'Table Title'}</h5>
            <Tooltip id="test" message="Add Expense" >
                <Button className="px-3 py-0" >+</Button>
            </Tooltip>
        </Col>
      </Row>

      <Row className="border-bottom">
        {/* TABLE LABELS */}
        {(data && columns) ? columns.map((col, index) => {
          return (
            <Col key={`table-label-${index}`}>
              <div className="table-label">{col.label.toUpperCase()}</div>
            </Col>
          )
        }) : (<Col></Col>)}
      </Row>

      {/* TABLE ROWS */}
      {(data && columns) ? data.map((row, rowIndex) => {
        return (
          <Row key={`table-row-${rowIndex}`} className="py-2 border-bottom table-row">
            {columns.map((el, index) => {
              return (
                <Col key={`table-element-${index}`}>
                  <div className="table-col">{renderElement(el, row)}</div>
                </Col>
              )
            })}
          </Row>
        )
      }) : (
        <Row className="py-2 border-bottom table-row">
          <Col>
            <div className="table-col text-center"> No data</div>
          </Col>
        </Row>
      )}
    
      {children}
    </Container>
  )
}

export default Table;


