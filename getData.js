require('dotenv').config();
const dateFormat = require('dateformat');
const getUserInfo = require('./getUserInfo');
const getConversationHistory = require('./getConversationHistory');


const getData = async () => {
  const output = {
    messages: [],
    users: [],
  };

  const messages = await getConversationHistory();

  for await (message of messages) {
    if (message?.files?.length) {
      const messageOutput = {};

      // Tag User if exists.
      let user = output.users.find((user) => user.id === message.user);

      // Fetch user and tag if hasn't already been fetched.
      if (typeof user === 'undefined') {
        user = await getUserInfo(message.user);
        output.users.push(user);
      }
      messageOutput.user = user;

      // Timestamp.
      const timestamp = Math.floor(message.ts * 1000);
      messageOutput.timestamp = timestamp;
      messageOutput.formattedDate = dateFormat(timestamp, 'mmmm dS, yyyy');

      // Push a new message per asset (even if they're in the same post).
      for await (file of message.files) {
        output.messages.push({
          ...messageOutput,
          image: file.url_private,
        });
      }
    }
  }

  return output;
};

module.exports = getData;