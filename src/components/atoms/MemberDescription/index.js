import React from 'react';
import MemberDescriptionContainer from './styles';

const MemberDescription = ({description}) => {
    return (
        <MemberDescriptionContainer>
            - "{description}"
        </MemberDescriptionContainer>
    );
}

export default MemberDescription;