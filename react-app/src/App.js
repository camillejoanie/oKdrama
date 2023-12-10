import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import SignupFormModal from "./components/SignupFormModal";
import LoginFormModal from "./components/LoginFormModal";
import LandingPage from "./components/LandingPage";
import DramaPage from "./components/DramaPage";
import ActorPage from "./components/ActorPage";
import CreateDramaForm from "./components/CreateDrama";
import CreateActorForm from "./components/CreateActor";
import UpdateDrama from "./components/UpdateDrama";
import UpdateActor from "./components/UpdateActor";
import SingleDramaPage from "./components/SingleDramaPage";
import SingleActorPage from "./components/SingleActorPage";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";

function App() {
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate())
      .then(() => setIsLoaded(true))
      .then(() => setReload(false));
  }, [dispatch]);

  return (
    <>
      <Navigation reload={reload} isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormModal />
          </Route>
          <Route path="/signup">
            <SignupFormModal />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/dramas/:dramaId/update">
            <UpdateDrama reload={() => setReload(true)} />
          </Route>
          <Route exact path="/dramas/create">
            <CreateDramaForm reload={() => setReload(true)} />
          </Route>
          <Route path="/dramas/:dramaId">
            <SingleDramaPage />
          </Route>
          <Route path="/dramas" component={DramaPage} />
          <Route exact path="/actors/:actorId/update">
            <UpdateActor reload={() => setReload(true)} />
          </Route>
          <Route exact path="/actors/create">
            <CreateActorForm reload={() => setReload(true)} />
          </Route>
          <Route path="/actors/:actorId">
            <SingleActorPage />
          </Route>
          <Route path="/actors" component={ActorPage} />
          <Route path="/" component={LandingPage} />
          <Route>Page Not Found</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
