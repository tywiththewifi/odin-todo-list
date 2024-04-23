import projects from "./projects";

const tasks = (() => {
    class Task {
        constructor(title, description, date, priority, projectIndex, taskIndex) {
            this.title = title;
            this.description = description;
            this.date = date;
            this.priority = priority;
            this.projectIndex = projectIndex;
            this.taskIndex = taskIndex;
            
        }
    }

    function addTask(title, description, date, priority, projectIndex, taskIndex) {
        const task = new Task(title, description, date, priority, projectIndex, taskIndex);
        projects.projectList[projectIndex].tasks.push(task);
        console.log('Add a task!');
    }

    function deleteTask(projectIndex, taskIndex) {
        if (projectIndex > -1) {
            projects.projectList[projectIndex].tasks.splice(taskIndex, 1);
            dom.getTasks('all');
        }
    }

    function editTask(title, description, date, priority, projectIndex, taskIndex) {
        projects.projectList[projectIndex].tasks[taskIndex].title = title;
        projects.projectList[projectIndex].tasks[taskIndex].description = description;
        projects.projectList[projectIndex].tasks[taskIndex].date = date;
        projects.projectList[projectIndex].tasks[taskIndex].priority = priority;
        dom.getTasks('project', projectIndex);
    }

    return {
        addTask,
        deleteTask,
        editTask,
    };

})();

export default tasks;