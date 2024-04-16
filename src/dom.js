import projects from './projects';

console.log('DOM module loaded');

const dom = (() => {
    const toggleMenuIcon = document.querySelector('.toggle-menu');
    const sidebarMenu = document.querySelector('#sidebar-menu');
    const mainContent = document.querySelector('#main');
    const modal = document.querySelector('#modal');
    const projectTitle = document.querySelector('#project-title');
    const projectTitleError = document.querySelector('.project-title-error');
    const mainTitleIcon = document.querySelector('.main-title-icon');
    const mainTitleText = document.querySelector('.main-title-text');

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

            // SHOW SIDEBAR AND MAKE IT A BIT TRANSPARENT
            sidebarMenu.classList.remove('hide-sidebar');
            sidebarMenu.classList.add('show-sidebar');
            sidebarMenu.classList.remove('add-z-index');

            // CONTRACT MAIN CONTENT AND MAKE IT OPAQUE
            mainContent.classList.remove('expand-main');
            mainContent.classList.add('contract-main');
            mainContent.classList.remove('inactive-main');

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

        projectTitleError.classList.add('hide');
        deletionText.classList.add('hide');
        cancelButton.classList.remove('cancel-deletion');
        confirmButton.classList.remove('confirm-deletion');

        if (state === 'show') {
            const modalTitle = modal.querySelector('.modal-title');
            const modalTask = modal.querySelector('.modal-task');
            modal.classList.remove('hide');
            modalTitle.textContent = name;
            modalTask.textContent = task;

        } else if (task === 'delete') {
            const deletionProjectTitle = modal.querySelector('.project-title');
            modalHeader.classList.add('deletion-modal-header');
            deletionText.classList.remove('hide');
            deletionProjectTitle.textContent = projects.projectList[index].title;
            form.classList.add('hide');
            cancelButton.classList.add('cancel-deletion');
            confirmButton.classList.add('confirm-deletion');
        
        } else if (state === 'close') {
            modal.classList.add('hide');
        }
    }

    function validateModal(task, index) {
        const { projectIcon } = document.forms.form;
        if (task === 'add' || task === 'edit') {
            if (projectTitle.value === '') {
                projectTitleError.classList.remove('hide');
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

    function selectMenuLink(target) {
        const taskLinks = document.querySelectorAll('.nav-link');
        taskLinks.forEach((link) => {
            link.classList.remove('selected-link');
        });

        // ADD BACKGROUND COLOR ON CLICKED NAVIGATION BAR LINK
        // IF CLICKED DIRECTLY ON MENU OR PROJECT LINK
        if (target.classList.contains('nav-link')) {
            target.classList.add('selected-link');
        
        // IF CLICKED ON MENU LINK ICON OR TEXT
        } else if (target.classList.contains('nav-link-icon')
                || target.classList.contains('nav-link-text')) {
                target.parentElement.classList.add('selected-link');

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
        projectTitle.value = projects.projectList[index].title;

        // SELECT EDITABLE PROJECT ICON
        for (let i=0; i<allProjectIcons.length; i++) {
            if (allProjectIcons[i].value === projectIcon) {
                allProjectIcons[i].checked = true;
            }
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
        projectIconTextDiv.classList.add('project-icon-and-text-div', 'select');
        projectIconTextDiv.setAttribute('data-index', i);
        projectIconsDiv.classList.add('project-default-icons-div', 'select');
        projectIconsDiv.setAttribute('data-index', i);

          // PROJECT LINK
          projectLink.setAttribute('href', '#');
          projectLink.setAttribute('data-index', i);
          projectLink.classList.add('nav-link', 'project-link', 'select');

          // PROJECT ICON
          projectIcon.classList.add('fa-solid', 'project-icon', projects.projectList[i].icon, 'fa-fw', 'padding-right');
          projectIcon.setAttribute('data-index', i);

          // PROJECT TEXT
          projectText.classList.add('project-text', 'select');
          projectText.textContent = projects.projectList[i].title;
          projectText.setAttribute('data-index', i);

        // PROJECT DEFAULT ICONS
          projectEditIcon.classList.add('fa-regular', 'fa-pen-to-square', 'padding-right', 'edit-project');
          projectEditIcon.setAttribute('data-index', i)
          projectTrashIcon.classList.add('fa-regular', 'fa-trash-can', 'delete-project');
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

      function showMainTitle(index) {
        const allMenuIcons = document.querySelectorAll('.menu-icon');
        console.log('allMenuIcons:', allMenuIcons.length);
        console.log('Current index:', index);
        

        if (index < 0 || index >= allMenuIcons.length) {
            console.error('Index out of bounds:', index);
            return;
        }
        
        const menuIcon = allMenuIcons[index].getAttribute('data-icon');
        const menuTexts = document.querySelectorAll('.menu-text');
        mainTitleIcon.classList.add('fa-solid', menuIcon, 'main-title-icon', 'fa-fw', 'padding-right');
        mainTitleText.textContent = menuTexts[index].textContent;

    }
    

    function changeMainTitle(target, index) {
        mainTitleIcon.className = '';

        // TITLE OF TASKS FROM MENU
        if (target.classList.contains('menu-link') 
        || target.classList.contains('menu-icon') 
        || target.classList.contains('menu-text')) {
            showMainTitle(index);
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
        showProjects,
        showMainTitle,
        changeMainTitle,
    };

})();

export default dom;