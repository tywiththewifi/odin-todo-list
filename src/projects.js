const projects = (() => {
    const projectList = [];

    class Project {
        constructor(title, icon) {
            this.title = title;
            this.icon = icon;
        }
    }

    function addProject(title, icon) {
        const project = new Project(title, icon);
        projectsList.push(project);
        console.log(project, projectList);
    }

    return {
        addProject,
    };
})();

export default projects;