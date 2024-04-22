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

    function addTask(index, title, description, date, priority, projectIndex, taskIndex) {
        const task = new Task(title, description, date, priority, projectIndex, taskIndex);
        projects.projectList[projectIndex].tasks.push(task);
        console.log('Add a task!');
    }

    function deleteTask(projectIndex, taskIndex) {
        if (projectIndex > -1) {
            projects.projectList[projectIndex].tasks.splice(taskIndex, 1);
            dom.showTasks('', projectIndex, projects.projectList.length);
            dom.getTasks('all');
        }
    }

    return {
        addTask,
        deleteTask,
    };
})();

export default tasks;