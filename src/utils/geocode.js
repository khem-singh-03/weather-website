
const  request = require("postman-request");


const geocode = (address,callback)=>
      {
        const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoia2hlbS00MDQiLCJhIjoiY2tyNHB2dXF2MGo1OTJvbHR4YzFpb3o4aiJ9.BfbML5eGkTLXCjycCMr2aQ&limit=1" ;                                   
      
        request({url,json : true},(error,{body})=>  //  destructuring :: 1) making (url:url) as url, 2) "response" object as "body"(only argument)
        {
          if(error )
          {
            callback("unable to connect",undefined)
          }
          else if(body.features.length===0)
          {
              callback("unable to find location",undefined)
          }
          else
          {
              callback(undefined,{
                  latitude : body.features[0].center[1],
                  longitude : body.features[0].center[0],
                  location : body.features[0].place_name
            })
          }

        })
      
      }

      module.exports = geocode
      