import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Profile from '../pages/Profile';
import HourChanges from '../pages/HourChanges';
import HourConsultation from '../pages/HourConsultation';
import Ponto from '../pages/Ponto';
import StandBy from '../pages/StandBy';
import TimeTracking from '../pages/Administration/TimeTracking';
import UpdateNews from '../pages/Administration/UpdateNews';
import MandatoryHours from '../pages/Administration/MandatoryHours';
import Members from '../pages/Administration/Members';
import Roles from '../pages/Administration/Roles';
import HourFollowing from '../pages/Administration/HourFollowing';
import SidebarMenu from '../components/organisms/SidebarMenu';

import { SessionContext } from '../context/SessionProvider';
import { isAuthenticated, isADM } from '../services/auth';

// Controle de rotas para ADM
const PrivateADMRoute = ({ component: Component, ...rest }) => {
    const { data } = useContext(SessionContext);
    const user = data.login;
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated() && isADM(user) ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/perfil", state: { from: props.location } }}
            />
          )
        }
      />
    );
  };

const Routes = () => {
    return (
        <BrowserRouter>
        <SidebarMenu>
            <Switch>
                <Route path="/" exact component={Ponto}/>
                <Route path="/alteracaodehoras" component={HourChanges}/>
                <Route path="/consultadehoras" component={HourConsultation}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/standby" component={StandBy}/>
                <PrivateADMRoute path="/acompanhamentodehoras" component={TimeTracking}/>
                <PrivateADMRoute path="/atualizarnoticias" component={UpdateNews}/>
                <PrivateADMRoute path="/horarioobrigatorio" component={MandatoryHours}/>
                <Route path="/membros" component={Members}/>
                <Route path="/cargos" component={Roles}/>
                <Route path="/acompanhamento" component={HourFollowing}/>
            </Switch>
        </SidebarMenu>
        </BrowserRouter>
    )
};

export default Routes;
