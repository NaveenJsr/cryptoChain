const PubNub = require('pubnub');
require('dotenv').config();

// Replace 'myPublishKey', 'mySubscribeKey', and 'myUniqueUserId' with your actual keys and user ID
const credentials = {
  publishKey: process.env.PUBNUB_PUBLICKEY,
  subscribeKey: process.env.PUBNUB_PRIVATEKEY,
  userId: process.env.PUBNUB_USERID,
};

const CHANNELS = {
  TEST: 'TEST',
};

class PubSub {
  constructor() {
    this.pubnub = new PubNub(credentials);

    this.pubnub.addListener(this.listener()); // Use the listener method to add the listener

    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
  }

  listener() {
    return {
      message: (messageObject) => {
        const { channel, message } = messageObject;
        console.log(`Message received. Channel: ${channel}. Message: ${message}.`);
      },
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message }, (status, response) => {
      if (status.error) {
        console.error('Publish failed:', status);
      } else {
        console.log('Message published:', response);
      }
    });
  }
}

const testPubSub = new PubSub();
testPubSub.publish({ channel: CHANNELS.TEST, message: 'hello naveen' });

module.exports = PubSub;
