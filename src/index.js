// My ToDo app goes here!

import './styles.css';
import dom from './dom';
import handlers from './handlers';

dom.showProjects();

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');

    // WHEN PAGE IS LOADED - SHOW TITLE FROM MENU LINK 'ALL'
    dom.showMainTitle(0);
    
    // WHEN PAGE IS LOADED - SHOW ALL DEFAULT PROJECTS
    dom.showProjects();

    // WHEN PAGE IS LOADED - SHOW ALL TASKS FROM ALL DEFAULT PROJECTS
    dom.getTasks('all');
    dom.responsiveMenu();
    handlers.listenClicks();
    handlers.resizeWindow();
});



