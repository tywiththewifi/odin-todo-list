import dom from './dom';

const handlers = (() => {
    let projectIndex = 0;

    // RESIZE MENU DEPENDING ON WINDOW SIZE
    function resizeWindow() {
        window.addEventListener('resize', dom.responsiveMenu);
    }

    function listenClicks() {
        document.addEventListener('click', (event) => {
            const { target } = event;

            // TOGGLE SIDE MENU
            if (target.classList.contains('toggle-menu') 
            || event.target.classList.contains('burger-line')) {
                dom.toggleMenu();

            // STYLE MENU LINK
            } else if (target.classList.contains('nav-link') 
                    || target.classList.contains('nav-link-icon') 
                    || target.classList.contains('nav-link-text')) {
                dom.selectMenuLink(target);
            
            // ADD PROJECT MODAL
            } else if (target.classList.contains('add-project')) {
                dom.manipulateModal('show', 'Add New Project', 'Add');

            // MODAL TO EDIT PROJECT
            } else if (target.classList.contains('edit-project')) {
                projectIndex = target.getAttribute('data-index');
                dom.manipulateModal('show', 'Edit Your Project', 'Edit');
                dom.editProject(projectIndex);

            // MODAL TO DELETE PROJECT
            } else if (target.classList.contains('delete-project')) {
                dom.manipulateModal('show', 'Delete Your Project', 'Delete');

            // VALIDATE MODAL INFO
            } else if (target.classList.contains('confirm-modal')) {
                dom.validateModal();
                if (target.textContent === 'Add') {
                    dom.validateModal('add');
                } else if (target.textContent === 'Edit') {
                dom.validateModal('edit', projectIndex);
                } else if (target.textContent === 'Delete') {
                dom.validateModal('delete');
                }

            // CLOSE MODAL
            }  else if (target.classList.contains('close')) {
                dom.manipulateModal('close');
            }
        });
    }

    return {
        resizeWindow,
        listenClicks,
    };
})();

export default handlers;