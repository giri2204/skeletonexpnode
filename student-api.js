const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app= express()
const port=3000

let students = [
    {
        "studentName": "Giri",
        "studentCourse":"IT",
        "studentID": 21,
        "studentGrade": "A",
        "studentPhone" : 7092241710,
        "studentLocation": "Royapuram"
    },
    {
        "studentName": "Pradip",
        "studentCourse":"IT",
        "studentID": 21,
        "studentGrade": "A",
        "studentPhone" : 7087789890,
        "studentLocation": "Villivakkam"
    }
    

];


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/student',(req,res)=> {
  res.json(students);
});



app.get('/student/:studentID',(req,res)=>{

    const studentID = req.params.studentID;

    for(let student of students){
        if(student.studentID === studentID){
            res.json(student);
            return ;
        }
    }
    res.status(404).send('Student not found');
});

app.post('/student',(req,res) => {
    const student = req.body;
    students.push(student);

    res.send('Student is added to the database');
});

app.put('/student/:studentID' , (req,res) => {
    const studentID = req.params.studentID;
   const newstudent = req.body;

   for(let i=0; i< students.length; i++)
   {
       let student = students[i]

       if(student.studentID === studentID)
       { student[i] = newstudent;}
   }

    res.send('Student is edited');
});


app.delete('/student/:studentID' , (req,res) => {
    const studentID = req.params.studentID;

    students = students.filter(i => {
     if(i.studentID !== studentID) {
         return true;
     }
     return false;
 });

    res.send('Student is deleted');
});




app.listen(port, () =>
console.log(`Hello world listening on port ${port}!`
));