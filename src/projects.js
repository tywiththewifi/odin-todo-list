import dom from "./dom";

console.log('Projects module loaded');


const projects = (() => {
    let projectList = [];

    // GET DEFAULT PROJECTS AND TASKS FROM LOCAL STORAGE
    if (localStorage.getItem('projects') === null) {
        projectList = [
            {
                icon: 'fa-tools',
                title: 'Craft New Project',
                tasks: [
                    {
                        title: 'Enjoy my tea as much as my coding! 🍵',
                        description: 'Longer description of my demo task, just to show you this surprisingly nice scrollbar and amazingly cute kitty ฅ(^◉ᴥ◉^)ฅ',
                        date: '2024-11-11',
                        priority: 'low',
                        projectIndex: 0,
                        taskIndex: 0,
                        completed: false
                    }
                ]
            },
            {
                icon: 'fa-tools',
                title: 'Craft Another Project',
                tasks: [
                    {
                        title: 'Create magic through my mind, my heart and my keyboard.. 👩🏻‍💻',
                        description: 'Another longer description of my demo task, just to show you this surprisingly nice scrollbar and cute little birdie ϵ( ‘Θ’ )϶♪♫',
                        date: '2024-12-12',
                        priority: 'high',
                        projectIndex: 1,
                        taskIndex: 0,
                        completed: false
                    }
                ]
            },
        ];
    } else {
        const projectsFromStorage = JSON.parse(localStorage.getItem('projects'));
        projectList = projectsFromStorage;
    }

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