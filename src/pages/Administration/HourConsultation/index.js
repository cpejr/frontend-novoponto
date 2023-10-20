import { useContext, useState } from "react";
import MembersSelectBox from "../../../components/molecules/MembersSelectBox";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import { FilterArea } from "./style";
import SelectFilter from "../../../components/molecules/SelectFilter";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../../graphql/Projects";
import { GET_TASKS } from "../../../graphql/Tasks";
import { GET_DEPARTAMENTS } from "../../../graphql/Departaments";
import { CommonButton } from "../../../components/atoms";
import { colors } from "../../../context/ThemeProvider/pallete";
import SessionHistory from "../../../components/organisms/SessionHistory";

const HourConsultation = () => {

  const [selectedMember, setSelectedMember] = useState();

  const { data: projectsData, loading: projectsLoading } = useQuery(GET_PROJECTS);
  const { data: tasksData, loading: tasksLoading } = useQuery(GET_TASKS);
  const { data: departamentsData, loading: departamentsLoading } = useQuery(GET_DEPARTAMENTS);
  const { membersLoading, membersError, membersData, refetchMembers } =
  useContext(GlobalsContext);

  const allQueriesLoaded = !projectsLoading && !tasksLoading && !departamentsLoading && !membersLoading;

  const selectMember = (memberId) => {
    const member = membersData.members.find(
      (member) => member._id === memberId
    );

    setSelectedMember(member);
  };

  return (
    <>
    {allQueriesLoaded && (
      <>
        <FilterArea>
          <MembersSelectBox onChange={selectMember} />
          <SelectFilter placeholder={'Projeto'} data={projectsData.projects} />
          <SelectFilter placeholder={'Tarefa'} data={tasksData.tasks} />
          <SelectFilter placeholder={'Departamento'} data={departamentsData.departament} />
          <CommonButton
            buttonLabel="Filtrar"
            color={colors.green}
            width="223px"
          />
        </FilterArea>
        <SessionHistory/>
      </>
      )}
    </>
  )
}

export default HourConsultation;