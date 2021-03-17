const express = require('express');
const got = require('got');
const pug = require('pug');

const sheetsUrl = `https://spreadsheets.google.com/feeds/list/1Nc4lYKam9BwnJU5DCyrIV4qtPIuoYHQtkvAtYIIu3co/4/public/basic?alt=json`

const app = express();
app.set('view engine', 'pug')

const mapResponse = async (response) => {
  const parsedBody = JSON.parse(response.body);
  
  const listItems = parsedBody.feed.entry.map((entry) => `<li>${entry.title.$t}</li>`).join("");
  return `<html><body><ul>${listItems}</ul></body></html>`;
};

app.get('/', async (req, res) => {
  try {
    const result = await got(sheetsUrl).then((response => JSON.parse(response.body)));
    res.render('template', result);
  } catch(e) {
    console.error(e);
    res.status(500).send("oops");
  }
});

app.listen(3000, () => {
  console.log('server started');
});