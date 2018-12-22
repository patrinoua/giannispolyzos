const express = require('express');
const app=express();
const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const fs = require('fs');


app.engine('handlebars',hb());
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/services'));
app.use(bodyParser.urlencoded({
    extended: false
}));

const {contentEn, contentGr} =require('./webpageContent.js');

let servicesList = fs.readdirSync(__dirname+'/services');

var services = servicesList.map(function(service){
    return {
        dirName: service,
        displayName: require('./services/' + service + '/project.json' ).displayName,
        description: require('./services/' + service + '/project.json' ).description,
        tryMsg: require('./services/' + service + '/project.json' ).tryMsg,
        comment: require('./services/' + service + '/project.json' ).comment
    }
});

var servicesGr = servicesList.map(function(service){
    return {
        dirName: service,
        displayName: require('./services/' + service + '/project.json' ).displayNameGr ||"displaynamestaellliiinikkaaaa",
        description: require('./services/' + service + '/project.json' ).descriptionGr,
        tryMsg: require('./services/' + service + '/project.json' ).tryMsgGr,
        comment:require('./services/' + service + '/project.json' ).commentGr
    }
});

app.get('/',function(req,res){
    res.render('projectData',{
        content:contentEn,
        services:services,
        layout:'welcome'
    })
})

app.get('/gr',function(req,res){
    res.render('projectData',{
        content:contentGr,
        services:servicesGr,
        // projectsText:projectsTextGr,
        layout:'welcome'
    })
})
app.listen(process.env.PORT || 8080, ()=> console.log(`port 8080 is listening`) );
