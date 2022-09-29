import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import './App.css';
import { ReqUsers } from './components/DataCollection/LoginHandler';
import { GetUsers } from './components/DataCollection/Request';
import { RenderMeeting } from "./components/RenderComponents/RenderMeeting";

function App() {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <div>
          <GetUsers />
          <RenderMeeting/>
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <ReqUsers/>
      </UnauthenticatedTemplate>
    </div>
  );
}

export default App;
