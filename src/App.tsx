import React from 'react';
// import './App.css';
// import { ProjectListScreen } from './screens/project-list';
// import {Login} from './screens/login'
import {useAuth} from "./context/auth-context";
import {ErrorBundary} from "./components/error-bundary";
import {FullPageErrorFallback} from "./components/lib";
import {AuthenticatedApp} from "./authenticated-app";
import {UnauthenticatedApp} from "./unauthenticated-app";

function App() {
  const {user}=useAuth()

  return (
    <div className="App">
     {/* <ProjectListScreen/> */}
     {/*<Login/>*/}
     <ErrorBundary fallbackRender={FullPageErrorFallback}>
           {user?<AuthenticatedApp/>:<UnauthenticatedApp/>}
     </ErrorBundary>
    </div>
  );
}

export default App;
