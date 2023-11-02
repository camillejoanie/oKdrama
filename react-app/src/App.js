import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import DramaPage from "./components/DramaPage";
import ActorPage from "./components/ActorPage";
import CreateDramaForm from "./components/CreateDrama";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/dramas/create">
            <CreateDramaForm />
          </Route>
          <Route path="/dramas" component={DramaPage} />
          <Route path="/actors" component={ActorPage} />
          <Route>Page Not Found</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
