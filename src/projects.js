import dom from "./dom";

const projects = (() => {
    const projectList = [{ icon: 'fa-screwdriver-wrench', title: 'Craft Example' }];

    class Project {
        constructor(icon, title) {
            this.icon = icon;
            this.title = title;
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
        projectsList.push(project);
        console.log(project, projectList);
    }

    function editProject(icon, title, index) {
        projectList[index].icon = icon;
        projectList[index].title = title;
        dom.showProjects();
    }

    return {
        projectList,
        addProject,
        editProject,
        deleteProject,
    };
})();

export default projects;