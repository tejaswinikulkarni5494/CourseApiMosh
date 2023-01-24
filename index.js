const express=require("express");
const app=express();

app.use(express.json());

const courses=[
    {courseID: 101, name: 'java'},
    {courseID: 202, name: 'c++'},
    {courseID: 303, name: 'c'}
];

app.get('/',(req, res)=>{
    res.send('Hello');
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:courseID',(req,res)=>{
    const course = courses.find(c=>c.courseID===parseInt(req.params.courseID));
    if(!course) return res.status(404).send('Course Not Found');
    res.send(course);
});

app.post('/api/courses',(req, res)=>{
   /* if(!req.body.name || req.body.name.length<3 || /\d/g.test(req.body.name)){
        //400 Bad request
        console.log('Invalid Name');
        res.status(400).send('Name is not entered or Entered name is Invalid');
        return;
    }*/
    const result=validateCourse(req.body);
    if(result!=1)
    {
        res.status(400).send('Name is not entered or Entered name is Invalid');
    }
    else
    {
        const course={
            courseID: courses.length+1,
            name: req.body.name
        };
        courses.push(course);
        res.send(course);    
    }
});

app.put('/api/courses/:courseID', (req, res)=>{
    const course = courses.find(c=>c.courseID===parseInt(req.params.courseID));
    if(!course) return res.status(404).send('Course Not Found');
    const result=validateCourse(req.body);
    if(result!=1)
    {   
        if(course)
        res.status(400).send('Name is not entered or Entered name is Invalid');
    }
    else
    {
        if(course)
        course.name=req.body.name;
        res.send(course);
    }
});

app.delete('/api/courses/:courseID', (req, res)=>{
    const course = courses.find(c=>c.courseID===parseInt(req.params.courseID));
    if(!course) return res.status(404).send('Course Not Found');

    const index=courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course)
{
    if(!course.name || course.name==undefined || course.name.length<3 || /\d/g.test(course.name)){
        //400 Bad request
        console.log('Invalid Name');
        return 0;
    }
    return 1;
}
//app.put()
//app.delete()
/*
app.get('/api/courses/:courseID',(req,res)=>{
    res.send(req.params.courseID);//http://localhost:3000/api/courses/1
});


app.get('/api/courses/:year/:month',(req,res)=>{
//    res.send(req.params);//http://localhost:3000/api/courses/2000/12
    res.send(req.query);//http://localhost:3000/api/courses/2000/12?sortBy=name
});
*/

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listing on ${port}.........`);
});


/*
   const schema = {
        name: req.body.name,
        validate: function(){
            if(this.name=="" || this.name==undefined || this.name.length<3 || /\d/g.test(this.name))
            {
                return('Invalid Name');
            }
            return('valid');
        }
    };
    const result=schema.validate();
    console.log(result);
*/