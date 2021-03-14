import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import * as apis from './api';
import * as Screens from './screens';
import * as Comp from './components';
import { Spinner } from 'react-bootstrap';

function App() {
  // const { loginWithRedirect, logout, user, getAccessTokenSilently } = useAuth0();
  const [ theme, setTheme ] = useState('theme--light');
  const [ dbUser, setDbUser ] = useState(null);
  const [ token, setToken ] = useState(null);
  const [ user, setUser ] = useState({email: 'jordy.mccollam@gmail.com'});
  // const [ user, setUser ] = useState(null);

  useEffect(() => {
    if (user) {
      connectUserToDb();
    }
  }, [user])

  const connectUserToDb = async () => {
    const _token = 'test';
    // const _token = await getAccessTokenSilently();
    // setToken(_token);
    apis.getUser(_token, user.email).then(res => {
      console.log("connectUserToDb:: res", res);
      if (!res.data.output) {
        createUser(_token);
      } else {
        setTheme(res.data.output.theme);
        setDbUser(res.data.output);
      }
    }).catch(e => {
      console.error("connectUserToDb", e);
    }) 
  }

  const createUser = (_token) => {
    apis.createUser(_token, {email: user.email}).then(res => {
      console.log("createUser:: res", res);
      connectUserToDb();
    }).catch(e => {
      console.error("createUser", e);
    })
  }

  return (
    <div className="App">

      {dbUser ? (
        <Container fluid className="px-0" style={{overflow: 'hidden'}}>
          <Comp.Navbar />
          <Row className="p-3">
            <Col>
              <Screens.Sheet />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <div className="text-center full d-flex flex-column justify-content-center align-items-center">
            <Spinner animation="border" variant="light" style={{height: 100, width: 100}} />
            <h5 className="text-light mt-4">Please wait while we load your data...</h5>
          </div>
        </Container>
      )}
    </div>
  );
}

export default App;
