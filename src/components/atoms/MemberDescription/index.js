import React from 'react';
import MemberDescriptionContainer from './styles';

function MemberDescription({description}) {
    return (
        <MemberDescriptionContainer>
            - "{description}"
        </MemberDescriptionContainer>
    );
}

export default MemberDescription;