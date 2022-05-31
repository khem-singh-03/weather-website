const express = require("express");
const path = require('path');
const hbs = require('hbs');
const geocode = require ('./utils/geocode');
const forecast = require('./utils/forecast');

   //console.log(__dirname);
        //console.log(path.join(__dirname,"../public"));
        const app = express();
   const port = process.env.PORT || 3000
// Define paths for express config
const publicDirectoryPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlerbars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title : "Weather",
        name: "khem"

    });
})
app.get('/about',(req,res)=>{
 res.render('about',{
     title: "About me",
     name : "Khem"
 });
})

app.get('/help',(req,res)=>{
    res.render('help',{
      HelpText: "This is some helpful text.",
      title : "Help",
      name : "Khem"

    });
   })

  app.get("/products",(req,res)=>{


       if(!req.query.search)
       {

       return  res.send({
            error : "Provide a search term"
        })
       }
    console.log(req.query.search);
      res.send({
          products : []
      })
  })



//app.get('',(req,res)=>{
  //  res.send('<h1>Weather</h1>');

 // })

   /*  app.get('/help',(req,res)=>{
    res.send([{
        name:"Khem",
        age : 20
    },
    {
        name : "Jack",
        age : 21
    }

]);

})
app.get('/about',(req,res)=>{
    res.send('<h1>about</h1>');

})

*/

app.get('/weather',(req,res)=>{

    if(!req.query.address){

      return  res.send({
            error : "Provide an address"
        })
    }

geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
      if(error)
      {
          return res.send({error });  // destructuring
      }
      
      forecast(latitude,longitude,(error,forecastDate)=>{
          if(error)
          {
              return res.send(error);
          }
          res.send({
              forecast : forecastDate,
              location,
              address : req.query.address
          })
      })



    })


 /*   res.send({
        forecast : "It is raining",
        location : "Mandi",
        address : req.query.address
    });
    */

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Khem',
        errorMessage : "Help article is not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Khem',
        errorMessage : "Page is not found"
    })
})

app.listen (port,()=>{
    console.log("Server is up on port "+port);
})