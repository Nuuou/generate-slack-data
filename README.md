# Get Messages from Slack Channel via API
Given a slackbot with the approriate OAuth scope, and added to the corresponding Channel, generate a JSON file with the channel's messages that contain files.

## Installation
1. `npm i https://github.com/Nuuou/generate-slack-data`

## Configuration
`.env` file is used. Copy `.env.example` into your project, and provide the appropriate API data for Slack.

## Use
```
const generateSlackData` = require('generate-slack-data');

// Writes a data.json file
// Returns a promise, if you needed to react.
generateSlackData();
```