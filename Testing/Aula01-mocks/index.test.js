const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection);

    }
    {
        const filePath = './mocks/fourItems-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection);
    }
    {
        const filePath = './mocks/threeItems-valid.csv';
        const result = await File.csvToJson(filePath);
        const expected = [
            {
              "id": 123,
              "name": "Gabriel Lima",
              "profession": "Javascript Student",
              "age": 20
            },
            {
              "id": 456,
              "name": "Angelida Gato",
              "profession": "Gato Branco",
              "age": 1
            },
            {
              "id": 789,
              "name": "Yumi pretinha",
              "profession": "Gato preto",
              "age": 2
            }
        ]
        console.log(result);

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})()