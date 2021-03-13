import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container } from 'react-bootstrap';
import { Tooltip } from '../index';
import { BiCheck, BiX, BiCheckbox } from 'react-icons/bi';
import { BsCheckBox, BsSquare, BsDashSquare } from 'react-icons/bs';

const logger = "Table:: ";

const Table = (props) => {
  const {
    children, className,
    columns,
    data,
    title,
    actions
  } = props;
  const [ selected, setSelected ] = useState([]);

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

  const selectRow = (row) => {
    if (selected.includes(row)) {
      setSelected(old => old.filter(o => o !== row));
    } else {
      setSelected(old => [...old, row]);
    }
  }

  const toggleSelectAll = () => {
    if (selected.length === 0) {
      setSelected(data);
    } else {
      setSelected([]);
    }
  }

  const handleMultiAction = (handler) => {
    if (handler) {
      for (var i = 0; i < selected.length - 1; i++) {
        handler(selected[i]);
      }
    } else {
      console.log(logger + 'Action!');
    }
  }

  return (
    <Container className={`${className} table`}>
      <Row>
        <Col xs={12} className="d-flex justify-content-between mb-3 px-0">
            <h5 className="title">{title ? title : 'Table Title'}</h5>
            <div className="d-flex">
              {(selected.length === 1) && actions.filter(a => a.type && a.type === 'single').map((action, index) => {
                return (
                  <Tooltip key={`table-action-${index}`} id={action.title ? action.title : 'Action!'} message={action.title ? action.title : 'Action!'} >
                    <Button variant={action.variant ? action.variant : 'primary'} onClick={() => handleMultiAction(action.handler)} className="px-3 py-0 ml-1" >{action.icon ? action.icon : '?'}</Button>
                  </Tooltip>
                )
              })}
              {(selected.length > 0 && actions) && actions.filter(a => a.type && a.type === 'multi').map((action, index) => {
                return (
                  <Tooltip key={`table-action-${index}`} id={action.title ? action.title : 'Action!'} message={action.title ? action.title : 'Action!'} >
                    <Button variant={action.variant ? action.variant : 'primary'} onClick={() => handleMultiAction(action.handler)} className="px-3 py-0 ml-1" >{action.icon ? action.icon : '?'}</Button>
                  </Tooltip>
                )
              })}
              {actions && actions.filter(a => a.type && a.type === 'global').map((action, index) => {
                return (
                  <Tooltip key={`table-action-${index}`} id={action.title ? action.title : 'Action!'} message={action.title ? action.title : 'Action!'} >
                    <Button variant={action.variant ? action.variant : 'primary'} onClick={action.handler ? action.handler : () => console.log(logger + "Action!")} className="px-3 py-0 ml-1" >{action.icon ? action.icon : '?'}</Button>
                  </Tooltip>
                )
              })}
            </div>
        </Col>
      </Row>

      {/* TABLE LABELS */}
      <Row className="border-bottom align-items-center">
        <Col xs={1} className="p-0 d-flex justify-content-center">
          <Tooltip id={'table-select-tooltip'} message={'Select All'} className="pl-0" >
            <Button variant="transparent" onClick={toggleSelectAll} className="table-col text-primary">{selected.length > 0 ? <BsDashSquare size={13} /> : <BsSquare size={13} />}</Button>
            {/* <Button onClick={toggleSelectAll} variant="outline-primary" className="table-label btn-sm">{selected.length > 0 ? 'Unselect' : 'Select'}</Button> */}
          </Tooltip>
        </Col>
        {(data && columns) ? columns.map((col, index) => {
          return (
            <Col key={`table-label-${index}`}>
              <div className="table-label">{col.label.toUpperCase()}</div>
            </Col>
          )
        }) : (<Col></Col>)}
      </Row>

      {/* TABLE ROWS */}
      {(data && columns) ? data.slice(0, 10).map((row, rowIndex) => {
        return (
          <Row key={`table-row-${rowIndex}`} className={`py-2 border-bottom table-row align-items-center ${selected.includes(row) && 'bg-selected'}`} onClick={() => selectRow(row)}>
            <Col xs={1} className="d-flex justify-content-center">
              <div className="table-col">{selected.includes(row) ? <BsCheckBox size={16} className="text-primary" /> : <BsSquare size={13} />}</div>
            </Col>
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


