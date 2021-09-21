import React from 'react';
import './App.css';
import { useAuth } from './context/auth-context';
import { AuthenticatedApp } from 'authenticated-app';
import { UnauthenticatedApp } from 'unauthenticated-app.tsx';

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {
        user ? <AuthenticatedApp /> : <UnauthenticatedApp />
      }
      {/* <LoginScreen /> */}
      {/* <ProjectListScreen/> */}
    </div>
  );
}

export default App;
