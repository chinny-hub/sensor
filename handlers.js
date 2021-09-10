class Handler {
  static trim (message) {
    return {
      sensor_id: message.sensor_id,
      model: message.model,
      payload: message.payload.trim(),
    };
  }

  static padToMultiple (message) {
    const multiple = 5;
    let refinedPayload = message.payload;
    for (let index = 0; index < multiple; index++) {
      refinedPayload += '#';
    }
    return {
      sensor_id: message.sensor_id,
      model: message.model,
      payload: refinedPayload,
    };
  }

  static getTimestamp () {
    const seconds = new Date().getTime() / 1000;
    return Math.round(seconds);
  }

  static addTimestamp (message) {
    const modifiedPayload = `${message.payload}_${this.getTimestamp()}`;
    const result = {
      sensor_id: message.sensor_id,
      model: message.model,
      payload: modifiedPayload
   };
   return result;
  }
};

module.exports = Handler;
