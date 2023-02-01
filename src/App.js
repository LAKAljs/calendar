import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ReqUsers } from './components/DataCollection/LoginHandler';
import { GetUsers } from './components/DataCollection/Request';
import { useEffect, useState } from 'react';
import companyLogo from '../src/logo.png'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'


function App() {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <ThemeProvider breakpoints={['xl', 'lg', 'md', 'sm']}>
          <Container fluid>
            <Row className="d-flex align-items-center">
              <Col lg={4} className="text-lg-start">
                <img src={companyLogo} height="100px"/>
              </Col>
              <Col lg={5}>
                <h1 style={{ marginBottom: '0 auto' }}>LAKA's "fang" en kollega:</h1>
              </Col>
            </Row>
          </Container>
        </ThemeProvider>
        <GetUsers />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <ReqUsers />
      </UnauthenticatedTemplate>
    </div>
  );

  // return(
  //   <div className="App">
  //      <ThemeProvider breakpoints={['xl', 'lg', 'md', 'sm']}>
  //        <Container fluid>
  //        <Row className="">
  //           <Col lg={4} className="text-lg-start">
  //              <img src={companyLogo} height="100px"/>
  //           </Col>
  //            <Col lg={5}>
  //             <h1 style={{ marginBottom: '0 auto' }}>LAKA's "fang" en kollega:</h1>
  //          </Col>
  //          </Row>
  //    </Container>
  //      </ThemeProvider>
  //      <GetUsers />
  // </div>
  // )
}

export default App;
