import { Container, Row, Col } from 'react-bootstrap';
import * as Screens from './screens';
import * as Comp from './components';

function App() {
  return (
    <div className="App">
      <Comp.Navbar />
      <Screens.Home />
    </div>
  );
}

export default App;
