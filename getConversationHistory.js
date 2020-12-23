require('dotenv').config();
const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
const conversationId = process.env.SLACK_CONVERSATION_ID;

const getConversationHistory = async () => {
  let messages = [];
  let cursor = null;

  do {
    // eslint-disable-next-line no-await-in-loop
    const res = await web.conversations.history({
      channel: conversationId,
      limit: 100,
      cursor,
    });
    if (res.messages) {
      messages = messages.concat(res.messages);
    }
    if (res.has_more) {
      cursor = res.response_metadata.next_cursor;
    }
  } while (cursor);

  return messages;
};

module.exports = getConversationHistory;
