import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Profile from "../pages/Profile";
import AdministrationLogin from "../pages/Administration/Login";
import HourChanges from "../pages/HourChanges";
import HourConsultation from "../pages/HourConsultation";
import Ponto from "../pages/Ponto";
import StandBy from "../pages/StandBy";
import SidebarMenu from "../components/organisms/SidebarMenu";

const Routes = () => {
  return (
    <BrowserRouter>
      <SidebarMenu>
        <Switch>
          <Route path="/" exact component={Ponto} />
          <Route path="/admin/login" component={AdministrationLogin} />
          <Route path="/alteracaodehoras" component={HourChanges} />
          <Route path="/consultadehoras" component={HourConsultation} />
          <Route path="/profile" component={Profile} />
          <Route path="/standby" component={StandBy} />
        </Switch>
      </SidebarMenu>
    </BrowserRouter>
  );
};

export default Routes;
