import dom from './dom';

console.log('Handlers module loaded');


const handlers = (() => {
    let index = 0;

    // RESIZE MENU DEPENDING ON WINDOW SIZE
    function resizeWindow() {
        window.addEventListener('resize', dom.responsiveMenu);
    }

    function listenClicks() {
        document.addEventListener('click', (event) => {
            console.log('Click event triggered:', event.target);

            const selectedLink = document.querySelector('.selected-link');
            let { target } = event;

            index = parseInt(target.getAttribute('data-index'), 10);

            if (event.target.matches('.select')) {
                let index = event.target.getAttribute('data-index');
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

            // STYLE CLICKED LINK
            } else if (target.classList.contains('select')) {
                dom.selectLink(target, index);

                // IN THE MAIN CONTENT SHOW MENU TITLE ACCORDINGLY
                dom.changeMainTitle(target, index);
            }

            // MODAL TO EDIT A PROJECT
            if (target.classList.contains('edit-project')) {
                dom.manipulateModal('show', 'Edit Project', 'Edit', index);
                dom.editProject(index);

            // MODAL TO DELETE A PROJECT
            } else if (target.classList.contains('delete-project')) {
                dom.manipulateModal('show', 'Delete Project', 'Delete', index);
            }


            // MODAL TO ADD A PROJECT
            if (target.classList.contains('add-project')) {
                dom.manipulateModal('show', 'Add Project', 'Add');
                
            // MODAL TO ADD A TASK
            } else if (target.classList.contains('add-task')) {
                dom.manipulateModal('show', 'Add Task', 'Add');

            // MODAL TO DELETE A TASK
            } else if (target.classList.contains('delete-task')) {
                const taskIndex = parseInt(target.getAttribute('data-index'), 10);
                dom.manipulateModal('show', 'Delete Task', 'Delete', 0, taskIndex);

            // MODAL TO WATCH TASK INFO
            } else if (target.classList.contains('fa-info-circle')) {
                const taskIndex = parseInt(target.getAttribute('data-index'), 10);
                const projectIndex = parseInt(selectedLink.getAttribute('data-index'), 10);

                dom.manipulateModal('show', 'Task Info', '', projectIndex, taskIndex);

            

            // VALIDATE MODAL INFO
            } else if (target.classList.contains('confirm-modal')) {
                const selectedProject = document.querySelector('.selected-link');


                // VALIDATE MODAL FOR ADDING
                if (target.textContent === 'Add') {
                    index = parseInt(selectedLink.getAttribute('data-index'), 10);
                    dom.validateModal('add');
                    target = selectedLink;

                    // VALIDATE MODAL FOR EDITING
                } else if (target.textContent === 'Edit') {
                    index = parseInt(selectedProject.getAttribute('data-index'), 10);
                    dom.validateModal('edit', index);
                    
                    // VALIDATE MODAL FOR DELETING
                } else if (target.textContent === 'Delete') {
                    const projectDeletionText = document.querySelector('.project-deletion-text');

                    // DELETE A PROJECT 
                    // IF DELETION TEXT IS SHOWN
                    if (!projectDeletionText.classList.contains('hide')) {

                        // If deletion text is shown
                        const projectIndex = parseInt(selectedLink.getAttribute('data-index'), 10);
                        dom.validateModal('delete', projectIndex);
                        dom.changeMainTitle(target, 0); // After deleting a project - change icon to 'fa-calendar-alt' (menu link 'all')
                        dom.showMainTitle(0); // After deleting a project - show main title as 'All'
                        dom.getTasks('all'); // After deleting a project - show all tasks from all remaining projects
                    
                    // DELETE A TASK
                    } else if (projectDeletionText.classList.contains('hide')) {
                        console.log('Delete a task!');
                    }
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