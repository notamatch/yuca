import yargs from 'yargs';

const OPTIONS = {
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
 * Configures yarns package.
 */
function init() {
    Object.keys(OPTIONS).forEach((key) => {
        const current = OPTIONS[key];
        yargs.alias(key, current.alias)
        .describe(key, current.describe)
        .nargs(key, current.nargs)
        .required(key, current.required);
    });
    yargs.strict(true)
    .help('h')
    .conflicts('file', 'message')
    .alias('h', 'help')
    .example('yuca --file path/to/file.json', 'Uses a json file as message')
    .example('yuca --message \'Hello world\'', 'Sends a string message');
}

/**
 * Parses args and their values.
 * @param {Array} args agument array.
 * @returns {Object} 
 */
function parseArguments() {
    console.info(yargs.argv);
    return yargs.argv;
}

export function cli() {
    const args = parseArguments();
    console.info(args.file);
}

init();
