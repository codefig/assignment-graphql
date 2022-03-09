
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const Database = require('./repository/database');
const { GraphQLBoolean, GraphQLObjectType, GraphQLInt, GraphQLSchema, GraphQLString, GraphQLList } = require('graphql');

const app = express();
const db = new Database();

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ message: "Welcome to the Todo API" })
})

const TaskType = new GraphQLObjectType({
    name: "Task",
    fields: () => ({
        id: { type: GraphQLString },
        body: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
        created_at: { type: GraphQLString },
        updated_at: { type: GraphQLString }
    })
})

const PhaseType = new GraphQLObjectType({
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
        tasks: { type: new GraphQLList(TaskType) },
    }),
    name: "Phase"
})


const query = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getTasksByPhaseId: {
            type: new GraphQLList(TaskType),
            args: { phaseId: { type: GraphQLInt } },
            async resolve(parent, args) {
                return await db.getTasks(args.phaseId);
            }
        },
        getAllPhases: {
            type: new GraphQLList(PhaseType),
            async resolve(parent, args) {
                return await db.getPhases();
            }
        },
        getPhaseById: {
            type: PhaseType,
            args: { phaseId: { type: GraphQLInt } },
            async resolve(parent, args) {
                return await db.getPhase(args.phaseId);
            }
        },
    }
})

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createTask: {
            type: TaskType,
            args: { phaseId: { type: GraphQLInt }, body: { type: GraphQLString } },
            async resolve(parent, args) {
                return await db.addTask(args.phaseId, args.body)
            }
        },
        updateTask: {
            type: TaskType,
            args: { phaseId: { type: GraphQLInt }, taskId: { type: GraphQLString }, isCompleted: { type: GraphQLBoolean } },
            async resolve(parent, args) {
                return await db.updateTask(args.phaseId, args.taskId, args.isCompleted)
            }
        },
    }
});

const schema = new GraphQLSchema({ query: query, mutation: mutation })

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
}))

app.listen(4000, function () {
    console.log("listening on the servcer ")
})


/*
 *  How to run 
 *   run the foloowing commands to Install the required pckages
 *  > npm install 
 *   After installing the packages with the above command the run 
 * > npm start or 
 * 
 * 
 * // Todo 
 *  / Add Unit Test methods with Jest to test out the functioanlity
 *  // refactor some lines into singular method calls. 
 */