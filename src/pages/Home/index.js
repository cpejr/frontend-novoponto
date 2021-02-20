import React, { useContext } from 'react';
import { HomeComponent } from './styles';
import { ThemeContext } from '../../context/ThemeProvider';

import HourDisplayer from '../../components/atoms/HourDisplayer';
import CommonButton from '../../components/atoms/CommonButton';
import DefaultLabel from '../../components/atoms/DefaultLabel';
import MemberName from '../../components/atoms/MemberName';
import MemberDescription from '../../components/atoms/MemberDescription';
import InputText from '../../components/atoms/InputText';

const Home = () => {
    const { themeColors } = useContext(ThemeContext);

    const handleTest = (e) => {
        console.log(e.target.value);
    }

    return (
        <HomeComponent theme={themeColors}>
            <h1>Home</h1>
            <HourDisplayer hour="10:38" hourColor="rgba(49, 216, 67, 0.5)"/>
            <CommonButton buttonLabel="Clique aqui" buttonColor="rgba(255, 193, 7, 0.5)" buttonWidth="200px"/>
            <DefaultLabel labelText="Gerentes de Produtos" labelColor="#FFD100" />
            <MemberName name="Diogo" />
            <MemberDescription description="Meio com sono meio bolado" />
            <InputText placeholder="Logue aqui" handleInputText={handleTest}/>
        </HomeComponent>
    );
}

export default Home;