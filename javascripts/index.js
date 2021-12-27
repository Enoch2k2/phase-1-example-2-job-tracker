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
  const h1 = createH1('Create Job');
  const form = document.createElement('form');
  const row1 = createRow();
  const row2 = createRow();

  const div1 = createTextField('company-name', 'Company', 's6');
  const div2 = createTextField('job-name', 'Job Name', 's6');

  const div3 = createSelectField('application-status', 's3', 'Application Status', 'Application', ["Not Filled Out", "Filled Out", "Submitted"])
  const div4 = createSelectField('first-interview-status','s3', 'First Interview Status', 'First Interview', ["N/A", "Scheduled", "Completed"])
  const div5 = createSelectField('second-interview-status','s3', 'Second Interview Status', 'Second Interview', ["N/A", "Scheduled", "Completed"])
  const div6 = createSelectField('third-interview-status','s3', 'Third Interview Status', 'Third Interview', ["N/A", "Scheduled", "Completed"])

  row1.appendChild(div1);
  row1.appendChild(div2);

  row2.appendChild(div3)
  row2.appendChild(div4)
  row2.appendChild(div5)
  row2.appendChild(div6)

  form.appendChild(row1);
  form.appendChild(row2);
  
  mainDiv().appendChild(h1);
  mainDiv().appendChild(form);

  $(document).ready(function(){
    $('select').formSelect();
  });
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


/** NODE Creators **/
const createRow = () => {
  const div = document.createElement('div');
  div.className = "row"
  return div;
}

const createH1 = text => {
  const h1 = document.createElement('h1');
  h1.innerText = text;
  return h1;
}

const createFormCol = colSize => {
  const div = document.createElement('div');
  div.className = 'input-field col ' + colSize;
  return div;
}

const createTextField = (id, labelText, colSize) => {
  const div = createFormCol(colSize);
  const label = document.createElement('label');
  const input = document.createElement('input');

  input.setAttribute('type', 'text');
  input.setAttribute('id', id);

  label.setAttribute('for', id);
  label.innerText = labelText;

  div.appendChild(input);
  div.appendChild(label);

  return div;
}

const createSelectField = (id, colSize, placeholder, labelText, options=[]) => {
  const div = createFormCol(colSize);
  const select = document.createElement('select');
  const option = document.createElement('option');
  const label = document.createElement('label');

  select.setAttribute('id', id);
  option.setAttribute('disabled', true);
  option.setAttribute('selected', true);
  option.value = '';
  option.innerText = placeholder;
  label.setAttribute('id', id);
  label.innerText = labelText;
  
  select.appendChild(option);

  options.forEach( optionText => {
    const option = document.createElement('option');
    option.innerText = optionText;
    option.value = optionText;
    select.appendChild(option);
  })

  div.appendChild(select);
  div.appendChild(label);

  return div;
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