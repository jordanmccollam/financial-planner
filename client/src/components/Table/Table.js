import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col, Container, Form } from 'react-bootstrap';
import { Button, Icon, Tooltip } from '../../components'

import './_table.scss';

const logger = "Table:: ";

const Table = (props) => {
  const [ selected, setSelected ] = useState([]);
  const [ searchValue, setSearchValue ] = useState([]);
  const [ searchResults, setSearchResults ] = useState([]);
  const [ page, setPage ] = useState([]);
  let classes = {
		[`table`]: true
	};

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
    const results = props.data.filter((d) => props.columns.some((c) => {
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
    <Container className={`${props.className} ${classnames(classes)}`}>
      <Row>
        <Col xs={12} className="d-flex justify-content-between" >
          <div className="center-v">
            <h3 >{props.title}</h3>
            {props.actions.filter(a => a.type && a.type === 'global').map((action, i) => (
              <Tooltip key={`table-actions-global-${i}`} content={action.title} position="bottom" >
                <Button onClick={action.handler} ><><Icon icon={action.icon} /></></Button>
              </Tooltip>
            ))}
            {selected.length > 0 && props.actions.filter(a => a.type && a.type === 'global').map((action, i) => (
              <Tooltip key={`table-actions-multi-${i}`} content={action.title} position="bottom" >
                <Button onClick={() => handleMultiAction(action.handler)} ><><Icon icon={action.icon} /></></Button>
              </Tooltip>
            ))}
            {selected.length === 1 && props.actions.filter(a => a.type && a.type === 'global').map((action, i) => (
              <Tooltip key={`table-actions-single-${i}`} content={action.title} position="bottom" >
                <Button onClick={() => handleSingleAction(action.handler)} ><><Icon icon={action.icon} /></></Button>
              </Tooltip>
            ))}
            {selected.length > 0 && (
              <div className="table-selected-msg">{selected.length} selected</div>
            )}
          </div>
          <div className="d-flex">
            <Form.Control value={searchValue} onChange={onSearch} placeholder="Search" className="mb-2 ml-2 shadow-sm" style={{height: 35}} />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

Table.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  title: PropTypes.string,
  actions: PropTypes.array
}

Table.defaultProps = {
  className: "",
  data: [],
  title: 'Table Title',
  actions: []
}

export default Table;


