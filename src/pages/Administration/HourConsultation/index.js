import { useContext, useState } from "react";
import MembersSelectBox from "../../../components/molecules/MembersSelectBox";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import { FilterArea } from "./style";
import SelectFilter from "../../../components/molecules/SelectFilter";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../../graphql/Projects";
import { GET_TASKS } from "../../../graphql/Tasks";
import { CommonButton } from "../../../components/atoms";
import { colors } from "../../../context/ThemeProvider/pallete";
import SessionHistory from "../../../components/organisms/SessionHistory";
import { GET_TRIBES } from "../../../graphql/Tribes";
import { GET_ROLES } from "../../../graphql/Roles";

const HourConsultation = () => {

  const [selectedMember, setSelectedMember] = useState();
  const [filter, setFilter] = useState({tasks: [], projects: [], departaments: [], roles: [], member: ''});
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([]);
  const [departaments, setDepartaments] = useState([]);
  const [roles, setRoles] = useState([]);

  const { data: projectsData, loading: projectsLoading } = useQuery(GET_PROJECTS);
  const { data: tasksData, loading: tasksLoading } = useQuery(GET_TASKS);
  const { data: departamentsData, loading: departamentsLoading } = useQuery(GET_TRIBES);
  const { data: rolesData, loading: rolesLoading } = useQuery(GET_ROLES);
  const { membersLoading, membersError, membersData, refetchMembers } =
  useContext(GlobalsContext);

  const allQueriesLoaded = !projectsLoading && !tasksLoading && !departamentsLoading && !rolesLoading && !membersLoading;

  const handleChangeTasks = (value) => {
    setTasks(value);
  };

  const handleChangeProjects = (value) => {
    setProjects(value);
  };

  const handleChangeDepartaments = (value) => {
    setDepartaments(value);
  };

  const handleChangeRoles = (value) => {
    setRoles(value);
  }

  const handleFilter = () => {
    setFilter({tasks, projects, departaments, roles, member: selectedMember ? selectedMember._id : ''});
  }

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
          <SelectFilter placeholder={'Projeto'} data={projectsData.projects} handleChange={handleChangeProjects}/>
          <SelectFilter placeholder={'Tarefa'} data={tasksData.tasks} handleChange={handleChangeTasks}/>
          <SelectFilter placeholder={'Cargo'} data={rolesData.roles} handleChange={handleChangeRoles} />
          <SelectFilter placeholder={'Departamento'} 
          data={departamentsData.tribes} handleChange={handleChangeDepartaments}/>
          <CommonButton
            buttonLabel="Filtrar"
            color={colors.green}
            width="223px"
            onClick={handleFilter}
          />
        </FilterArea>
        <SessionHistory filter={filter}/>
      </>
      )}
    </>
  )
}

export default HourConsultation;