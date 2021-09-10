const fs = require('fs');
const util = require('util');

const appendToFile = util.promisify(fs.appendFile);
const readFile = util.promisify(fs.readFile);

const ws3SensorFileNameCsv = `WS-0003_${new Date().toDateString()}_sensor_data.csv`;

const ws4SensorFileNameCsv = `WS-0004_${new Date().toDateString()}_sensor_data.csv`;

class FileManager {
  static async appendContentToFile (content, file) {
  try {
    await appendToFile(content, file);
  } catch (error) {
    console.log(error)
  }
}


static async readFile (file) {
  try {
    const content = await readFile(file);
  return content;
  } catch (error) {
    //console.log(error)
  }

}

static async writeToCsv (processedMessage, fileName) {
    const content = await this.readFile(fileName)
    
    if (content) {
      await this.appendContentToFile(fileName, `\n${processedMessage.sensor_id}, ${processedMessage.model}, ${processedMessage.payload}`)
    } else {
       await this.appendContentToFile(fileName, `sensor_id, model, payload\n${processedMessage.sensor_id}, ${processedMessage.model}, ${processedMessage.payload}`)
    }
}



}

module.exports = {
  FileManager,
  ws3SensorFileNameCsv,
  ws4SensorFileNameCsv
};