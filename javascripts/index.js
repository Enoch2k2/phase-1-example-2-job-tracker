/* 
  Three Question Rule For Events:
    Overview: When we click on the list jobs link, we should see all of the jobs from the database.

    Question 1. When? DOMContentLoaded

    Question 2. Cause: DOMContentLoaded

    Question 3. Effect: Fetch All of the Jobs

*/



/** Global Variables **/
const baseUrl = 'http://localhost:3000';
let jobs = [];

/** Node Getters **/
const mainDiv = () => document.getElementById('main');
const homeLink = () => document.getElementById('home-link');
const createJobLink = () => document.getElementById('create-job-link');
const listJobsLink = () => document.getElementById('list-jobs-link');

/** Event Listeners **/
const attachHomePageLinkEvent = () => {
  homeLink().addEventListener('click', loadHome);
}

const attachCreateJobLinkEvent = () => {
  createJobLink().addEventListener('click', loadCreateJob);
}

const attachListJobsLinkEvent = () => {
  listJobsLink().addEventListener('click', loadListJobs);
}

/** Event Handlers **/
const loadHome = event => {
  if(event) {
    event.preventDefault();
  }
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

const loadCreateJob = event => {
  event.preventDefault();
  resetMainDiv();
  const h1 = document.createElement('h1');
  h1.innerText = 'Create Job';
  
  mainDiv().appendChild(h1);
}

const loadListJobs = event => {
  event.preventDefault();
  resetMainDiv();
  const h1 = document.createElement('h1');
  const div = document.createElement('div');

  h1.innerText = 'Job Trackings';

  div.className = 'collection';

  jobs.forEach(job => {
    const a = document.createElement('a');
    a.className = 'collection-item';
    a.innerText = job.company

    div.appendChild(a);
  })

  // <h1>Job Trackings</h1>
  // <div class="collection">
  //   <a class="collection-item">Github</a>
  //   <a class="collection-item">Amazon</a>
  //   <a class="collection-item">Facebook</a>
  //   <a class="collection-item">Twitter</a>
  //   <a class="collection-item">LinkdIn</a>
  // </div>

  mainDiv().appendChild(h1);
  mainDiv().appendChild(div);
}

/** REQUESTS **/
const loadJobs = () => {
  fetch(baseUrl + '/jobs')
    .then(resp => resp.json())
    .then(data => {
      jobs = data;
    })
}

/** MISC **/
const resetMainDiv = () => {
  mainDiv().innerHTML = '';
}


/** Startup **/

document.addEventListener('DOMContentLoaded', function() {
  // what do we want to do when the page loads?
  // load the home page
  loadJobs();
  loadHome();
  attachHomePageLinkEvent();
  attachCreateJobLinkEvent();
  attachListJobsLinkEvent();
})