import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
import SidebarMenu from '../components/organisms/SidebarMenu';

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
                <Route path="/acompanhamentodehoras" component={TimeTracking}/>
                <Route path="/atualizarnoticias" component={UpdateNews}/>
                <Route path="/horarioobrigatorio" component={MandatoryHours}/>
                <Route path="/membros" component={Members}/>
                <Route path="/cargos" component={Roles}/>
            </Switch>
        </SidebarMenu>
        </BrowserRouter>

export default Routes;
