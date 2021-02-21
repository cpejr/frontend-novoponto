import React from 'react';
import { LoggedMembersContainer, MemberDataSection } from './styles';

import avatarDefault from '../../../assets/defaultAvatar.svg';
import MemberName from '../../atoms/MemberName';
import MemberDescription from '../../atoms/MemberDescription';
import HourDisplayer from '../../atoms/HourDisplayer';
import DefaultLabel from '../../atoms/DefaultLabel';

const LoggedMembers = ({name, role, mandatoryHour = null, description, startedHour, acumulatedTime}) => {
    return (
        <LoggedMembersContainer>
            <MemberDataSection>
                <img src={avatarDefault} alt="Avatar Default"/>

                <div className="nameWithLabelSection">
                    <div className="nameSection">
                        <MemberName name={name} className="namePart"/>
                        <MemberDescription description={description}/>
                    </div>
                    <DefaultLabel labelText={role} labelColor="#FFD100" />
                    {
                        mandatoryHour && <DefaultLabel labelText="Horário obrigatório" labelColor="#0085FF" />
                    }
                </div>
            </MemberDataSection>

            <div className="hourControlPart">
                <HourDisplayer hour={startedHour} hourColor="#31D843" className="hourDisplayer"/>
                <HourDisplayer hour={acumulatedTime} hourColor="#FFD100" className="hourDisplayer"/>
            </div>
        </LoggedMembersContainer>
    );
}

export default LoggedMembers
;