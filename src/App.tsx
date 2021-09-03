import React from 'react';
// import './App.css';
// import { ProjectListScreen } from './screens/project-list';
// import {Login} from './screens/login'
import {useAuth} from "./context/auth-context";
import {ErrorBundary} from "./components/error-bundary";
import {FullPageErrorFallback,FullPageLoading} from "./components/lib";

function App() {
  const {user}=useAuth()
  const AuthenticatedApp=React.lazy(()=>import('authenticated-app'))
  const UnauthenticatedApp=React.lazy(()=>import('unauthenticated-app'))

  return (
    <div className="App">
     {/* <ProjectListScreen/> */}
     {/*<Login/>*/}
     <ErrorBundary fallbackRender={FullPageErrorFallback}>
       <React.Suspense fallback={<FullPageLoading/>}>
           {user?<AuthenticatedApp/>:<UnauthenticatedApp/>}
       </React.Suspense>
     </ErrorBundary>
    </div>
  );
}

export default App;
