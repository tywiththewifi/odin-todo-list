// My ToDo app goes here!

import './styles.css';
import dom from './dom';
import handlers from './handlers';
import projects from './projects';
import tasks from './tasks';

// ADD AND SHOW DEFAULT PROJECT (EXAMPLE)
projects.addProject('fa-tools', 'Craft Example');
dom.showProjects();

// ADD EXMAPLE TASK
tasks.addTask(0, 'Show Task Demo', 'Short description of my task', '2024-11-11', 'low');


// SHOW DEFAULT CONTENT
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    dom.showProjects();
    dom.showMainTitle(0);
    dom.responsiveMenu();
    handlers.listenClicks();
    handlers.resizeWindow();
});
// dom.showProjects();
// dom.showMainTitle(0);
// dom.responsiveMenu();
// handlers.listenClicks();
// handlers.resizeWindow();