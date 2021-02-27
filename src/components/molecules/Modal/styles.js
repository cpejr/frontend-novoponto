import styled from 'styled-components';

const ModalContainer = styled.div`
    width: 300px;
    height: auto;
    padding: 30px 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ModalContentSection = styled.div`
        width: 100%;
`;

const ModalButtonSection = styled.div`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        
`;

export { ModalContainer, ModalContentSection, ModalButtonSection };