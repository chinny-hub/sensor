const readline = require('readline');
const Handler = require('./handlers');
const { FileManager, ws3SensorFileNameCsv, ws4SensorFileNameCsv } = require('./fileManager');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Create a promise based version of rl.question so it can be used in async functions
const question = (str) => new Promise(resolve => rl.question(str, resolve));

class SensorService {
  static async checkModel (message) {
      switch (message.model)  {
        case 'WS-0001':
          console.log(message);
          this.showPrompt();
          break;
        case 'WS-0002':
          const result = Handler.padToMultiple(message);
          console.log(result);
          this.showPrompt();
          break;
        case 'WS-0003':
          const trimmedPayloadInMessage = Handler.trim(message);
          const paddedPayloadInMessage = Handler.padToMultiple(trimmedPayloadInMessage);
          await FileManager.writeToCsv(paddedPayloadInMessage, ws3SensorFileNameCsv);
          this.showPrompt();
          break;
        case 'WS-0004':
          const trimmedPayloadInMessage2 = Handler.trim(message);
          const paddedPayloadInMessage2 = Handler.padToMultiple(trimmedPayloadInMessage2);
          const timestampedPayloadInMessage = Handler.addTimestamp(paddedPayloadInMessage2);
          console.log(timestampedPayloadInMessage);
          await FileManager.writeToCsv(timestampedPayloadInMessage, ws4SensorFileNameCsv);
          this.showPrompt();
          break;  
        default:
          console.log('The sensor model entered is not registered on this system\n');
          this.showPrompt();
      }
    }
  static async validateMessage (message) {
    try { 
      const result = JSON.parse(message);
      const messageKeys = Object.keys(result);
      if (messageKeys.length !== 3) {
        console.log('Incomplete or unexpected object properties\n');
        return this.showPrompt();
      }
      if (!messageKeys.includes('sensor_id')) {
        console.log('Sensor ID is required\n');
        return this.showPrompt();
      }
      if (!messageKeys.includes('model')) {
        console.log('Model is required\n');
        return this.showPrompt();
      }
      if (!messageKeys.includes('payload')) {
        console.log('Payload is required\n');
        return this.showPrompt();
      }
      await this.checkModel(result);
    } catch (error) {
      console.log('Please supply an object\n');
      return this.showPrompt();
    }
  }
    
    
  static async showPrompt () {
    try {
      const answer = await question('Please enter a sensor message\n');
      await this.validateMessage(answer);
    } catch (error) {
      console.log(error);
    }
  }
};

SensorService.showPrompt();
