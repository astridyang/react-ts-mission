import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
// import { UnauthenticatedApp } from "./unauthenticated-app";
// import { AuthenticatedApp } from "./authenticated-app";
import { ErrorBoundary } from "./components/error-boundary";
import { FullPageError, FullPageLoading } from "./components/lib";

const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"));
const AuthenticatedApp = React.lazy(() => import("./authenticated-app"));

function App() {
  // const personList: { id: number; name: string }[] = [
  //     {id: 1, name: "lily"},
  //     {id: 2, name: 'bb'}
  // ]

  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        <React.Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
