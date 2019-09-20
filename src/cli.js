import yargs from 'yargs';
import jsonfile from 'jsonfile';
import mqtt from 'mqtt';

const OPTIONS = {
    host: {
        alias: 'h',
        describe: 'Mqtt broker host',
        nargs: 1,
        required: true
    },
    port: {
        alias: 'p',
        describe: 'Mqtt broker port',
        nargs: 1,
        required: false,
        default: 1883
    },
    file: {
        alias: 'f',
        describe: 'Load json file as message. Exclusive with \'message\'',
        nargs: 1,
        required: false
    },
    message: {
        alias: 'm',
        describe: 'String message. Exclusive with \'file\'',
        nargs: 1,
        required: false
    }
}

/**
 * Parses args and their values.
 * @param {Array} args agument array.
 * @returns {Object} 
 */
function parseArguments() {
    Object.keys(OPTIONS).forEach((key) => {
        const current = OPTIONS[key];
        yargs.alias(key, current.alias)
        .describe(key, current.describe)
        .nargs(key, current.nargs)
        .required(key, current.required)
        .default(key, current.default);
    });
    yargs.strict(true)
    .conflicts('file', 'message')
    .example('yuca --file path/to/file.json', 'Uses a json file as message')
    .example('yuca --message \'Hello world\'', 'Sends a string message');
    return yargs.argv;
}

/**
 * Reads a file's content with a given path.
 * @param {String} file file name with path.
 * @returns {String} file content converted to string or raises an error if file does not exists.
 */
function getFile(file) {
    try {
        const json = jsonfile.readFileSync(file);
        if (!json) {
            throw new Error('No such file or directory');
        }
        return JSON.stringify(json);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

/**
 * Gets message from message option or file option. 
 * @param {Object} args argument object.
 * @returns {String} message.
 */
function getMessage(args) {
    if (args.message) {
        return args.message;
    }
    return getFile(args.file);
}

/**
 * Main function for entry point.
 */
export function cli() {
    const args = parseArguments();
    const message = getMessage(args);
    console.info(message);
}
