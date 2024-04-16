// My ToDo app goes here!

import './styles.css';
import dom from './dom';
import handlers from './handlers';



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