const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method}:${req.url}`;
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log(err)
        }
    });
    console.log(log);
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         pageTitle :'Maintenance Page'
//     });
    
// });
app.use(express.static( __dirname +'/public'));
hbs.registerHelper('getCurrentYear',()=> {
return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=> {
    return text.toUpperCase();
    });


app.get('/',(req,res)=>{
    // res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name: 'Richerd',
    //     likes :[
    //         'Biking','Swimming'
    //     ]
    // });
    res.render('home.hbs',{
        pageTitle :'Home Page',
        welcomePage: 'Welcome to some Website'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle :'About Page'
    });
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle :'Project Page'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        error: 'Unable to process',
    });
});

app.listen(port,()=>{
    console.log(`server is up in port ${port}`);
});
