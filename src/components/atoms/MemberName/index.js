import React from 'react';
import MemberNameContainer from './styles';

const MemberName = ({name}) => {
    return (
        <MemberNameContainer>
            {name}
        </MemberNameContainer>
    );
}

export default MemberName;