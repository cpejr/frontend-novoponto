import React from 'react';
import MemberNameContainer from './styles';

function MemberName({name}) {
    return (
        <MemberNameContainer>
            {name}
        </MemberNameContainer>
    );
}

export default MemberName;