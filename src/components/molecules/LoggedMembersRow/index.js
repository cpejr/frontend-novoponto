import React from 'react';
import { LoggedMembersContainer, MemberDataSection } from './styles';

import avatarDefault from '../../../assets/defaultAvatar.svg';
import MemberName from '../../atoms/MemberName';
import MemberDescription from '../../atoms/MemberDescription';
import HourDisplayer from '../../atoms/HourDisplayer';
import DefaultLabel from '../../atoms/DefaultLabel';

const LoggedMembers = ({name}) => {
    return (
        <LoggedMembersContainer>
            <MemberDataSection>
                <img src={avatarDefault} alt="teste"/>

                <div className="nameWithLabelSection">
                    <div className="nameSection">
                        <MemberName name={name} className="namePart"/>
                        <MemberDescription description="Com sono somente"/>
                    </div>
                    <DefaultLabel labelText="Gerente de Produtos" labelColor="#FFD100" />
                </div>
            </MemberDataSection>

            <div className="hourControlPart">
                <HourDisplayer hour="02:52" hourColor="#31D843" className="hourDisplayer"/>
                <HourDisplayer hour="12:52" hourColor="#FFD100" className="hourDisplayer"/>
            </div>
        </LoggedMembersContainer>
    );
}

export default LoggedMembers
;