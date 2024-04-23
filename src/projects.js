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
        if (index > -1) {
            projectList.splice(index, 1);
        }
        dom.showProjects();
    }

    function addProject(icon, title) {
        const project = new Project(icon, title);
        projectList.push(project);
        console.log(project, projectList);
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