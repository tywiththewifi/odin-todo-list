import projects from './projects';
import tasks from './tasks';

console.log('DOM module loaded');

const dom = (() => {
    const toggleMenuIcon = document.querySelector('.toggle-menu');
    const sidebarMenu = document.querySelector('#sidebar-menu');
    const modal = document.querySelector('#modal');
    const form = modal.querySelector('#form');
    const modalTitle = modal.querySelector('#modal-title');
    const modalTitleError = modal.querySelector('.modal-title-error');
    const mainContent = document.querySelector('#main');
    const mainTitleIcon = document.querySelector('.main-title-icon');
    const mainTitleText = document.querySelector('.main-title-text');
    const projectsLinksDiv = document.querySelector('.projects-links-div');
    const tasksCount = document.querySelector('.tasks-count');
    const tasksList = document.querySelector('.tasks-list');
    const taskDescription = modal.querySelector('.task-description');
    const taskDueDate = modal.querySelector('#dueDate');
    const taskPrioritySelection = modal.querySelector('.task-priority');

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

    //   MAIN CONTENT TITLE
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
      || target.classList.contains('project-default-icons-div') 
      || target.classList.contains('delete-project') 
      || target.classList.contains('edit-project')) {
          const projectIcon = projects.projectList[index].icon;
          mainTitleIcon.classList.add('fa-solid', projectIcon, 'main-title-icon', 'fa-fw', 'padding-right');
          mainTitleText.textContent = projects.projectList[index].title;
      }
    }

    // TASKS
    function showTasks(menuTitle, projectIndexStart, projectIndexEnd) {
          
      let tasksNumber = 0;
      
      tasksCount.textContent = 0;
      tasksList.textContent = '';
    
      // GENERATE TASKS LIST
      for (let i = projectIndexStart; i < projectIndexEnd; i++) {
        for (let j = 0; j < projects.projectList[i].tasks.length; j++) {

          // IF CLICKED ON MENU LINK 'IMPORTANT' - FILTER NOT IMPORTANT TASKS
          if (menuTitle === 'important' && projects.projectList[i].tasks[j].priority !== 'high') {
            continue; // if task isnt important skip it

            // IF CLICKED ON MENU LINK 'TODAY'
          } else if (menuTitle === 'today') {
            console.log('tasks for today...') 
          
            // IF CLICKED ON MENU LINK 'WEEK'
          } else if (menuTitle === 'week') {
            console.log('tasks for this week...')
          
          }
        }
      }
    
        const taskDiv = document.createElement('div');
        const taskIconAndTextDiv = document.createElement('div');
        const taskIcon = document.createElement('i');
        const taskText = document.createElement('p');
        const taskInfo = document.createElement('div');
        const taskDate = document.createElement('p');
        const taskEditIcon = document.createElement('i');
        const taskTrashIcon = document.createElement('i');
        const taskInfoIcon = document.createElement('i');

        // SHOW NUMBER OF TASKS
        tasksNumber += 1;
        tasksCount.textContent = tasksNumber;

        taskDiv.classList.add('task-div', 'hover-element');
        taskDiv.setAttribute('data-index', i);

        // TASK PRIORITY, TEXT AND ITS DIV
        taskDiv.classList.add('task-div', 'hover-element');
        taskIconAndTextDiv.classList.add('flex');

        if (projects.projectList[i].tasks[j].priority === 'low') {
          taskIcon.classList.add(
            'fa-solid',
            'fa-circle',
            'low-priority',
            'padding-right'
          );
        } else if (projects.projectList[i].tasks[j].priority === 'medium') {
          
          taskIcon.classList.add('fa-solid', 'fa-circle', 'mid-priority', 'padding-right');

        } else if (projects.projectList[i].tasks[j].priority === 'high') {

          taskIcon.classList.add('fa-solid', 'fa-circle', 'high-priority', 'padding-right');

        } else {
          taskIcon.classList.add('fa-solid', 'fa-circle', 'padding-right');
        }

        taskText.classList.add('task-text');
        taskText.textContent = projects.projectList[i].tasks[j].title;

      // TASK INFO DIV
      taskInfo.classList.add('flex');

      // TASKS DUE DATE
      taskDate.classList.add('due-date', 'padding-right');
          if (projects.projectList[i].tasks[j].date !== undefined) {
              taskDate.textContent = projects.projectList[i].tasks[j].date;
          } else {
              taskDate.textContent = '';
      }

          // TASK DEFAULT ICONS
          taskEditIcon.classList.add('fa-solid', 'fa-edit', 'edit-task', 'task-icon', 'scale-element', 'padding-right');
          taskEditIcon.setAttribute('data-project-index', i);
          taskEditIcon.setAttribute('data-task-index', j);
          taskTrashIcon.classList.add('fa-solid', 'fa-trash-alt', 'task-icon', 'scale-element', 'delete-task', 'padding-right');
          taskTrashIcon.setAttribute('data-project-index', i);
          taskTrashIcon.setAttribute('data-task-index', j);
          taskInfoIcon.classList.add('fa-solid', 'scale-element', 'task-icon', 'fa-info-circle');
          taskInfoIcon.setAttribute('data-project-index', i);
          taskInfoIcon.setAttribute('data-task-index', j);


          // APPENDS
          taskIconAndTextDiv.appendChild(taskIcon);
          taskIconAndTextDiv.appendChild(taskText);
          taskInfo.appendChild(taskDate);
          taskInfo.appendChild(taskEditIcon);
          taskInfo.appendChild(taskTrashIcon);
          taskInfo.appendChild(taskInfoIcon);
          taskDiv.appendChild(taskIconAndTextDiv);
          taskDiv.appendChild(taskInfo);
          tasksList.appendChild(taskDiv);

          
  }

  function getTasks(menuTitle, projectIndex) {
    let projectIndexStart;
    let projectIndexEnd;

    // IF CLICKED ON PROJECT LINK
    if (menuTitle === 'project') { // If number of index exists - project was clicked

      projectIndexStart = projectIndex;
      projectIndexEnd = projectIndex + 1;

      // IF PROJECT DOESN'T HAVE ANY TASKS 
      if (projects.projectList[projectIndex].tasks.length === 0) {
        tasksCount.textContent = 0;
      }

      // IF CLICKED ON MENU LINK  
    } else {
      projectIndexStart = 0;
      projectIndexEnd = projects.projectList.length;
    }

    showTasks(menuTitle, projectIndexStart, projectIndexEnd)
  } 

  function selectLink(target, index, action) {
    const allLinks = document.querySelectorAll('.link');
    const allProjectsLinks = document.querySelectorAll('.project-link');
    const menuTitle = target.getAttribute('data-title');
    const addTaskButton = document.querySelector('.add-task');

    allLinks.forEach((link) => {
        link.classList.remove('selected-link');
    });

    // IF CLICKED DIRECTLY ON LINK (BOTH MENU OR PROJECT)
    if (target.classList.contains('link')) {
        target.classList.add('selected-link');

        if (action === 'edit') {
          allProjectsLinks[index].classList.add('selected-link');
        }
    
    // IF CLICKED ON MENU LINK ICON OR TEXT
    } else if (target.classList.contains('menu-link-icon')
            || target.classList.contains('menu-link-text')) {
            target.parentElement.classList.add('selected-link');

    // IF CLICKED SOMEWHERE ON PROJECT LINK
    } else if (target.classList.contains('project')) {
    
    // SHOW BUTTON TO ADD A TASK TO SELECTED PROJECT
    addTaskButton.classList.remove('hide');
    getTasks('project', index);
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

    // IF CLICKED SOMEWHERE ON MENU LINK
    if (
        target.classList.contains('menu-link') ||
        target.classList.contains('menu-link-icon') ||
        target.classList.contains('menu-link-text')
    ) {
        dom.getTasks(menuTitle);
    }
  }

    // MODAL FUNCITONALITY
    function watchTaskInfo(projectIndex, taskIndex) {
      const infoTaskTitle = document.querySelector('.info-task-title');
      const infoTaskDescription = document.querySelector('.info-task-description');
      const infoTaskDueDate = document.querySelector('.info-task-due-date');
      const infoTaskPriority = document.querySelector('.info-task-priority');
      const infoTaskProject = document.querySelector('.info-task-project');
  
      // TASK TITLE
      infoTaskTitle.textContent = projects.projectsList[projectIndex].tasks[taskIndex].title;
  
      // TASK DESCRIPTION
      infoTaskDescription.textContent = projects.projectsList[projectIndex].tasks[taskIndex].description;
  
      // TASK DUE DATE
      infoTaskDueDate.textContent = projects.projectsList[projectIndex].tasks[taskIndex].date;
  
      // TASK PRIORITY
      if (projects.projectsList[projectIndex].tasks[taskIndex].priority === 'low') {
        infoTaskPriority.textContent = 'I can do it later or never at all... 😴';
      } else if (projects.projectsList[projectIndex].tasks[taskIndex].priority === 'medium') {
        infoTaskPriority.textContent = 'Somewhere between Relax & Focus 😅';
      } else if (projects.projectsList[projectIndex].tasks[taskIndex].priority === 'high') {
        infoTaskPriority.textContent = 'Now or never! 😲';
      } else {
        infoTaskPriority.textContent = '';
      }
  
      // TASK PROJECT
      infoTaskProject.textContent = projects.projectsList[projectIndex].title;
    }

    function manipulateModal(modalState, modalTask, modalAction, projectIndex, taskIndex) {
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

        if (modalState === 'show') {
            const modalIconsDiv = modal.querySelector('.radio-form');
            const modalTasksDiv = modal.querySelector('.modal-tasks-div');

            modal.classList.remove('hide');
            modalMainTitle.textContent = modalTask;
            modalTaskButton.textContent = modalAction;

            modalIconsDiv.classList.remove('hide');
            modalIconsDiv.classList.add('show');
            modalTasksDiv.classList.add('hide');

            // IF MODAL IS FOR EDITING PROJECT
            if (modalTask === 'Edit Project') {

              const allProjectIcons = modal.querySelectorAll('.icon');
              const projectIcon = projects.projectList[projectIndex].icon;

              // SHOW EDITABLE PROJECT TITLE
              modalTitle.value = projects.projectList[projectIndex].title;

              // SELECT EDITABLE PROJECT ICON
              for (let i = 0; i < allProjectIcons.length; i++) {
                if (allProjectIcons[i].value === projectIcon) {
                  allProjectIcons[i].checked = true;
                }
              }
            
            } else if (modalTask === 'Add Task' || modalTask === 'Edit Task') {

                modalIconsDiv.classList.remove('show');
                modalIconsDiv.classList.add('hide');
                modalTasksDiv.classList.remove('hide');

                if (modalTask === 'Edit Task') {
                  modalTitle.value = projects.projectList[projectIndex].tasks[taskIndex].title;
                  taskDescription.value = projects.projectList[projectIndex].tasks[taskIndex].description;
                  taskDueDate.value = projects.projectList[projectIndex].tasks[taskIndex].date;
                  taskPrioritySelection.value = projects.projectList[projectIndex].tasks[taskIndex].priority;
                }

            // IF MODAL IS FOR WATCHING TASK INFO
            } else if (modalTask === 'Task Info') {

              form.classList.add('hide');
              confirmButton.classList.add('hide');
              taskInfoDiv.classList.remove('hide');

              watchTaskInfo(projectIndex, taskIndex);

              } else if (modalTask === 'delete') {
                  modalHeader.classList.add('deletion-modal-header');
                  form.classList.add('hide');
                  cancelButton.classList.add('cancel-deletion');
                  confirmButton.classList.add('confirm-deletion');
              
              // TO CLOSE THE MODAL
              } else if (modalState === 'close') {
                  modal.classList.add('hide');
              }

        // PROJECT DELETION
        if (modalTask === 'Delete Project') {
            const projectDeletionTitle = document.querySelector('.project-deletion-title');

            projectDeletionText.classList.remove('hide');
            projectDeletionTitle.textContent = projects.projectsList[projectIndex].title;

        // TASK DELETION
        } else if (modalTask === 'Delete Task') {
            const taskDeletionTitle = document.querySelector('.task-deletion-title');

            taskDeletionText.classList.remove('hide');
            taskDeletionTitle.textContent = projects.projectsList[projectIndex].tasks[taskIndex].title;
        }
      }
    }

    function validateModal(modalAction, projectIndex, taskIndex, target, clickedLink) {
        const projectFormIcon = document.forms['form'].projectFormIcon;
        const projectDomIcon = projectFormIcon.value;
        const projectIconsDiv = modal.querySelector('.radio-form');
        const modalTitleText = modalTitle.value;
        const projectDeletionText = document.querySelector('.project-deletion-text');
        let menuTitle = clickedLink.getAttribute('data-title');

        // MODALS TO ADD AND EDIT PROJECTS AND TASKS
        if (modalAction === 'add' || modalAction === 'edit') {
            if (modalTitleText === '') {
                modalTitleError.classList.remove('hide');
                modalTitleError.classList.add('show');
            

              // ADD PROJECT TO ARRAY AND DOM
            } else if (modalAction === 'add' && projectIconsDiv.classList.contains('show')) {
              projects.addProject(projectDomIcon, modalTitleText);

              // KEEP NEWLY ADDED PROJECT VISUALLY SELECTED IN DOM
              const lastProject = projectsLinksDiv.lastChild;
              const lastProjectIndex = projectsLinksDiv.lastChild.getAttribute('data-link-index');

              selectLink(lastProject, lastProjectIndex);
              changeMainTitle(lastProject, lastProjectIndex);

              // EDIT A PROJECT FROM ARRAY
            } else if (modalAction === 'edit' && projectIconsDiv.classList.contains('show')) {
          
              const allProjectsLinks = document.querySelectorAll('.project-link');
              allProjectsLinks[index].classList.add('selected-link');
              const editedProject = allProjectsLinks[projectIndex];

              projects.editProject(projectDomIcon, modalTitleText, projectIndex, clickedLink);
              changeMainTitle(selectedLink, projectIndex); // Change main title to icon and text of selected project

              // DELETE A PROJECT FROM ARRAY
            } else if (modalAction === 'delete' && !projectDeletionText.classList.contains('hide')) {
              const allTasksLink = document.querySelector('.link:first-child');
              projects.deleteProject(projectIndex);
              allTasksLink.classList.add('selected-link');

              // DELETE A TASK FROM ARRAY
            } else if (modalAction === 'delete' && projectDeletionText.classList.contains('hide')) {
              tasks.deleteTask(projectIndex, taskIndex);
        
              // ADD A TASK TO ARRAY
            } else if (modalAction === 'add' && projectIconsDiv.classList.contains('hide')) {
              const selectedLink = document.querySelector('.selected-link');
              const selectedProject = selectedLink.getAttribute('data-link-index');
              let taskPriority;

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

              tasks.addTask(selectedProject, modalTitleText, taskDescription.value, taskDueDate.value, taskPriority);

              // EDIT TASK FROM ARRAY 
            } else if (modalAction === 'edit' && projectIconsDiv.classList.contains('hide')) {
              const taskNewTitle = modalTitle.value;
              const taskNewDescription = taskDescription.value;
              const taskNewDate = taskDueDate.value;
              const taskNewPriority = taskPrioritySelection.value;

              tasks.editTask(taskNewTitle, taskNewDescription, taskNewDate, taskNewPriority, projectIndex, taskIndex);
            }
          } else if (modalAction === 'delete' && !projectDeletionText.classList.contains('hide')) {
            const allTasksLink = document.querySelector('.link:first-child');
            
            projects.deleteProject(projectIndex);
            allTasksLink.classList.add('selected-link');

          } else if (modalAction === 'delete' && projectDeletionText.classList.contains('hide')) {
            tasks.deleteTask(projectIndex, taskIndex);

            // IF TASK DELETED FROM CLICKED MENU LINK
            if (clickedLink.classList.contains('menu-link')) {
              menuTitle = clickedLink.getAttribute('data-title');

            // IF TASK DELETED FROM CLICKED PROJECTS LINK
            } else if (clickedLink.classList.contains('project-link')) {
              menuTitle = 'project';
            }
            getTasks(menuTitle, projectIndex);
          }
      }

    function showProjects() {

      console.log('Preparing to display projects');

      const projectsCount = document.querySelector('.projects-count');
      
      // SHOW NUMBER OF PROJECTS
      projectsCount.textContent = projects.projectList.length;
      projectsLinksDiv.textContent = '';

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
      projectIconTextDiv.setAttribute('data-link-index', i);
      projectIconsDiv.classList.add('project-default-icons-div', 'project', 'select');
      projectIconsDiv.setAttribute('data-link-index', i);

        // PROJECT LINK
        projectLink.setAttribute('href', '#');
        projectLink.setAttribute('data-link-index', i);
        projectLink.classList.add('menu-link', 'project-link', 'project', 'select', 'link');

        // PROJECT ICON
        projectIcon.classList.add('fa-solid', 'project-icon', projects.projectList[i].icon, 'fa-fw', 'project', 'select', 'padding-right');
        projectIcon.setAttribute('data-link-index', i);

        // PROJECT TEXT
        projectText.classList.add('project-text', 'project', 'select');
        projectText.textContent = projects.projectList[i].title;
        projectText.setAttribute('data-link-index', i);

      // PROJECT DEFAULT ICONS
        projectEditIcon.classList.add('fa-regular', 'fa-pen-to-square', 'edit-project', 'project', 'project-icon', 'scale-element', 'padding-right', 'project-icon', 'edit-project');
        projectEditIcon.setAttribute('data-link-index', i)
        projectTrashIcon.classList.add('fa-regular', 'fa-trash-can', 'project', 'project-icon', 'project-icon', 'scale-element', 'delete-project');
        projectTrashIcon.setAttribute('data-link-index', i);

        // APPENDS
        projectIconsDiv.appendChild(projectEditIcon);
        projectIconsDiv.appendChild(projectTrashIcon);
        projectIconTextDiv.appendChild(projectIcon);
        projectIconTextDiv.appendChild(projectText);
        projectLink.appendChild(projectIconTextDiv);
        projectLink.appendChild(projectIconsDiv);
        projectsLinksDiv.appendChild(projectLink);
      }
      manipulateModal('close');
      console.log('Projects displayed');

    }

       

    
    return {
        responsiveMenu,
        toggleMenu,
        showMainTitle,
        changeMainTitle,
        getTasks,
        selectLink,
        manipulateModal,
        validateModal,
    };

})();

export default dom;