"use strict";
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/weather");

const app = express();
//Define path for Express Config
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Adrian",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Adrian",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Adrian",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide and Address!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }
      forecast(latitude, longitude, (error, dataForecast) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send({
          forecast: dataForecast,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send("Please provide a search term");
  }
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404",
    name: "Adrian",
    errorMessage: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404",
    name: "Adrian",
    errorMessage: "Page not Found",
  });
});
app.listen(3000, () => {
  console.log("Server is up at port 3000");
});
