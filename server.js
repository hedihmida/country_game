const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require("request");
const flag_code = require('./flag.json');
const {pickRandomKey} = require('./randomFunc')
const names = require('./flag.json')


const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));


app.set('first_country_name',"Tunisia");
app.set('first_country_size',163610);
app.set('first_country_flag','https://flagcdn.com/' + flag_code[app.get('first_country_name').toString()] +".svg");

app.route("/")
.get((req, res)=>{
  
  app.set('second_country_name',pickRandomKey(names));
  app.set('second_country_flag','https://flagcdn.com/' + flag_code[app.get('second_country_name').toString()] +".svg");
    request.get({
        url: `https://api.api-ninjas.com/v1/country?name=${app.get("second_country_name")}`,
        headers: {
          'X-Api-Key': 'iv6pkvglsN7VSiaMBDcVgA==wE6ddfsnsDdKrMmU'
        },
      }, function(error, response, body) {
        if(error) return console.error('Request failed:', error);
        else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
        else {
          const data = JSON.parse(body);
          app.set('second_country_size',data[0]?.surface_area);
          res.render("game",{
            flag1 : app.get('first_country_flag'),
            name1 : app.get("first_country_name"),
            size1 : app.get("first_country_size"),
            flag2 : app.get('second_country_flag'),
            name2 : app.get("second_country_name"),
            size2 : app.get("second_country_size")
          });
        }

      });
      
})

app.route("/guess")
.get((req,res)=>{
  app.set('second_country_name',pickRandomKey(names));
  app.set('second_country_flag','https://flagcdn.com/' + flag_code[app.get('second_country_name').toString()] +".svg");
request.get({
  url: `https://api.api-ninjas.com/v1/country?name=${app.get("second_country_name")}`,
  headers: {
    'X-Api-Key': 'iv6pkvglsN7VSiaMBDcVgA==wE6ddfsnsDdKrMmU'
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else {
    const data = JSON.parse(body);
    app.set('second_country_size',data[0]?.surface_area) -"N/A";
    res.json({
      name: app.get('second_country_name'),
      size:  app.get('second_country_size'),
      flag: app.get('second_country_flag')
      });
    
  }

});


})




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
