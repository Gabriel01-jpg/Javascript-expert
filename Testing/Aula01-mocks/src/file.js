const { error } = require('./constants');
const User = require('./user')
const { readFile } = require('fs/promises');

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ["id", "name", "profession", "age"]
}

class File {

    static async csvToJson(filePath){
        const content = await File.getFileContent(filePath);
        const validation = File.isValid(content);
        if(!validation.valid) throw new Error(validation.error)

        const users = await File.parseCSVToJson(content);
        return users;
    }

    static async getFileContent(filePath){
        return (await readFile(filePath)).toString("utf-8");
    }

    static isValid(csvString, options = DEFAULT_OPTIONS){
        const [header, ...fileWithoutHeader] = csvString.split('\n');
        const isHeaderValid = header.trim() === options.fields.join(',').trim();
        if(!isHeaderValid){
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        const isContentLenghtAccepted = (
            fileWithoutHeader.length > 0 && fileWithoutHeader.length <= options.maxLines
        )

        if(!isContentLenghtAccepted){
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }

        return { valid: true }



    }

    static parseCSVToJson(csvString){
        const lines = csvString.split('\r\n');
        // remove o primeiro item e joga na variável
        const firstLine = lines.shift();
        const header = firstLine.split(',')

        const users = lines.map(line => {
            const columns = line.split(',')
            let user = {}

            for(const index in columns){
                user[header[index]] = columns[index]
            }
            return new User(user)
        })

        return users;
    }
}

module.exports = File;