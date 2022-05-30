const  request = require("postman-request");


const forecast = (latitude,longitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=9b98c5ed5ab7c348a48f827456728d1b&query="+ latitude +","+longitude+"&units=f";


    request({url,json : true},(error,{body})=>      //  destructuring :: 1) making (url:url) as url, 2) "response" object as "body"(only argument)
        {
          if(error )
          {
            callback("unable to connect",undefined)
          }
          else if(body.error)
          {
              callback("unable to find location",undefined)
          }
          else
          {
              callback(undefined, body.current.weather_descriptions[0]+". It is currently " + body.current.temperature+ " degrees out and it feels like "  
              +  body.current.feelslike + " degrees out" )
          }

        })



}

module.exports  = forecast