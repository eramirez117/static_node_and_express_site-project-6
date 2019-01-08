 //use require method to require the express module
 const express = require('express');

 //require Json file data
 const data = require('../data/project-data.json').data;

 console.log('Json data on index.js line 5 went through!');
//Set Routes, use router constructor to create a a router instance
const router = express.Router();

//An "index" route (/) to render the "Home" page with the locals set to data.projects
//I used a code snippet from Carlos https://stackoverflow.com/a/33655662/10043628
router.get('/', (req, res) => {
    console.log('This router went through!');
    res.render('index');
    req.app.locals = data.projects;
});

//An "about" route (/about) to render the "About" page
router.get('/about', (req, res) => {
    console.log('The about page should load');
    res.render('about');
});

/* 
Dynamic "project" routes (/project or /projects) based on the id of the project
 that render a customized version of the Pug project template to show off each project.
 Which means adding data, or "locals", as an object that contains data to be passed to the Pug template.
*/
router.get('/projects:id', (req, res) => {
    res.render('project');
    req.app.locals = data.projects.id;
});

//export the router to reference it in the app.js file 
module.exports = router;
console.log('The routes were exported from index.js to app.js');