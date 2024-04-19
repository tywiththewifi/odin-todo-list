// My ToDo app goes here!

import './styles.css';
import dom from './dom';
import handlers from './handlers';
import projects from './projects';

// ADD AND SHOW DEFAULT PROJECT (EXAMPLE)
projects.addProject('fa-tools', 'Craft Example');
projects.addProject('fa-volleyball', 'Sporty Stuff');
projects.addProject('fa-gift', 'Surprise!');
dom.showProjects();


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