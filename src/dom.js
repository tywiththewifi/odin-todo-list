import projects from './projects';
import tasks from './tasks';

console.log('DOM module loaded');

const dom = (() => {
    const toggleMenuIcon = document.querySelector('.toggle-menu');
    const sidebarMenu = document.querySelector('#sidebar-menu');
    const mainContent = document.querySelector('#main');
    const modal = document.querySelector('#modal');
    const modalTitle = document.querySelector('#modal-title');
    const modalTitleError = document.querySelector('.modal-title-error');
    const mainTitleIcon = document.querySelector('.main-title-icon');
    const mainTitleText = document.querySelector('.main-title-text');
    const tasksCount = document.querySelector('.tasks-count');

    function responsiveMenu() {
        if (window.innerWidth <= 1000) {
            toggleMenuIcon.classList.remove('active');

            // HIDE SIDEBAR AND MAKE IT OPAQUE
            sidebarMenu.classList.remove('show-sidebar');
            sidebarMenu.classList.add('hide-sidebar');
            sidebarMenu.classList.add('add-z-index')
            
            // EXPAND MAIN CONTENT
            mainContent.classList.remove('contract-main');
            mainContent.classList.add('expand-main');
        } else {

            // SHOW SIDEBAR AND MAKE MAIN CONTNET A BIT TRANSPARENT
            sidebarMenu.classList.remove('hide-sidebar');
            sidebarMenu.classList.add('show-sidebar');
            sidebarMenu.classList.remove('add-z-index');

            // CONTRACT MAIN CONTENT AND MAKE MAIN CONTENT OPAQUE
            mainContent.classList.remove('expand-main');
            mainContent.classList.add('contract-main');
            mainContent.classList.remove('inactive-main');

        }
    }

    function watchTaskInfo(projectIndex, taskIndex) {
        const infoTaskTitle = document.querySelector('.info-task-title');
        const infoTaskDescription = document.querySelector('.info-task-description');
        const infoTaskDueDate = document.querySelector('.info-task-due-date');
        const infoTaskPriority = document.querySelector('.info-task-priority');
        const infoTaskProject = document.querySelector('.info-task-project');
    
        // TASK TITLE
        infoTaskTitle.textContent = `${projects.projectsList[projectIndex].tasks[taskIndex].title}`;
    
        // TASK DESCRIPTION
        infoTaskDescription.textContent = `${projects.projectsList[projectIndex].tasks[taskIndex].description}`;
    
        // TASK DUE DATE
        infoTaskDueDate.textContent = `${projects.projectsList[projectIndex].tasks[taskIndex].date}`;
    
        // TASK PRIORITY
        if (projects.projectsList[projectIndex].tasks[taskIndex].priority === 'low') {
          infoTaskPriority.textContent = 'LOW - It can wait for a month or two.. 😴';
        } else if (projects.projectsList[projectIndex].tasks[taskIndex].priority === 'medium') {
          infoTaskPriority.textContent = 'MEDIUM - Somewhere between Relax & Focus 😅';
        } else if (projects.projectsList[projectIndex].tasks[taskIndex].priority === 'high') {
          infoTaskPriority.textContent = 'HIGH - Now or never! 😲';
        } else {
          infoTaskPriority.textContent = '';
        }
    
        // TASK PROJECT
        infoTaskProject.textContent = projects.projectsList[projectIndex].title;
      }
    
    function manipulateModal(state, title, task, projectIndex, taskIndex) {
        const modalHeader = modal.querySelector('.modal-header');
        const modalMainTitle = modal.querySelector('.modal-main-title');
        const modalTaskButton = modal.querySelector('.modal-task-button');
        const projectDeletionText = modal.querySelector('.project-deletion-text');
        const taskDeletionText = modal.querySelector('.task-deletion-text');
        const taskInfoDiv = modal.querySelector('.info-div');
        const confirmButton = modal.querySelector('.confirm-modal');
        const cancelButton = modal.querySelector('.cancel-modal');

        modalHeader.classList.remove('deletion-modal-header');
        const form = document.querySelector('#form');
        form.reset();
        form.classList.remove('hide');
        taskInfoDiv.classList.add('hide');

        modalTitleError.classList.add('hide');
        projectDeletionText.classList.add('hide');
        taskDeletionText.classList.add('hide');
        cancelButton.classList.remove('cancel-deletion');
        confirmButton.classList.remove('confirm-deletion', 'hide');

        if (state === 'show') {
            const modalIconsDiv = modal.querySelector('.radio-form');
            const modalTasksDiv = modal.querySelector('.modal-tasks-div');
            modal.classList.remove('hide');
            modalMainTitle.textContent = name;
            modalTaskButton.textContent = task;

            modalIconsDiv.classList.remove('hide');
            modalIconsDiv.classList.add('show');
            modalTasksDiv.classList.add('hide');

            if (title === 'Add task') {
                modalIconsDiv.classList.remove('show');
                modalIconsDiv.classList.add('hide');
                modalTasksDiv.classList.remove('hide');
            }

            // IF MODAL IS FOR WATCHING TASK INFO
      } else if (title === 'Task Info') {

        form.classList.add('hide');
        confirmButton.classList.add('hide');
        taskInfoDiv.classList.remove('hide');

        watchTaskInfo(projectIndex, taskIndex);

        } else if (task === 'delete') {
            modalHeader.classList.add('deletion-modal-header');
            form.classList.add('hide');
            cancelButton.classList.add('cancel-deletion');
            confirmButton.classList.add('confirm-deletion');
        
        // TO CLOSE THE MODAL
        } else if (state === 'close') {
            modal.classList.add('hide');
        }

        // PROJECT DELETION
        if (title === 'Delete Project') {
            const projectDeletionTitle = document.querySelector('.project-deletion-title');

            projectDeletionText.classList.remove('hide');
            projectDeletionTitle.textContent = projects.projectsList[projectIndex].title;

        // TASK DELETION
        } else if (title === 'Delete Task') {
            const taskDeletionTitle = document.querySelector('.task-deletion-title');

            taskDeletionText.classList.remove('hide');
            taskDeletionTitle.textContent = projects.projectsList[projectIndex].tasks[taskIndex].title;
        }
    }

    function validateModal(task, index) {
        const projectFormIcon = document.forms['form'].projectFormIcon;
        const projectDomIcon = projectFormIcon.value;
        const projectIconsDiv = modal.querySelector('.radio-form');
        const modalTitleText = modalTitle.value;

        if (task === 'add' || task === 'edit') {
            if (modalTitleText === '') {
                modalTitleError.classList.remove('hide');
                modalTitleError.classList.add('show');
            }

          // ADD PROJECT TO ARRAY AND DOM
        } else if (task === 'add' && projectIconsDiv.classList.contains('show')) {
          projects.addProject(projectDomIcon.value, modalTitleText);

          // EDIT A PROJECT FROM ARRAY
        } else if (task === 'edit') {
          projects.editProject(projectDomIcon.value, modalTitleText, index);

          // DELETE A PROJECT FROM ARRAY
        } else if (task === 'delete') {
            projects.deleteProject(index);
        
        // ADD A TASK TO ARRAY
        } else if (task === 'add' && projectIconsDiv.classList.contains('hide')) {
            const selectedLink = document.querySelector('.selected-link');
            const selectedProject = selectedLink.getAttribute('data-index');
            const taskDescription = document.querySelector('.task-description').value;
            const taskDueDate = document.querySelector('#dueDate').value;
            const taskPrioritySelection = document.querySelector('.task-priority');
            let taskPriority = '';

            // CHECK TASK PRIORITY
            if (taskPrioritySelection.value === 'low') {
                taskPriority = 'low';
            } else if (taskPrioritySelection.value === 'medium') {
                taskPriority = 'medium';
            } else if (taskPrioritySelection.value === 'high') {
                taskPriority = 'high';
            } else {
                taskPriority = '';
            }

            tasks.addTask(selectedProject, modalTitleText, taskDescription, taskDueDate, taskPriority);
        }
      }

    function toggleMenu() {
        toggleMenuIcon.classList.toggle('active');

        if (sidebarMenu.classList.contains('hide-sidebar')) {

            // SHOW SIDEBAR AND MAKE MAIN CONTENT A BIT TRANSPARENT
            sidebarMenu.classList.remove('hide-sidebar');
            sidebarMenu.classList.add('show-sidebar');
            mainContent.classList.add('inactive-main');
        } else if (sidebarMenu.classList.contains('show-sidebar')) {

            // HIDE SIDEBAR AND MAKE MAIN CONTENT OPAQUE
            sidebarMenu.classList.remove('show-sidebar');
            sidebarMenu.classList.add('hide-sidebar');
            mainContent.classList.remove('inactive-main');
        }
    }

    function selectMenuLink(target, index) {
        const allMenuLinks = document.querySelectorAll('.link');
        const addTaskButton = document.querySelector('.add-task');

        // BY DEFAULT ADD TASK BUTTON IS HIDDEN
        addTaskButton.classList.add('hide');

        allMenuLinks.forEach((link) => {
            link.classList.remove('selected-link');
        });

        // IF CLICKED ON MENU LINK
        if (target.classList.contains('menu-link')) {
            target.classList.add('selected-link');
        
        // IF CLICKED ON MENU LINK ICON OR TEXT
        } else if (target.classList.contains('menu-link-icon')
                || target.classList.contains('menu-link-text')) {
                target.parentElement.classList.add('selected-link');

        // IF CLICKED SOMEWHERE ON PROJECT LINK
        } else if (target.classList.contains('project')) {
        
        // SHOW BUTTON TO ADD A TASK TO SELECTED PROJECT
        addTaskButton.classList.remove('hide');
        }
        
        // IF CLICKED DIRECTLY ON PROJECT LINK
        if (target.classList.contains('project-link')) {
        target.classList.add('selected-link');

        // IF CLICKED ON PROJECT ICON OR TEXT
        } else if (target.classList.contains('project-icon')
              || target.classList.contains('project-text')) {
        target.parentElement.parentElement.classList.add('selected-link');

        // IF CLICKED ON PROJECT ELEMENTS DIVS
        } else if (target.classList.contains('project-icon-and-text-div')
              || target.classList.contains('project-default-icons-div')) {
        target.parentElement.classList.add('selected-link');
        }
    }

    // PROJECTS
    function editProject(index) {
        const projectIcon = projects.projectList[index].icon;
        const allProjectIcons = modal.querySelectorAll('.icon');

        //  SHOW EDITABLE PROJECT TITLE
        modalTitle.value = projects.projectList[index].title;

        // SELECT EDITABLE PROJECT ICON
        for (let i=0; i<allProjectIcons.length; i++) {
            if (allProjectIcons[i].value === projectIcon) {
                allProjectIcons[i].checked = true;
            }
        }
    }

    // TASKS
    function showTasks(index) {
        const tasksList = document.querySelector('.tasks-list');
       

        // SHOW TASKS COUNT
        tasksCount.textContent = projects.projectList[index].tasks.length;
        tasksList.textContent = '';

        for (let i = 0; i < projects.projectList[index].tasks.length; i++) {
            const taskDiv = document.createElement('div');
            const taskIconAndTextDiv = document.createElement('div');
            const taskIcon = document.createElement('i');
            const taskText = document.createElement('p');
            const taskInfo = document.createElement('div');
            const taskDueDate = document.createElement('p');
            const taskEditIcon = document.createElement('i');
            const taskTrashIcon = document.createElement('i');
            const taskInfoIcon = document.createElement('i');
        

            // TASK DIV
            taskDiv.classList.add('task-div', 'hover-element');

            // TASK ICON, TEXT AND ITS DIV
            taskIconAndTextDiv.classList.add('flex');

            if (projects.projectList[index].tasks[i].priority === 'low') {
                taskIcon.classList.add('fa-solid', 'fa-circle', 'low-priority', 'padding-right');
            } else if (projects.projectList[index].tasks[i].priority === 'medium') {
                taskIcon.classList.add('fa-solid', 'fa-circle', 'mid-priority', 'padding-right');
            } else if (projects.projectList[index].tasks[i].priority === 'high') {
                taskIcon.classList.add('fa-solid', 'fa-circle', 'high-priority', 'padding-right');
            } else {
                taskIcon.classList.add('fa-solid', 'fa-circle', 'padding-right');
            }

            taskText.classList.add('task-text');
            taskText.textContent = projects.projectList[index].tasks[i].title;

            // TASK INFO DIV
            taskInfo.classList.add('flex');

            // TASKS DUE DATE
            taskDueDate.classList.add('due-date', 'padding-right');
            if (projects.projectList[index].tasks[i].date !== undefined) {
                taskDueDate.textContent = projects.projectList[index].tasks[i].date;
            } else {
                taskDueDate.textContent = '';
            }

            // TASK DEFAULT ICONS
            taskEditIcon.classList.add('fa-solid', 'fa-edit', 'edit-task', 'scale-element', 'padding-right');
            taskEditIcon.setAttribute('data-index', i);
            taskTrashIcon.classList.add('fa-solid', 'fa-trash-alt', 'scale-element', 'delete-task', 'padding-right');
            taskTrashIcon.setAttribute('data-index', i);
            taskInfoIcon.classList.add('fa-solid', 'scale-element', 'fa-info-circle');
            taskInfoIcon.setAttribute('data-index', i);

            // APPENDS
            taskIconAndTextDiv.appendChild(taskIcon);
            taskIconAndTextDiv.appendChild(taskText);
            taskInfo.appendChild(taskDueDate);
            taskInfo.appendChild(taskEditIcon);
            taskInfo.appendChild(taskTrashIcon);
            taskInfo.appendChild(taskInfoIcon);
            taskDiv.appendChild(taskIconAndTextDiv);
            taskDiv.appendChild(taskInfo);
            tasksList.appendChild(taskDiv);

            manipulateModal('close');
        }

    }

    function showProjects() {

        console.log('Preparing to display projects');

        const projectsLinks = document.querySelector('.projects-links-div');
        const projectsCount = document.querySelector('.projects-count');
        
        // SHOW NUMBER OF PROJECTS
        projectsCount.textContent = projects.projectList.length;
        projectsLinks.textContent = '';

        for (let i = 0; i < projects.projectList.length; i += 1) {
          const projectLink = document.createElement('a');
          const projectIcon = document.createElement('i');
          const projectText = document.createElement('p');
          const projectIconTextDiv = document.createElement('div');
          const projectIconsDiv = document.createElement('div');
          const projectEditIcon = document.createElement('i');
          const projectTrashIcon = document.createElement('i');

        
          // PROJECT ICON/TEXT AND DEFAULT ICONS DIVS
        projectIconTextDiv.classList.add('project-icon-and-text-div', 'project', 'select');
        projectIconTextDiv.setAttribute('data-index', i);
        projectIconsDiv.classList.add('project-default-icons-div', 'project', 'select');
        projectIconsDiv.setAttribute('data-index', i);

          // PROJECT LINK
          projectLink.setAttribute('href', '#');
          projectLink.setAttribute('data-index', i);
          projectLink.classList.add('menu-link', 'project-link', 'project', 'select', 'link');

          // PROJECT ICON
          projectIcon.classList.add('fa-solid', 'project-icon', projects.projectList[i].icon, 'fa-fw', 'project', 'select', 'padding-right');
          projectIcon.setAttribute('data-index', i);

          // PROJECT TEXT
          projectText.classList.add('project-text', 'project', 'select');
          projectText.textContent = projects.projectList[i].title;
          projectText.setAttribute('data-index', i);

        // PROJECT DEFAULT ICONS
          projectEditIcon.classList.add('fa-regular', 'fa-pen-to-square', 'edit-project', 'project', 'scale-element', 'padding-right', 'project-icon', 'edit-project');
          projectEditIcon.setAttribute('data-index', i)
          projectTrashIcon.classList.add('fa-regular', 'fa-trash-can', 'project', 'project-icon', 'scale-element', 'delete-project');
          projectTrashIcon.setAttribute('data-index', i);

          // APPENDS
          projectIconsDiv.appendChild(projectEditIcon);
          projectIconsDiv.appendChild(projectTrashIcon);
          projectIconTextDiv.appendChild(projectIcon);
          projectIconTextDiv.appendChild(projectText);
          projectLink.appendChild(projectIconTextDiv);
          projectLink.appendChild(projectIconsDiv);
          projectsLinks.appendChild(projectLink);
        }
        manipulateModal('close');
        console.log('Projects displayed');

      }

        //   MAIN CONTENT
      function showMainTitle(index) {
        const allMenuIcons = document.querySelectorAll('.menu-link-icon');
        
        const menuIcon = allMenuIcons[index].getAttribute('data-icon');
        const menuTexts = document.querySelectorAll('.menu-link-text');
        
        mainTitleIcon.classList.add('fa-solid', menuIcon, 'main-title-icon', 'fa-fw', 'padding-right');
        mainTitleText.textContent = menuTexts[index].textContent;

    }
    

    function changeMainTitle(target, index) {
        mainTitleIcon.className = '';

        // TITLE OF TASKS FROM MENU
        if (target.classList.contains('menu-link') 
        || target.classList.contains('menu-link-icon') 
        || target.classList.contains('menu-link-text')) {
            showMainTitle(index);
        // TITLE OF TASKS FROM PROJECTS
        } else if (target.classList.contains('project-link') 
        || target.classList.contains('project-icon') 
        || target.classList.contains('project-text') 
        || target.classList.contains('project-icon-and-text-div') 
        || target.classList.contains('project-default-icons-div')) {
            const projectIcon = projects.projectList[index].icon;
            mainTitleIcon.classList.add('fa-solid', projectIcon, 'main-title-icon', 'fa-fw', 'padding-right');
            mainTitleText.textContent = projects.projectList[index].title;
        }
    }

    
    return {
        responsiveMenu,
        manipulateModal,
        validateModal,
        toggleMenu,
        selectMenuLink,
        editProject,
        showTasks,
        showProjects,
        showMainTitle,
        changeMainTitle,
    };

})();

export default dom;