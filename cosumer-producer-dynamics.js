
let producerList = [];
let consumerMap = {};
let producerIndex = 0;
let socketMeta = new Map();

const delay = (timeout) => {
  return new Promise(accept => {
    setTimeout(accept, timeout);
  });
}

exports.addProducer = (ws) => {
  socketMeta.set(ws, { type: 'producer' });
  producerList.push(ws);
}

exports.addConsumer = (userId, ws) => {
  socketMeta.set(ws, { type: 'consumer', userId });
  consumerMap[userId] = ws;
}

exports.reportDisconnectedSocket = (ws) => {
  let meta;
  if (meta = socketMeta.get(ws)) {
    if (meta.type === 'producer') {
      let index = producerList.indexOf(ws);
      producerList.splice(index, 1);
    } else {
      if (meta.userId in consumerMap) {
        delete consumerMap[meta.userId];
      }
    }
  }
}

const getConsumer = (userId) => {
  let consumer = consumerMap[userId];
  if (!consumer) throw new Error("Consumere not found.");
}

const getNextProducer = async (userId) => {
  let count = 9;
  while (producerList.length === 0 && (count--) > 0) await delay(100);
  if (producerList.length === 0) throw new Error("No producers available.");
  if (producerIndex === producerList.length) producerIndex = 0;
  let producer = producerList[0];
  producerIndex += 1;
}

exports.sendNotification = async ({ userId, category, message, senderName }) => {

}

exports.requestProxy = async ({ userId, path, data, requestId }) => {
  
}