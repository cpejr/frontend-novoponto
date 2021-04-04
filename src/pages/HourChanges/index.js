import React, { useState, useContext, useRef } from 'react';
import { HourChangesComponent } from './styles';
import { ThemeContext } from '../../context/ThemeProvider';

import CommonButton from '../../components/atoms/CommonButton';
import CommonSelectBox from '../../components/atoms/CommonSelectBox';

import OptionsMembers from '../../utils/SelectBoxOptions/Members';
import AddOrRemoveHours from '../../utils/SelectBoxOptions/AddOrRemoveHours';

const HourChanges = () => {
    const { themeColors } = useContext(ThemeContext);

    const [selectedMember, setSelectedMember] = useState("");
    const [addOrRemoveHours, setAddOrRemoveHours] = useState("");

    const [errorQuantityHour, setErrorQuantityHour]= useState(false);
    const [errorQuantityHourMessage, setErrorQuantityHourMessage]= useState("");

    const [errorJustificative, setErrorJustificative]= useState(false);
    const [errorJustificativeMessage, setErrorJustificativeMessage]= useState("");

    const selectMemberInput = useRef(null);
    const addOrRemoveInput = useRef(null);
    const hoursQuantityInput = useRef(null);
    const justificativeInput = useRef(null);

    const handleSelectMember = (e) => {
        setSelectedMember(e.target)
    }

    const handleAddOrRemoveHours = (e) => {
        setAddOrRemoveHours(e.target)
    }

    const handleChangeText = (e, type) => {
        if(type = 'quantityHour'){

        }else{

        }
    }

    return (
        <HourChangesComponent theme={themeColors}>
            <div className="hourChangesBox">
                <h1>Formulário para adicionar ou remover horas</h1>

                <CommonSelectBox inputRef={selectMemberInput} placeholderSelect="Escolha um membro" value={selectedMember} optionsList={OptionsMembers} onChangeFunction={handleSelectMember} />
                <CommonSelectBox inputRef={addOrRemoveInput} placeholderSelect="Adicionar / remover horas" value={addOrRemoveHours} optionsList={AddOrRemoveHours} onChangeFunction={handleAddOrRemoveHours} />
                <CommonButton buttonLabel="Enviar" color="#31D843" width="100%"/>
            </div>
        </HourChangesComponent>
    );
}

export default HourChanges;