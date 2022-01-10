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
const companyName = () => document.getElementById('company-name');
const jobName = () => document.getElementById('job-name');
const applicationStatus = () => document.getElementById('application-status');
const firstInterviewStatus = () => document.getElementById('first-interview-status');
const secondInterviewStatus = () => document.getElementById('second-interview-status');
const thirdInterviewStatus = () => document.getElementById('third-interview-status');
const companyNameModal = () => document.getElementById('company-name-modal');
const jobTitleModal = () => document.getElementById('job-title-modal');
const applicationStatusModal = () => document.getElementById('application-status-modal');
const firstInterviewModal = () => document.getElementById('first-interview-modal');
const secondInterviewModal = () => document.getElementById('second-interview-modal');
const thirdInterviewModal = () => document.getElementById('third-interview-modal');
const modalFooter = () => document.getElementById('modal-footer');


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

const populateModal = event => {
  event.preventDefault();
  const job = jobs.find(job => event.target.innerText === job.company)
  companyNameModal().innerText = job.company;
  jobTitleModal().innerText = job.title;
  applicationStatusModal().innerText = `Application Status: ${ job.application }`;
  firstInterviewModal().innerText = `First Interview: ${ job.first_interview }`;
  secondInterviewModal().innerText = `Second Interview: ${ job.second_interview }`;
  thirdInterviewModal().innerText = `Third Interview: ${ job.third_interview }`;
  
  const deleteJob = event => {
    // delete fetch
    fetch(baseUrl + '/jobs/' + job.id, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        jobs = jobs.filter(j => j.id !== job.id);
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
        instances[0].close();
        loadListJobs();
      })
  }
  modalFooter().innerHTML = ''
  const button = document.createElement('button');
  button.innerText = 'Delete'
  button.className = 'btn'
  button.addEventListener('click', deleteJob);
  modalFooter().appendChild(button);
}

const submitForm = event => {
  event.preventDefault();

  const jsonObject = {
    company: companyName().value,
    title: jobName().value,
    application: applicationStatus().value,
    first_interview: firstInterviewStatus().value,
    second_interview: secondInterviewStatus().value,
    third_interview: thirdInterviewStatus().value
  }

  fetch(baseUrl + '/jobs', {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonObject)
  })
    .then(resp => resp.json())
    .then(data => {
      jobs.push(data);
      loadListJobs()
    })
}

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

  const submit = document.createElement('input');
  submit.setAttribute('type', 'submit');
  submit.setAttribute('id', 'submit-form');
  submit.className = 'btn indigo darken-4';
  
  row1.appendChild(div1);
  row1.appendChild(div2);
  
  row2.appendChild(div3)
  row2.appendChild(div4)
  row2.appendChild(div5)
  row2.appendChild(div6)
  
  form.appendChild(row1);
  form.appendChild(row2);
  form.appendChild(submit);
  form.addEventListener('submit', submitForm);
  
  mainDiv().appendChild(h1);
  mainDiv().appendChild(form);

  
  $(document).ready(function(){
    $('select').formSelect();
  });
}

const loadListJobs = event => {
  if(event) {
    event.preventDefault();
  }
  resetMainDiv();
  const h1 = document.createElement('h1');
  const div = document.createElement('div');

  h1.innerText = 'Job Trackings';

  div.className = 'collection';

  jobs.forEach(job => {
    const a = document.createElement('a');
    a.setAttribute('href', "#modal1")
    a.className = 'collection-item modal-trigger';
    a.innerText = job.company
    a.addEventListener('click', populateModal)

    div.appendChild(a);
  })
  // var elems = document.querySelectorAll('.modal');
  // var instances = M.Modal.init(elems, {
  //   onOpenEnd: populateModal
  // });
  $('.modal').modal();

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