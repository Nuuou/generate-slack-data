const dateFormat = require('dateformat');
const getUserInfo = require('./getUserInfo');
const getConversationHistory = require('./getConversationHistory');

const getData = async () => {
  const output = {
    messages: [],
  };

  const messages = await getConversationHistory();

  await Promise.all(messages.map(async (message) => {
    if (message?.files?.length) {
      const messageOutput = {};

      // Tag User if exists.
      // TODO: I'd hate to make this request every time. But storing this data asynchronously
      // seems to cause issues. Find a way?
      const user = await getUserInfo(message.user);
      messageOutput.user = user;

      // Timestamp.
      const timestamp = Math.floor(message.ts * 1000);
      messageOutput.timestamp = timestamp;
      messageOutput.formattedDate = dateFormat(timestamp, 'mmmm dS, yyyy');

      // Push a new message per asset (even if they're in the same post).
      await Promise.all(message.files.map(async (file) => {
        output.messages.push({
          ...messageOutput,
          image: file.url_private,
        });
      }));
    }
  }));

  return {
    messages: output.messages.sort((a, b) => b.timestamp - a.timestamp),
  };
};

module.exports = getData;
