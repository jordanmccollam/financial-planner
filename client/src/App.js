import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import * as apis from './api';
import * as Screens from './screens';
import * as Comp from './components';
import { Spinner } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

import './App.scss';

function App() {
  const { loginWithRedirect, logout, user, getAccessTokenSilently } = useAuth0();
  const [ theme, setTheme ] = useState('theme--light');
  const [ dbUser, setDbUser ] = useState(null);
  const [ token, setToken ] = useState(null);

  useEffect(() => {
    if (user) {
      console.log('User', user);
      connectUserToDb();
    }
  }, [user])

  const signOut = () => {
    logout();
  }

  const connectUserToDb = async () => {
    // const _token = 'test';
    const _token = await getAccessTokenSilently();
    setToken(_token);
    apis.getUser(_token, user.email).then(res => {
      console.log("connectUserToDb:: res", res);
      if (!res.data.output) {
        createUser(_token);
      } else {
        setTheme(res.data.output.theme);
        setDbUser({...res.data.output, _token, ...user});
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
      <Container fluid className="px-0">
        <Row className="full px-0 mx-0 py-3">
          <Col>
      
            {user ? (
              dbUser ? (
                // LOGGED IN CONTENT
                <>
                  <Comp.Navbar signout={logout} user={dbUser} />
                  <Screens.Sheet user={dbUser} setUser={setDbUser} />
                </>
                // ------------------
              ) : (
                <Container>
                  <div className="text-center full d-flex flex-column justify-content-center align-items-center">
                    <Spinner animation="border" variant="light" style={{height: 100, width: 100}} />
                    <h5 className="text-light mt-4">Please wait...</h5>
                  </div>
                </Container>
              )
            ) : (
              // LOGGED OUT CONTENT
              <>
                <Screens.Welcome signIn={loginWithRedirect} />
              </>
              // ------------------
            )}

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
