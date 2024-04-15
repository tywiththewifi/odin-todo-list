import projects from './projects';


const dom = (() => {
    const toggleMenuIcon = document.querySelector('.toggle-menu');
    const sidebarMenu = document.querySelector('#sidebar-menu');
    const mainContent = document.querySelector('#main');
    const modal = document.querySelector('#modal');
    const projectTitle = document.querySelector('#project-title');
    const projectTitleError = document.querySelector('.project-title-error');

    function responsiveMenu() {
        if (window.innerWidth <= 1000) {
            toggleMenuIcon.classList.remove('active');
            sidebarMenu.classList.remove('show-sidebar');
            sidebarMenu.classList.add('hide-sidebar');
            mainContent.classList.remove('contract-main');
            mainContent.classList.add('expand-main');
            mainContent.classList.remove('darker-backround');
        } else {
            sidebarMenu.classList.remove('hide-sidebar');
            sidebarMenu.classList.add('show-sidebar');
            mainContent.classList.remove('expand-main');
            mainContent.classList.add('contract-main');
            mainContent.classList.remove('darker-backround');

        }
    }

    function editProject(index) {
        const projectIcon = target.projectList[index].icon;
        const allProjectIcons = modal.querySelectorAll('.icon');

        //  SHOW EDITABLE PROJECT TITLE
        projectTitle.value = projects.projectList[index].title;

        // SELECT EDITABLE PROJECT ICON
        for (let i=0; i<allProjectIcons.length; i++) {
            if (allProjectIcons[i].value === projectIcon) {
                allProjectIcons[i].checked = true;
            }
        }
    }

    function manipulateModal(state, name, task, index) {
        const modalHeader = modal.querySelector('.modal-header');
        const deletionText = modal.querySelector('.deletion-text');
        const confirmButton = modal.querySelector('.confirm-modal');
        const cancelButton = modal.querySelector('.cancel-modal');

        modalHeader.classList.remove('deletion-modal-header');
        const form = document.querySelector('#form');
        form.reset();
        form.classList.remove('hide');

        projectTitleError.classList.remove('show');
        projectTitleError.classList.add('hide');
        deletionText.classList.add('hide');
        cancelButton.classList.remove('cancel-deletion');
        confirmButton.classList.remove('confirm-deletion');

        if (state === 'show') {
            const modalTitle = modal.querySelector('.modal-title');
            const modalTask = modal.querySelector('.modal-task');
            modal.classList.remove('hide');
            modal.classList.add('show');
            modalTitle.textContent = name;
            modalTask.textContent = task;

        } else if (task === 'delete') {
            const deletionProjectTitle = modal.querySelector('.project-title');
            modalHeader.classList.add('deletion-modal-header');
            deletionText.classList.remove('hide');
            deletionText.classList.add('show');
            deletionProjectTitle.textContent = projects.projectList[index].title;
            form.classList.add('hide');
            cancelButton.classList.add('cancel-deletion');
            confirmButton.classList.add('confirm-deletion');
        
        } else if (state === 'close') {
            modal.classList.remove('show');
            modal.classList.add('hide');
        }
    }

    function validateModal(task, index) {
        const { projectIcon } = document.forms.form;
        if (task === 'add' || task === 'edit') {
            if (projectTitle.value === '') {
                projectTitleError.classList.remove('hide');
                projectTitleError.classList.add('show');
            }

          // ADD PROJECT TO ARRAY AND DOM
        } else if (task === 'add') {
          projects.addProject(projectIcon.value, projectTitle.value);

          // EDIT PROJECT FROM ARRAY
        } else if (task === 'edit') {
          projects.editProject(projectIcon.value, projectTitle.value, index);

          // DELETE PROJECT FROM ARRAY
        } else if (task === 'delete') {
            projects.deleteProject(index);
        }
      }

    function toggleMenu() {
        toggleMenuIcon.classList.toggle('active');
        if (sidebarMenu.classList.contains('hide-sidebar')) {
            sidebarMenu.classList.remove('hide-sidebar');
            sidebarMenu.classList.add('show-sidebar');
            mainContent.classList.add('darker-backround');
        } else if (sidebarMenu.classList.contains('show-sidebar')) {
            sidebarMenu.classList.remove('show-sidebar');
            sidebarMenu.classList.add('hide-sidebar');
            mainContent.classList.remove('darker-backround');
        }
    }

    function selectMenuLink(target) {
        const taskLinks = document.querySelectorAll('.nav-link');
        taskLinks.forEach((link) => {
            link.classList.remove('selected-link');
        });
        if (target.classList.contains('nav-link')) {
            target.classList.add('selected-link');
        } else {
        }
    }


    function showProjects() {
        const projectsLinks = document.querySelector('#projects-links-div');
        projectsLinks.textContent = '';

        for (let i = 0; i < projects.projectsList.length; i += 1) {
          const projectLink = document.createElement('a');
          const projectIcon = document.createElement('i');
          const projectText = document.createElement('p');
          const projectIconsDiv = document.createElement('div');
          const projectEditIcon = document.createElement('i');
          const projectTrashIcon = document.createElement('i');

          // PROJECT LINK
          projectLink.setAttribute('href', '#');
          projectLink.setAttribute('index', [i]);
          projectLink.classList.add('nav-link', 'project-link');

          // PROJECT SELECTED ICON
          projectIcon.classList.add('fal', 'project-icon', projects.projectsList[i].icon, 'fa-fw', 'padding-right');
          projectIconsDiv.classList.add('float-right');

          // PROJECT TEXT
          projectText.classList.add('nav-link-text');
          projectText.textContent = projects.projectsList[i].title;

        // PROJECT DEFAULT ICONS
          projectEditIcon.classList.add('fal', 'fa-edit', 'padding-right', 'edit-project', 'hover-icon');
          projectEditIcon.setAttribute('data-index', i)
          projectTrashIcon.classList.add('fal', 'fa-trash-alt', 'delete-project', 'hover-icon');
          projectTrashIcon.setAttribute('data-index', i);

          // APPENDS
          projectIconsDiv.appendChild(projectEditIcon);
          projectIconsDiv.appendChild(projectTrashIcon);
          projectLink.appendChild(projectIcon);
          projectLink.appendChild(projectText);
          projectLink.appendChild(projectIconsDiv);
          projectsLinks.appendChild(projectLink);
        }
        manipulateModal('close');
      }
    
    return {
        responsiveMenu,
        manipulateModal,
        validateModal,
        toggleMenu,
        selectMenuLink,
        editProject,
        showProjects,
    };

})();

export default dom;