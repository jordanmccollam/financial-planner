import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container, Form } from 'react-bootstrap';
import { Tooltip } from '../index';
import { BiCheck, BiX, BiCheckbox } from 'react-icons/bi';
import { BsCheckBox, BsSquare, BsDashSquare } from 'react-icons/bs';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const logger = "Table:: ";

const defaultSize = 10;

const Table = (props) => {
  const {
    children, className,
    columns,
    data,
    title,
    actions,
    sortAccessor,
    size
  } = props;
  const [ selected, setSelected ] = useState([]);
  const [ page, setPage ] = useState(0);
  const [ sliced, setSliced ] = useState([]);
  const [ searchResults, setSearchResults ] = useState(data? data : []);
  const [ searchValue, setSearchValue ] = useState('');

  useEffect(() => {
    reset();
  }, [data])

  useEffect(() => {
    setSliced(searchResults.slice(page, (size ? page + size : page + defaultSize)));
  }, [searchResults, page])

  const reset = () => {
    setSliced([]);
    setPage(0);
    setSelected([]);
    setSearchValue('');
    setSearchResults(data ? data : []);
  }

  const renderElement = (el, row) => {
    if (row && el) {
      if (el.customCol) {
        return el.customCol(row);
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

  const toggleSelectAll = (e) => {
    if (e.shiftKey) {
      if (selected.length > 0) {
        setSelected([]);
      } else {
        setSelected(searchResults);
      }
    } else {
        if (selected.some(s => sliced.indexOf(s) >= 0)) {
          setSelected(selected.filter(s => sliced.indexOf(s) < 0));
        } else {
          let tmp = selected.filter(s => sliced.indexOf(s) < 0);
          sliced.forEach(item => {
              tmp.push(item);
          });
          setSelected(tmp);
        }
    }
  }

  const handleMultiAction = (handler) => {
    if (handler) {
      handler(selected);
    } else {
      console.log(logger + 'Multi Action!');
    }
    setSelected([]);
  }

  const handleSingleAction = (handler) => {
    if (handler) {
      handler(selected[0]);
    } else {
      console.log(logger + 'Single Action!');
    }
    setSelected([]);
  }

  const onSearch = (event) => {
    setSearchValue(event.target.value);
    const results = data.filter((d) => columns.some((c) => {
        if (c.customCol) {
          const element = c.customCol(d);
          const value = element.props.children
          return (
              typeof value === 'string' && value.toUpperCase().includes(event.target.value.toUpperCase()) ||
              typeof value === 'object' && value.some(a => a.toUpperCase().includes(event.target.value.toUpperCase()))
          )
        } else {
          let tmp = c.accessor ? c.accessor : c.label;
          return (
              typeof d[tmp] === 'string' && d[tmp].toUpperCase().includes(event.target.value.toUpperCase()) ||
              typeof d[tmp] === 'object' && d[tmp].some(a => a.toUpperCase().includes(event.target.value.toUpperCase()))
          )
        }
    }));
    setSearchResults(results);
    setPage(0);
  }

  return (
    <Container className={`${className} table`}>
      <Row>
        <Col xs={12} className="d-flex justify-content-between mb-3 px-0">
          <div className="center-v">
            <h5 className="title mr-2 mt-2">{title ? title : 'Table Title'}</h5>
            {actions && actions.filter(a => a.type && a.type === 'global').map((action, index) => {
              return (
                <Tooltip key={`table-action-${index}`} id={action.title ? action.title : 'Action!'} message={action.title ? action.title : 'Action!'} >
                  <Button variant={action.variant ? action.variant : 'primary'} onClick={action.handler ? action.handler : () => console.log(logger + "Action!")} className="px-2 py-0 ml-1" >{action.icon ? action.icon : '?'}</Button>
                </Tooltip>
              )
            })}
            {(selected.length > 0 && actions) && actions.filter(a => a.type && a.type === 'multi').map((action, index) => {
              return (
                <Tooltip key={`table-action-${index}`} id={action.title ? action.title : 'Action!'} message={action.title ? action.title : 'Action!'} >
                  <Button variant={action.variant ? action.variant : 'primary'} onClick={() => handleMultiAction(action.handler)} className="px-2 py-0 ml-1" >{action.icon ? action.icon : '?'}</Button>
                </Tooltip>
              )
            })}
            {(selected.length === 1) && actions.filter(a => a.type && a.type === 'single').map((action, index) => {
              return (
                <Tooltip key={`table-action-${index}`} id={action.title ? action.title : 'Action!'} message={action.title ? action.title : 'Action!'} >
                  <Button variant={action.variant ? action.variant : 'primary'} onClick={() => handleSingleAction(action.handler)} className="px-2 py-0 ml-1" >{action.icon ? action.icon : '?'}</Button>
                </Tooltip>
              )
            })}
            {selected.length > 0 && (
              <div className="ml-3 selected-msg">{selected.length} selected</div>
            )}
          </div>
          <div className="d-flex">
            <Form.Control value={searchValue} onChange={onSearch} placeholder="Search" className="mb-2 ml-2" style={{height: 35}} />
          </div>
        </Col>
      </Row>

      {/* TABLE LABELS */}
      <Row className="border-bottom align-items-center">
        <Col xs={1} className="p-0 d-flex justify-content-center">
          <Tooltip id={'table-select-tooltip'} message={`Shift + click to ${selected.length > 0 ? 'UNSELECT' : 'SELECT'} ${selected.length > 0 ? 'ALL' : searchResults.length} items`} className="pl-0" >
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
      {(data?.length > 0 && columns) ? 
      sliced.map((row, rowIndex) => {
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
      
      <Row>
        <Col xs={12} className="center mt-3">
          <div onClick={() => page !== 0 ? setPage(page-(size ? size : defaultSize)) : console.log(logger + 'Already on page 1')} className="clear-btn"><IoIosArrowBack/></div>
          <div>{Math.ceil(page / (size ? size : defaultSize)) + 1} / {Math.ceil(searchResults.length / (size ? size : defaultSize))}</div>
          <div onClick={() => ((Math.ceil(page / (size ? size : defaultSize)) + 1) !== (Math.ceil(searchResults.length / (size ? size : defaultSize)))) ? setPage(page+(size ? size : defaultSize)) : console.log(logger + 'Already on last page')} className="clear-btn"><IoIosArrowForward/></div>
        </Col>
      </Row>
    </Container>
  )
}

export default Table;


