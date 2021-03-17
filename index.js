const express = require('express');
const got = require('got');

const sheetsUrl = `https://spreadsheets.google.com/feeds/list/1Nc4lYKam9BwnJU5DCyrIV4qtPIuoYHQtkvAtYIIu3co/4/public/basic?alt=json`

const app = express();

const mapResponse = async (response) => {
  const parsedBody = JSON.parse(response.body);
  return parsedBody.feed.entry.map((entry) => entry.title.$t);
};

app.get('/', async (req, res) => {
  try {
    const result = await got(sheetsUrl).then(mapResponse);
    res.send(JSON.stringify(result));
  } catch(e) {
    console.error(e);
    res.status(500).send("oops");
  }
});

app.listen(3000, () => {
  console.log('server started');
});