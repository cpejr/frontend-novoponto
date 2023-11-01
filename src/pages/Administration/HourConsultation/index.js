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

const HourConsultation = () => {
  const [filter, setFilter] = useState({
    tasks: [],
    projects: [],
    departaments: [],
    members: [],
  });
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [departaments, setDepartaments] = useState([]);

  const { data: projectsData, loading: projectsLoading } =
    useQuery(GET_PROJECTS);
  const { data: tasksData, loading: tasksLoading } = useQuery(GET_TASKS);
  const { data: departamentsData, loading: departamentsLoading } =
    useQuery(GET_TRIBES);
  const { membersLoading, membersError, membersData, refetchMembers } =
    useContext(GlobalsContext);

  const allQueriesLoaded =
    !projectsLoading &&
    !tasksLoading &&
    !departamentsLoading &&
    !membersLoading;

  const handleChangeTasks = (value) => {
    setTasks(value);
  };

  const handleChangeProjects = (value) => {
    setProjects(value);
  };

  const handleChangeDepartaments = (value) => {
    setDepartaments(value);
  };

  const handleChangeMembers = (value) => {
    setMembers(value);
  };

  const handleFilter = () => {
    setFilter({ tasks, projects, departaments, members });
  };

  console.log(filter);

  return (
    <>
      {allQueriesLoaded && (
        <>
          <FilterArea>
            {/* <MembersSelectBox onChange={selectMember} /> */}
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
              placeholder={"Departamento"}
              data={departamentsData.tribes}
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
