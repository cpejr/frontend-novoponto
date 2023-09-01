import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import SidebarMenu from "../components/organisms/Menu";
import RestrictedRoute from "./RestrictedRoute";

import {
	Profile,
	HourChanges,
	HourConsultation,
	Ponto,
	StandBy,
	UpdateNews,
	MandatoryHours,
	Members,
	Roles,
	HourFollowing,
	Login,
	Tasks,
	Departaments,
	Tribes,
    Badges,
} from "../pages";


function Menu() {
  return (
    <SidebarMenu>
      <Switch>
        <Route path="/ponto" exact component={Ponto} />
        <Route path="/ponto/alteracaodehoras" component={HourChanges} />
        <Route path="/ponto/consultadehoras" component={HourConsultation} />
        <Route path="/ponto/profile" component={Profile} />
        <Route path="/ponto/standby" component={StandBy} />

				<RestrictedRoute
					minAccessLevel={1}
					path="/ponto/membros"
					component={Members}
				/>
				<RestrictedRoute
					minAccessLevel={1}
					path="/ponto/cargos"
					component={Roles}
				/>
				<RestrictedRoute
					minAccessLevel={1}
					path="/ponto/tribos"
					component={Tribes}
				/>
				<RestrictedRoute
					minAccessLevel={1}
					path="/ponto/departamentos"
					component={Departaments}
				/>
				<RestrictedRoute
					minAccessLevel={1}
					path="/ponto/acompanhamento"
					component={HourFollowing}
				/>
				<RestrictedRoute
					path="/ponto/atualizarnoticias"
					minAccessLevel={1}
					component={UpdateNews}
				/>
				<RestrictedRoute
					path="/ponto/tarefas"
					minAccessLevel={1}
					component={Tasks}
				/>
                <RestrictedRoute
                    minAccessLevel={1}
                    path="/ponto/reconhecimentos"
                    component={Badges}
                />
					path="/ponto/horarioobrigatorio"
					minAccessLevel={1}
					component={MandatoryHours}
				/ */
      </Switch>
    </SidebarMenu>
  );
}

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/">
        {<Redirect to="/ponto" />}
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/ponto" component={Menu} />
    </BrowserRouter>
  );
};

export default Routes;
