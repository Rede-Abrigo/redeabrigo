import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Profissionais from '../pages/Profissionais';
import Abrigos from '../pages/Abrigos';
import Profile from '../pages/Profile';
import Abrigo from '../pages/Abrigo';
import Cursos from '../pages/Cursos';
import Curso from '../pages/Curso';

const Routes: React.FC = () => {

  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" component={Dashboard} />

      <Route path="/profissionais" component={Profissionais} />
      <Route path="/user/:id" component={Profile} />

      <Route path="/abrigos" component={Abrigos} />
      <Route path="/abrigo/:id" component={Abrigo} />

      <Route path="/cursos" component={Cursos} />
      <Route path="/curso/:id" component={Curso} />
    </Switch>
  );
}

export default Routes;