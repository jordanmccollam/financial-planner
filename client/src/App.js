import { Container, Row, Col } from 'react-bootstrap';
import * as Screens from './screens';
import * as Comp from './components';

function App() {
  return (
    <div className="App">
      <Container fluid className="px-0" style={{overflow: 'hidden'}}>
        <Comp.Navbar />
        <Row className="p-3">
          <Col>
            <Screens.Home />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
