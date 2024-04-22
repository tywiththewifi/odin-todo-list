// My ToDo app goes here!

import './styles.css';
import dom from './dom';
import handlers from './handlers';
import projects from './projects';
import tasks from './tasks';

// ADD AND SHOW DEFAULT PROJECT (EXAMPLE)
projects.addProject('fa-tools', 'Craft New Project');
projects.addProject('fa-tools', 'Craft Another Project');

dom.showProjects();

// ADD EXMAPLE TASK
tasks.addTask(
    0, 
    'Move things with my mind', 
    'Longer description of my demo task, just to show this amazingly nice scrollbar ... ฅ(^◉ᴥ◉^)ฅ ...', 
    '2011-11-11', 
    'low'
);

tasks.addTask(
    1, 
    'Move more things with my mind', 
    'Longer description of my demo task, just to show you this surprisingly nice scrollbar', 
    '2024-12-12', 
    'high'
);

// WHEN PAGE IS LOADED - SHOW TITLE FROM MENU LINK 'ALL'
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    dom.showProjects();
    dom.getTasks('all');
    dom.showMainTitle(0);
    dom.responsiveMenu();
    handlers.listenClicks();
    handlers.resizeWindow();
});
