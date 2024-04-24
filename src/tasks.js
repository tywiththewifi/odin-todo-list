import projects from "./projects";
import dom from './dom';

const tasks = (() => {
    class Task {
        constructor(title, description, date, priority, projectIndex, taskIndex) {
            this.title = title;
            this.description = description;
            this.date = date;
            this.priority = priority;
            this.projectIndex = projectIndex;
            this.taskIndex = taskIndex;
            this.completed = false;
            
        }
    }

    function addTask(title, description, date, priority, projectIndex, taskIndex) {
        const task = new Task(title, description, date, priority, projectIndex, taskIndex);

        projects.projectList[projectIndex].tasks.push(task);
        dom.getTasks('project', projectIndex);
        console.log('Add a task!');
    }

    function deleteTask(projectIndex, taskIndex) {
        if (projectIndex > -1 && projectIndex < projects.projectList.length) {
            // projects.projectList[projectIndex].tasks.splice(taskIndex, 1);
            // dom.getTasks('all');
            let projectTasks = projects.projectList[projectIndex].tasks;
            if (taskIndex >= 0 && taskIndex < projectTasks.length) {
                projectTasks.splice(taskIndex, 1);
                dom.getTasks('project', projectIndex);
            } else {
                console.error("Invalid task index:", taskIndex);
            }
        } else {
            console.log('invalid project index:', projectIndex)
        }
        
    }

    function editTask(title, description, date, priority, projectIndex, taskIndex) {
        projects.projectList[projectIndex].tasks[taskIndex].title = title;
        projects.projectList[projectIndex].tasks[taskIndex].description = description;
        projects.projectList[projectIndex].tasks[taskIndex].date = date;
        projects.projectList[projectIndex].tasks[taskIndex].priority = priority;
        dom.getTasks('project', projectIndex);
    }

    function toggleTaskCompletion(projectIndex, taskIndex, selectedLink) {
        let clickedLink;

        if (projects.projectList[projectIndex].tasks[taskIndex].completed === false) {
            projects.projectList[projectIndex].tasks[taskIndex].completed = true;
        } else {
            projects.projectList[projectIndex].tasks[taskIndex].completed = false;
        }

        if (selectedLink.classList.contains('project')) {
            clickedLink = 'project';
        } else {
            clickedLink = selectedLink.getAttribute('data-title');
        }
        dom.getTasks(clickedLink, projectIndex);

        // // SAVE TASKS TO LOCAL STORAGE
        // localStorage.setItem('projects', JSON.stringify(projects.projectList));
    }

    return {
        addTask,
        deleteTask,
        editTask,
        toggleTaskCompletion
    };

})();

export default tasks;