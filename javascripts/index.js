/* 
  Three Question Rule For Events:
    Overview: We want to click the home link and make the home page appear.

    Question 1. When? When do we want to be able to click the homel ink to make the home page appear. (DOMContentLoaded)

    Question 2. Cause: What is the cause of the event that happens. (Click)

    Question 3. Effect: What is going to happen when the event triggers. (make the home page appear)

*/



/** Global Variables **/


/** Node Getters **/
const mainDiv = () => document.getElementById('main');
const homeLink = () => document.getElementById('home-link');

/** Event Listeners **/
const attachHomePageLinkEvent = () => {
  homeLink().addEventListener('click', loadHome);
}


/** Event Handlers **/
const loadHome = () => {
  resetMainDiv();
  const h1 = document.createElement('h1')
  const p = document.createElement('p')

  h1.className = 'center-align';
  p.className = 'center-align';

  h1.innerText = 'Welcome to Flatiron Job Tracker'
  p.innerText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error inventore doloremque molestias quasi id harum consectetur! Facilis aut mollitia dolorem similique itaque aliquid quisquam explicabo? Maxime veritatis quia rem sint?'

  mainDiv().appendChild(h1);
  mainDiv().appendChild(p);

  // <h1 class="center-align">Welcome to Flatiron Job Tracker</h1>
  // <p class="center-align">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error inventore doloremque molestias quasi id harum consectetur! Facilis aut mollitia dolorem similique itaque aliquid quisquam explicabo? Maxime veritatis quia rem sint?</p>
}


/** MISC **/
const resetMainDiv = () => {
  mainDiv().innerHTML = '';
}


/** Startup **/

document.addEventListener('DOMContentLoaded', function() {
  // what do we want to do when the page loads?
  // load the home page
  loadHome();
  attachHomePageLinkEvent();
})