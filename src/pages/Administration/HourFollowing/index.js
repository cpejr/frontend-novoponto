import React, { useEffect, useState } from "react";
import { SelectInput } from "../../../components/atoms";
import MemberDataADM from "../../../components/organisms/MemberDataADM";
import { message } from 'antd';

import {HourFollowingContainer} from './styles'

const membersConst = [
	{
		id: 1,
		name: "Arthur Lima",
		message: "Ponts de acompanhamento: 2 pontos",
		responsable: {
			name: "Maiara Lima"
		},
		role: {
			name: "Head de Projetos"
		}
	}, 
	{
		id: 2,
		name: "Arthur Braga",
		message: "Ponts de acompanhamento: 1 pontos",
		responsable: {
			name: "Ian Xavier"
		},
		role: {
			name: "Head de Marketing"
		}
	}
];

const HourFollowing = () => {
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState();

  const selectMember = (memberSelected) => {
    var index = members
      .map((member) => member.name)
      .indexOf(memberSelected);
    setSelected(members[index]);
  };

  const saveData = (newMessage) => {
	  var index = members
      .map((member) => member.id)
      .indexOf(selected.id);
	  members[index].message = newMessage;
	  setMembers([...members]);
	message.loading("Salvando", 1.5).then(()=>{
		message.success("Salvo com sucesso", 2.5);
	})
  };

  useEffect(() => {
    setMembers([...membersConst]);
  }, []);
  return (
    <HourFollowingContainer>
      <SelectInput
        options={members.map((member) => member.name)}
        callback={selectMember}
      />
			{
				selected && 
				<MemberDataADM
					name={selected.name}
					responsable={selected.responsable.name}
					role={selected.role.name}
					initMessage={selected.message}
					callback={saveData}
				/>
			}
    </HourFollowingContainer>
  );
};

export default HourFollowing