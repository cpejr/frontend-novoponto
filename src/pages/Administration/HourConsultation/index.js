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
import { GET_DEPARTAMENTS } from "../../../graphql/Departaments";

const HourConsultation = () => {
  const [filter, setFilter] = useState({
    tasks: [],
    projects: [],
    tribes: [],
    members: [],
    departaments: [],
  });
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tribes, setTribes] = useState([]);
  const [departaments, setDepartaments] = useState([]);

  const { data: projectsData, loading: projectsLoading } =
    useQuery(GET_PROJECTS);
  const { data: tasksData, loading: tasksLoading } = useQuery(GET_TASKS);
  const { data: tribesData, loading: tribesLoading } = useQuery(GET_TRIBES);
  const { data: departamentsData, loading: departamentsLoading } =
    useQuery(GET_DEPARTAMENTS);
  const { membersLoading, membersData } = useContext(GlobalsContext);

  const allQueriesLoaded =
    !projectsLoading &&
    !tasksLoading &&
    !tribesLoading &&
    !membersLoading &&
    !departamentsLoading;

  const handleChangeTasks = (value) => {
    setTasks(value);
  };

  const handleChangeProjects = (value) => {
    setProjects(value);
  };

  const handleChangeTribes = (value) => {
    setTribes(value);
  };

  const handleChangeDepartaments = (value) => {
    setDepartaments(value);
  };

  const handleChangeMembers = (value) => {
    setMembers(value);
  };

  const handleFilter = () => {
    setFilter({ tasks, projects, tribes, members, departaments });
  };

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

