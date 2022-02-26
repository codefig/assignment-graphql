const uuid = require('uuid');

class Database {

    constructor() {

        this.allphases = [
            {
                id: 1,
                name: "Foundation",
                completed: false,
                tasks: [],
            },
            {
                id: 2,
                name: "Discovery",
                completed: false,
                tasks: [],
            },
            {
                id: 3,
                name: "Delivery",
                completed: false,
                tasks: [],
            },
        ];
    }


    isPhaseCompleted(phaseIndex) {
        let isCompleted = false;

        if (phaseIndex >= 0) {
            if (this.allphases[phaseIndex].tasks.length == 0) {
                return false;
            }
            let task = this.allphases[phaseIndex].tasks.find(task => !task.completed)
            if (!task) isCompleted = true;
        }
        return isCompleted;
    }

    getPhases() {
        return this.allphases;
    }
    getPhase(phaseId) {
        const phaseIndex = this.allphases.findIndex(phase => phase.id === phaseId);

        return this.allphases[phaseIndex];
    }


    updatePhase(phaseId) {
        const phaseIndex = this.allphases.findIndex(phase => phase.id === phaseId);
        if (phaseIndex >= 0) {
            this.allphases[phaseIndex].completed = true
            return true;
        }
        return false;
        //return a response; 
    }

    getTasks(phaseId) {

        const phaseIndex = this.allphases.findIndex(phase => phase.id === Number(phaseId));

        if (phaseIndex >= 0) {
            return this.allphases[phaseIndex].tasks;
        }
        return undefined;
    }

    //Write method for individual task getting;

    addTask(phaseId, body) {

        const phaseIndex = this.allphases.findIndex(phase => phase.id === phaseId);

        if (phaseIndex >= 0) {
            if (phaseIndex > 0 && !this.isPhaseCompleted(phaseIndex - 1)) {
                return false;
            }
            this.allphases[phaseIndex].tasks.push({ id: uuid.v4(), body, completed: false, created_at: new Date(), updated_at: new Date() })
            this.allphases[phaseIndex].completed = false;
        }
        return true;
    }

    updateTask(phaseId, taskId, status) {

        const phaseIndex = this.allphases.findIndex(phase => phase.id === phaseId);
        if (phaseIndex >= 0) {
            if (phaseIndex > 0 && !this.isPhaseCompleted(phaseIndex - 1)) {
                return false;
            }
            const phaseTasks = this.allphases[phaseIndex].tasks;
            const taskIndex = phaseTasks.findIndex(task => taskId === task.id);
            if (taskIndex >= 0) {
                phaseTasks[taskIndex].completed = status;
            }
            if (this.isPhaseCompleted(phaseId)) {
                this.allphases[phaseIndex].completed = true;
            }
        }
        return true;
        //cehck if the 
    }


}


module.exports = Database;
// On Update task status  : check if all task for previous phase is completed
// Before you can add taks to a phase:  all takss in previous phase must have been compleeted 