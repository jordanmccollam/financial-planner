import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';

const logger = "Table:: ";

const Table = (props) => {
  const {
    children, className,
    columns,
    data
  } = props;

  return (
    <div className={`${className} table`}>

      <Row className="border-bottom mx-3">
        {/* TABLE LABELS */}
        {columns.map((col, index) => {
          return (
            <Col key={`table-label-${index}`}>
              <div className="table-label">{col.label.toUpperCase()}</div>
            </Col>
          )
        })}
      </Row>

        {/* TABLE LABELS */}
        {data.map((row, rowIndex) => {
          return (
            <Row key={`table-row-${rowIndex}`} className="mx-3 py-2 border-bottom table-row">
              {columns.map((el, index) => {
                return (
                  <Col key={`table-element-${index}`}>
                    <div className="table-col">{el.customCol ? el.customCol() : el.accessor ? row[el.accessor] : row[el.label]}</div>
                  </Col>
                )
              })}
            </Row>
          )
        })}
    
      {children}
    </div>
  )
}

export default Table;


