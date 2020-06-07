const express = require('express');
const app = express();

const Joi = require('joi');

app.use(express.json());
const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:2, name:'course3'},
]
app.get('/', (req, res)=>{
    res.send('HelloWorld');
});


app.get('/api/courses', (req, res)=>{
   
    res.send(courses);
});

//PORT
const port = process.env.Port ||3000;
app.listen(port, ()=>{console.log(`Listening on port ${port}..`)});

// api/courses/1

app.get('/api/courses/:id', (req, res)=>{
    const course = courses.find(c =>c.id ===parseInt(req.params.id));
    if(!course)
    res.status(404).send('The course wasnt found.');
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res)=>{
    res.send(JSON.stringify(req.query));
});

app.post('/api/courses', (req, res)=>{
   
    const result = validateCourse(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
    const course = {
        id:courses.length+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res)=>{
    const course = courses.find(c =>c.id ===parseInt(req.params.id));
    if(!course)
    res.status(404).send('The course wasnt found.');
    const result = validateCourse(req.body);
    if(result.error){
        //400 Bad Reqauest
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    req.send(course);
});


function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}