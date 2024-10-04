const parseArgs = () => {

    const args = process.argv.slice(2);
    const result = [];

    for (let i = 0, l = args.length; i < l; i+=2) {
        const prop = args[i].replace('--', '');
        const val = args[i + 1];
        result.push(`${prop} is ${val}`);
    }
    console.log(result.join(', '));
};

parseArgs();