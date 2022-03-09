# Welcome to  project!


# Install required packages / dependencies
To install the required packages in order to start the project 
- Install Nodejs 
- open your terminal/cmd and run `npm install` to install the required package dependencies.
- run the command `npm start` to start the REST API server. 
- Open your browser and visit `http://localhost:4000/graphql` to send and view graphql requests.

# Exposed Interfaces to query about task and phase. 
```
 # 1. getPhaseById(phaseId: int) : to get a phase using it's ID 
    query{
      getPhaseById(phaseId: 1) {
       id 
        name
        tasks {
          id
        }
     }
    }


    2. getAllPhases : To return the list of all phases. 
    query {
        getAllPhases{
            id
            name
            completed
            tasks {
            id
            body
            completed
            }
        }
    }
```

# To create a task or update it
```
    mutation {
        createTask(phaseId: 1, body:"Task Name"){
        id
        body
        created_at
        updated_at
        completed
    }
  }

  mutation {
    updateTask(phaseId: 1, taskId: "4b14f0a6-b2b8a51c19f2" isCompleted:true) {
        id,
        completed
        body
    }
  }
  
```

