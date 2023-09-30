import { useContext, useState } from "react";
import MembersSelectBox from "../../../components/molecules/MembersSelectBox";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import { FilterArea } from "./style";
import SelectFilter from "../../../components/molecules/SelectFilter";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../../graphql/Projects";
import { GET_TASKS } from "../../../graphql/Tasks";
import { GET_DEPARTMENTS } from "../../../graphql/Departaments";

const HourConsultation = () => {

  const [selectedMember, setSelectedMember] = useState();

  const { data: projectsData } = useQuery(GET_PROJECTS);
  const { data: tasksData } = useQuery(GET_TASKS);
  const { data: departamentsData } = useQuery(GET_DEPARTMENTS)

  const { membersLoading, membersError, membersData, refetchMembers } =
    useContext(GlobalsContext);

  const selectMember = (memberId) => {
    const member = membersData.members.find(
      (member) => member._id === memberId
    );

    console.log(departamentsData)

    setSelectedMember(member);
  };

  return (
    <FilterArea>
      <MembersSelectBox onChange={selectMember} />
      <SelectFilter placeholder={'Projeto'} data={projectsData.projects}/>
      <SelectFilter placeholder={'Tarefa'} data={tasksData.tasks}/>
      <SelectFilter placeholder={'Departamento'} data={departamentsData.departament}/>
    </FilterArea>
  )
}

export default HourConsultation;