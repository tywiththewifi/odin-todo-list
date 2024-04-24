import dom from "./dom";

console.log('Projects module loaded');


const projects = (() => {
    const projectList = [];

    class Project {
        constructor(icon, title) {
            this.icon = icon;
            this.title = title;
            this.tasks = [];
        }
    }

    function deleteProject(index) {
        if (index > -1 && index < projectList.length) {
            projectList.splice(index, 1);
            console.log("Project deleted. Remaining projects:", projects.projectList); 
        } else {
            console.error("Invalid project index for deletion:", projectIndex);
        }
        dom.showProjects();
    }

    function addProject(icon, title) {
        const project = new Project(icon, title);
        projectList.push(project);
        console.log(project, projectList);
        dom.showProjects();
        dom.manipulateModal('close');
    }

    function editProject(icon, title, index, link) {
        projectList[index].icon = icon;
        projectList[index].title = title;
        dom.showProjects();
        dom.selectLink(link, index, 'edit');
    }

    return {
        projectList,
        addProject,
        editProject,
        deleteProject,
    };
})();

export default projects;