import dom from "./dom";

const projects = (() => {
    const projectList = [];

    class Project {
        constructor(icon, title) {
            this.icon = icon;
            this.title = title;
        }
    }

    function addProject(icon, title) {
        const project = new Project(icon, title);
        projectsList.push(project);
        console.log(project, projectList);
    }

    return {
        projectList,
        addProject,
    };
})();

export default projects;