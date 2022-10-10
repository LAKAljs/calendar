import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import './App.css';
import { ReqUsers } from './components/DataCollection/LoginHandler';
import { GetUsers } from './components/DataCollection/Request';
import { RenderMeeting } from "./components/RenderComponents/RenderMeeting";

function App() {
  RenderMeeting()
  return (
    <div className="App">
      <AuthenticatedTemplate>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <ReqUsers/>
      </UnauthenticatedTemplate>
    </div>
  );
}

export default App;
