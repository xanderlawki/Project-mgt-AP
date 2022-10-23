import { gql } from "@apollo/client";

const GET_TASKS = gql`
  query getTasks($id: ID!) {
    tasks(id: $id) {
      id
      name
      status
      description
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

const GET_TASK = gql`
  query getTask($id: ID!) {
    task(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
      project {
        id
        name
        status
      }
    }
  }
`;

export { GET_TASKS, GET_TASK };
