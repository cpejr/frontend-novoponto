import React, { useContext } from "react";

import { PontoComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import Sessions from "./Sessions";
import NewsCarousel from "../../components/molecules/NewsCarousel";
import { Button } from "antd";
import { useState } from "react";

const Ponto = () => {
  const [user, setUser] = useState();
  const [projectID, setProjectID] = useState('61ae4320950e2013b2f7c9a2');
  const { themeColors } = useContext(ThemeContext);
 
  const fetch = require('node-fetch');

  const key = 'MWI4MGJlYjItNmJmZi00Y2NhLTg3NWUtYTU2ZGQ0ODY3NTg5';
  const url = `https://api.clockify.me/api/v1`;
  const workspaceID = '61018b7595c2304d78c64133';
  const userMail = "victorbatista@cpejr.com.br"

  async function handleUsers(){
    const users = await  fetch(`${url}/workspaces/${workspaceID}/users`,{
      headers: {
      'X-Api-Key': key
    }
    }).then(r => r.json())
    const user = users.filter((user) => {
      if (user.email === userMail) 
        return user
    });
    console.log(users);
    setUser(user[0])
  }

  async function handleProjects(){
    const projects = await  fetch(`${url}/workspaces/${workspaceID}/projects`,{
      headers: {
      'X-Api-Key': key
    }
    }).then(r => r.json())
    console.log("Projetos: ", projects)
  }

  async function handleTasks(){
    const tasks = await  fetch(`${url}/workspaces/${workspaceID}/projects/${projectID}/tasks`,{
      headers: {
      'X-Api-Key': key
    }
    }).then(r => r.json())
    console.log("Tasks do Projeto Alimenta Web ",tasks)
  }

  async function handleStart(){
    var now = new Date();
    const start = now.toISOString();

    const requestEntry = {
      "start": start,
      "billable": "false",
      "description": "Corrigindo a página de Áreas",
      "projectId": projectID,
      "taskId": "61ae585cbe737841a55d0341",
    }

    const timeEntry = await  fetch(`${url}/workspaces/${workspaceID}/time-entries`,{
      method: "POST",
      body: JSON.stringify(requestEntry),
      headers: {
      'X-Api-Key': key,
      "content-type": "application/json"
    }
    }).then(r => r.json())
    console.log("Entrada de tempo para a task Responsividade do Alimenta Web ",timeEntry)
  }

  async function handleEnd(){
    var now = new Date();
    const end = now.toISOString();

    //ID do Victor
    const id = "619e84712ed28d6ad8b19266";

    const aux2 = {
      end: end,
    }

    const endTimeEntry = await  fetch(`${url}/workspaces/${workspaceID}/user/${id}/time-entries`,{
      method: "PATCH",
      body: JSON.stringify(aux2),
      headers: {
      'X-Api-Key': key,
      "content-type": "application/json"
    }
    }).then(r => r.json())
    console.log("Saída de tempo para a task Responsividade do Alimenta Web  ",endTimeEntry)
  }

  return (
    <PontoComponent theme={themeColors} className="m-0 mt-lg-3 m-lg-5">
      <NewsCarousel />
      <Button onClick={handleProjects}>Buscar projetos</Button>
      <Button onClick={handleUsers}>Buscar usuários</Button>
      <Button onClick={handleTasks}>Buscar tasks</Button>
      <Button onClick={handleStart}>Iniciar cronometro de task</Button>
      <Button onClick={handleEnd}>Finalizar cronometro de task</Button>
      <Sessions />
    </PontoComponent>
  );
};

export default Ponto;
