require('dotenv').config();
const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

const getUserInfo = async (userId) => {
  const res = await web.users.info({
    user: userId,
  });

  if (res.ok) {
    return {
      id: res.user.id,
      displayName: res.user.profile.display_name_normalized,
    };
  }

  return null;
};

module.exports = getUserInfo;
