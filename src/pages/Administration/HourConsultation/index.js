
import MembersSelectBox from "../../../components/molecules/MembersSelectBox";
import { FilterArea } from "./style";
import { useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { GET_ROLES } from "../../../graphql/Roles";
import { GET_TASKS } from "../../../graphql/Tasks";
import { GET_TRIBES } from "../../../graphql/Tribes";
import { GET_PROJECTS } from "../../../graphql/Projects";
import { CommonButton } from "../../../components/atoms";
import { colors } from "../../../context/ThemeProvider/pallete";
import { GET_DEPARTAMENTS } from "../../../graphql/Departaments";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import SelectFilter from "../../../components/molecules/SelectFilter";
import SessionHistory from "../../../components/organisms/SessionHistory";

const HourConsultation = () => {
  const [filter, setFilter] = useState({
    tasks: [],
    tribes: [],
    members: [],
    projects: [],
    departaments: [],
  });

  const [roles, setRoles] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [tribes, setTribes] = useState([]);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [departaments, setDepartaments] = useState([]);

  const { membersLoading, membersData } = useContext(GlobalsContext);

  const { data: tasksData, loading: tasksLoading } = useQuery(GET_TASKS);
  const { data: rolesData, loading: rolesLoading } = useQuery(GET_ROLES);
  const { data: tribesData, loading: tribesLoading } = useQuery(GET_TRIBES);
  const { data: projectsData, loading: projectsLoading } = useQuery(GET_PROJECTS);
  const { data: departamentsData, loading: departamentsLoading } = useQuery(GET_DEPARTAMENTS);

  const allQueriesLoaded =
    !projectsLoading &&
    !tasksLoading &&
    !tribesLoading &&
    !membersLoading &&
    !rolesLoading &&
    !departamentsLoading;

  const handleChangeTasks = (value) => {
    setTasks(value);
  };
  
  const handleChangeRoles = (value) => {
    setRoles(value);
  };

  const handleChangeTribes = (value) => {
    setTribes(value);
  };

  const handleChangeMembers = (value) => {
    setMembers(value);
  };

  const handleChangeProjects = (value) => {
    setProjects(value);
  };

  const handleChangeDepartaments = (value) => {
    setDepartaments(value);
  };

  const handleFilter = () => { setFilter({ tasks, projects, tribes, members, departaments, roles }); console.log(filter) };

  return (
    <>
      {allQueriesLoaded && (
        <>
          <FilterArea>
            <SelectFilter
              placeholder={"Escolha o(s) membro(s)"}
              data={membersData.members}
              handleChange={handleChangeMembers}
            />
            <SelectFilter
              placeholder={"Projeto"}
              data={projectsData.projects}
              handleChange={handleChangeProjects}
            />
            <SelectFilter
              placeholder={"Tarefa"}
              data={tasksData.tasks}
              handleChange={handleChangeTasks}
            />
            <SelectFilter
              placeholder={"Tribos"}
              data={tribesData.tribes}
              handleChange={handleChangeTribes}
            />
            <SelectFilter
              placeholder={"Departamentos"}
              data={departamentsData.departament}
              handleChange={handleChangeDepartaments}
            />
            <SelectFilter
              placeholder={"Cargos"}
              data={rolesData.roles}
              handleChange={handleChangeRoles}
            />
            <CommonButton
              buttonLabel="Filtrar"
              color={colors.green}
              width="223px"
              onClick={handleFilter}
            />
          </FilterArea>
          <SessionHistory filter={filter} />
        </>
      )}
    </>
  );
};

export default HourConsultation;

