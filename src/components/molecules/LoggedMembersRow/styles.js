import styled from 'styled-components';

const LoggedMembersContainer = styled.div`
    width: 100%;
    height: 72px;
    border: 2px solid #1C1C1D;

    padding: 0px 20px;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .hourControlPart{
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;

        justify-content: space-evenly;
    }

    .hourDisplayer + .hourDisplayer{
        margin-left: 20px; 
    }
`;

const MemberDataSection = styled.div`
        width: 50%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        
        img{
            width: 50px;
            height: 50px;
            margin-right: 15px;
        }
        
        .nameWithLabelSection{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            
            .nameSection{
                margin: 8px 0px;
                display: flex;
                align-items: center;
            }
        }
`;

export { LoggedMembersContainer, MemberDataSection };