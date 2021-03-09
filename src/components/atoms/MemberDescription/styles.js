import styled from 'styled-components';

const MemberDescriptionContainer = styled.div`
    width: auto;
    max-width: 200px;
    display: flex;
    text-align: center;
    color: #5C5C5C;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;

    margin-left: 8px;

    @media(max-width: 720px){
        margin: 4px 0px;
    }
`;

export default MemberDescriptionContainer;