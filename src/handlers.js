import dom from './dom';

console.log('Handlers module loaded');


const handlers = (() => {

    // RESIZE MENU DEPENDING ON WINDOW SIZE
    function resizeWindow() {
        window.addEventListener('resize', dom.responsiveMenu);
    }

    function listenClicks() {

        // VARIABLES NOT BE OVERWRITTEN AFTER CLICK EVENT
        let projectIndex;
        let taskIndex;

        document.addEventListener('click', (event) => {
            console.log('Click event triggered:', event.target);
            
            const { target } = event;
            const modalMainTitle = document.querySelector('.modal-main-title');
            const selectedLink = document.querySelector('.selected-link');

            const linkIndex = parseInt(target.getAttribute('data-link-index'), 10);

            if (event.target.matches('.select')) {
                let index = event.target.getAttribute('data-link-index');
                console.log('Clicked on .select, index set to:', index, 'Event target:', event.target);
                if (index) {
                    dom.showMainTitle(index);
                } else {
                    console.error('Index is null', 'Event target:', event.target);
                }
            }

            // TOGGLE SIDE MENU
            if (
                target.classList.contains('toggle-menu') || 
                target.classList.contains('burger-line')
                ) {
                dom.toggleMenu();
                }

            // STYLE CLICKED LINK
            if (target.classList.contains('select')) {

                dom.selectLink(target, linkIndex);

                // IN THE MAIN CONTENT SHOW TITLE ACCORDING TO SELECTED LINK TITLE
                dom.changeMainTitle(target, linkIndex); 
            }

            // MODAL TO ADD A PROJECT
            if (target.classList.contains('add-project')) {
                dom.manipulateModal('show', 'Add Project', 'Add');

            } else if (target.classList.contains('project-icon')) {
                projectIndex = parseInt(target.getAttribute('data-link-index'), 10);
            }
            
            // MODAL TO EDIT A PROJECT
            if (target.classList.contains('edit-project')) {
                dom.manipulateModal('show', 'Edit Project', 'Edit', projectIndex);

            // MODAL TO DELETE A PROJECT
            } else if (target.classList.contains('delete-project')) {
                dom.manipulateModal('show', 'Delete Project', 'Delete', projectIndex);
            }
                
            // MODALS FOR TASKS EDITING, DELETING AND WATCHING INFO
            if (target.classList.contains('task-icon')) {
                projectIndex = parseInt(target.getAttribute('data-project-index'), 10);
                taskIndex = parseInt(target.getAttribute('data-task-index'), 10);

                // MODAL FOR ADDING TASK
                if (target.classList.contains('add-task')) {
                    dom.manipulateModal('show', 'Add Task', 'Add');
  
                // MODAL FOR EDITING TASK
                } else if (target.classList.contains('edit-task')) {
                    dom.manipulateModal('show', 'Edit Task', 'Edit', projectIndex, taskIndex);
        
                // MODAL FOR DELETING TASK
                } else if (target.classList.contains('delete-task')) {
                    dom.manipulateModal('show', 'Delete Task', 'Delete', projectIndex, taskIndex);
        
                // MODAL FOR WATCHING TASK INFO
                } else if (target.classList.contains('fa-info-circle')) {
                    dom.manipulateModal('show', 'Task Info', '', projectIndex, taskIndex);
                }
            }

            // VALIDATE MODAL
            if (target.classList.contains('confirm-modal')) {

                // VALIDATE MODAL FOR ADDING
                if (target.textContent === 'Add') {
                    projectIndex = parseInt(selectedLink.getAttribute('data-link-index'), 10);
                    dom.validateModal('add', projectIndex, '', selectedLink);

                // VALIDATE MODAL FOR EDITING
                } else if (target.textContent === 'Edit') {

                    // EDIT A PROJECT
                    if (modalMainTitle.textContent === 'Edit Project') {
                        
                        dom.validateModal('edit', projectIndex, '', selectedLink);

                    // EDIT A TASK
                    } else if (modalMainTitle.textContent === 'Edit Task') {
                        dom.validateModal('edit', projectIndex, taskIndex, selectedLink);
                    }

                // VALIDATE MODAL FOR DELETING
                } else if (target.textContent === 'Delete') {
                    const projectDeletionText = document.querySelector('.project-deletion-text');

                    // DELETE A PROJECT 
                    if (!projectDeletionText.classList.contains('hide')) {
                        projectIndex = parseInt(selectedLink.getAttribute(data-link-index), 10);

                        // If deletion text is shown
                        dom.validateModal('delete', projectIndex, '', selectedLink);
                        dom.changeMainTitle(target, 0); // After deleting a project - change icon to 'fa-calendar-alt' (menu link 'all')
                        dom.showMainTitle(0); // After deleting a project - show main title as 'All'
                        dom.getTasks('all'); // After deleting a project - show all tasks from all remaining projects
                    
                    // DELETE A TASK
                    } else if (projectDeletionText.classList.contains('hide')) {
                        dom.validateModal('delete', projectIndex, taskIndex, selectedLink);
                    }
                }
            }
            
                
                
                // CLOSE MODAL
                if (target.classList.contains('close')) {
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