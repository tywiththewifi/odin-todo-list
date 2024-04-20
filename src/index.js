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
tasks.addTask(
    0, 
    'Show Task Demo', 
    'Longer description of my demo task, just to show this amazingly nice scrollbar ... ฅ(^◉ᴥ◉^)ฅ ...', 
    '2011-11-11', 
    'low'
);

// BY DEFAULT SHOW TITLE FROM MENU LINK 'ALL'
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