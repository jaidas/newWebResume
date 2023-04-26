const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
const pdf = require("html-pdf");
const puppeteer = require("puppeteer");

const app = express();
const options = { format: "Letter" };

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/generate-pdf", (req, res) => {
  // Generate the PDF from the current webpage
  pdf
    .create(
      "<html><body>" + window.document.body.innerHTML + "</body></html>",
      options
    )
    .toBuffer((err, buffer) => {
      if (err) {
        console.error(err);
        res.status(500).send(err.message);
      } else {
        // Set the response headers for the PDF file
        res.setHeader("Content-disposition", "attachment; filename=resume.pdf");
        res.setHeader("Content-type", "application/pdf");
        // Send the PDF file as the response
        res.send(buffer);
      }
    });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000!");
});
