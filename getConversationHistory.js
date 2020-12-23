require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const dateFormat = require('dateformat');
const getUserInfo = require('./getUserInfo');

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
const conversationId = process.env.SLACK_CONVERSATION_ID;

const getConversationHistory = async () => {
  let messages = [];
  let pagination = false;
  let cursor = null;

  do {
    const res = await web.conversations.history({
      channel: conversationId,
      limit: 100,
      cursor,
    });
    if (res.messages) {
      messages = messages.concat(res.messages);
    }
    if (res.has_more) {
      pagination = res.response_metadata.next_cursor;
    }
  } while (pagination);

  return messages;
};

module.exports = getConversationHistory;