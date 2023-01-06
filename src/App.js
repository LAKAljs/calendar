import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import './App.css';
import { ReqUsers } from './components/DataCollection/LoginHandler';
import {GetUsers} from './components/DataCollection/Request';
import {useEffect, useState} from 'react';


function App() {
    return (
      <div className="App">
        <AuthenticatedTemplate>
          <div>
            <h1>Se hvem der er ledige her:</h1>
            <GetUsers />
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <ReqUsers/>
        </UnauthenticatedTemplate>
      </div>
    );
}

export default App;
