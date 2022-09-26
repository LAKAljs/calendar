import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import './App.css';
import { ReqUsers, GetUsers } from './components/DataCollection/ReqUsers';

function App() {
  return (
    <div className="App">
      <AuthenticatedTemplate>
          <GetUsers />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <ReqUsers/>
      </UnauthenticatedTemplate>
    </div>
  );
}

export default App;
