import gql from "graphql-tag";

const CREATE_TASK = gql`
  mutation CreateTask($data: TaskInput!) {
    createTask(data: $data) {
      _id
      name
      active
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($tribeId: ID!) {
    deleteTask(taskId: $taskId) {
      _id
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($taskId: ID!, $data: TaskUpdate) {
    updateTask(taskId: $taskId, data: $data) {
      _id
      name
    }
  }
`;

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      _id
      name
    }
  }
`;

export { GET_TASKS, DELETE_TASK, UPDATE_TASK, CREATE_TASK };
