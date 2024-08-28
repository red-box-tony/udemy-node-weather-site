const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./Utils/geocode");
const forecast = require("./Utils/forecast");

// console.log(__dirname); //path current file exists in
// console.log(__filename); //path & filename of the current file
// console.log(path.join(__dirname, "../public")); //use path to get to parent directories in the path

const app = express();

const port = process.env.PORT || 3000;

// Define paths for express config
const viewsPath = path.join(__dirname, "../templates/views"); //set variable to templates location
const partialsPath = path.join(__dirname, "../templates/partials"); //set variable to partials location

//Setup handlebars engine and views location
//hbs changes aren't picked up by nodemon
//cmd 'nodemon src/app.js -e js, hbs' instructs nodemon to listen for changes in js and hbs files
//so the server will restart on a hbs file change also
app.set("views", viewsPath); // set the views to the templates path
app.set("view engine", "hbs"); //hbs easy way to use handlebars - sets up hbs in app
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(__dirname, "../public"))); //tell express to use a static folder

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Myself",
  }); //renders a dynamic hbs file
});

app.get("/about", (req, res) => {
  //route to about
  res.render("about", {
    title: "About",
    name: "Me",
  }); //renders a dynamic hbs file
});

app.get("/help", (req, res) => {
  //route to help
  res.render("help", {
    title: "Help me",
    content: "fall asleep again",
    name: "Me",
  }); //renders a dynamic hbs file
});

//express detects, parses and renders html
// app.get("", (req, res) => {
//   res.send("<h1>Hello express!</h1>");
// });

//express parses returned json automaically and renders in browser
// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Tom",
//     },
//     {
//       name: "Roger",
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "An address must be provided",
    });
  }
  const address = req.query.address;

  geocode(address, (error, { longitude, latitude, address } = {}) => {
    if (error) {
      return res.send({ error });
    }
    // console.log(`${address}. Longitude: ${longitude} - Latitude ${latitude}`);
    forecast(
      longitude,
      latitude,
      address,
      (error, { address, description, temperature, feelslike }) => {
        if (error) {
          return res.send({ error });
        }
        // console.log(
        //   `Weather for ${address} is currently ${temperature} degrees. It feels like ${feelslike} degrees`
        // );
        res.send({
          forecast: description,
          temperature: temperature,
          feelslike: feelslike,
          description: description,
          address,
        });
      }
    );
  });
});

//example of using queryString to validate query string key values
// app.get("/products", (req, res) => {
//   // console.log(req.query); //print querystring entered into /products url - key value pairs as object
//   if (!req.query.search) {
//     return res.send({
//       error: "You must provide a search term",
//     });
//   }
//   console.log(req.query.search);
//   res.send({
//     products: [],
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("404error", {
    title: "Missing file",
    errorMessage: "Help article not found!",
    name: "myself",
  });
});

// 404 error must be last because express searches fpr route from top down
app.get("*", (req, res) => {
  res.render("404error", {
    title: "404",
    errorMessage: "404 error - page not found!",
    name: "myself",
  });
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
