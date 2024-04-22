import dom from './dom';

console.log('Handlers module loaded');


const handlers = (() => {

    // RESIZE MENU DEPENDING ON WINDOW SIZE
    function resizeWindow() {
        window.addEventListener('resize', dom.responsiveMenu);
    }

    function listenClicks() {

        // VARIABLES NOT BE OVERWRITTEN AFTER CLICK EVENT
        let project;
        let task;

        document.addEventListener('click', (event) => {
            console.log('Click event triggered:', event.target);
            
            const { target } = event;
            const selectedLink = document.querySelector('.selected-link');
            const modalMainTitle = document.querySelector('.modal-main-title');

            let linkIndex = parseInt(target.getAttribute('data-link-index'), 10);
            let taskIndex;

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

                // IN THE MAIN CONTENT SHOW MENU TITLE ACCORDINGLY
                dom.changeMainTitle(target, linkIndex); 
            }

            // MODAL TO ADD A PROJECT
            if (target.classList.contains('add-project')) {
                dom.manipulateModal('show', 'Add Project', 'Add');

            // MODAL TO EDIT A PROJECT
            } else if (target.classList.contains('edit-project')) {
                dom.manipulateModal('show', 'Edit Project', 'Edit', linkIndex);
                dom.editProject(linkIndex);

            // MODAL TO DELETE A PROJECT
            } else if (target.classList.contains('delete-project')) {
                dom.manipulateModal('show', 'Delete Project', 'Delete', linkIndex);
                
            // MODAL TO ADD A TASK
            } else if (target.classList.contains('add-task')) {
                dom.manipulateModal('show', 'Add Task', 'Add');

            } else if (target.classList.contains('edit-task')) {
                console.log('task editing.');

            // MODAL TO DELETE A TASK
            } else if (target.classList.contains('delete-task')) {
                project = parseInt(target.getAttribute('data-project-index'), 10);
                task = parseInt(target.getAttribute('data-task-index'), 10);
                dom.manipulateModal('show', 'Delete Task', 'Delete', linkIndex, taskIndex);

            // MODAL TO WATCH TASK INFO
            } else if (target.classList.contains('fa-info-circle')) {
                taskIndex = parseInt(target.getAttribute('data-task-index'), 10);
                linkIndex = parseInt(selectedLink.getAttribute('data-project-index'), 10);

                dom.manipulateModal('show', 'Task Info', '', linkIndex, taskIndex);
            }

            

            // VALIDATE MODAL
            if (target.classList.contains('confirm-modal')) {

                // VALIDATE MODAL FOR ADDING
             } else if (target.textContent === 'Add') {
                    dom.validateModal('add');

                // VALIDATE MODAL FOR EDITING
                } else if (target.textContent === 'Edit') {

                    // EDIT A PROJECT
                    if (modalMainTitle.textContent === 'Edit Project') {
                        linkIndex = parseInt(selectedLink.getAttribute('data-link-index'), 10);
                        dom.validateModal('edit', linkIndex);
                    
                    } else if (modalMainTitle.textContent === 'Edit Task') {
                        console.log('Edit a task!');
                    }

                // VALIDATE MODAL FOR DELETING
                } else if (target.textContent === 'Delete') {
                    const projectDeletionText = document.querySelector('.project-deletion-text');

                    // DELETE A PROJECT 
                    if (!projectDeletionText.classList.contains('hide')) {
                        linkIndex = parseInt(selectedLink.getAttribute(data-link-index), 10);

                        // If deletion text is shown
                        dom.validateModal('delete', linkIndex);
                        dom.changeMainTitle(target, 0); // After deleting a project - change icon to 'fa-calendar-alt' (menu link 'all')
                        dom.showMainTitle(0); // After deleting a project - show main title as 'All'
                        dom.getTasks('all'); // After deleting a project - show all tasks from all remaining projects
                    
                    // DELETE A TASK
                    } else if (projectDeletionText.classList.contains('hide')) {
                        dom.validateModal('delete', project, task);
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