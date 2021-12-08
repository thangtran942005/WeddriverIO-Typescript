import * as fs from 'fs';

const allure = require('allure-commandline');

export default class AllureReporter {
    constructor(options) {
        this.outputDir = options.outputDir || `${__dirname  }/allure-report`;
    }

    onPrepare() {
        fs.rmdirSync('./allure-results', { recursive: true });
        fs.rmdirSync(this.outputDir, { recursive: true });
        fs.rmdirSync('./logs', { recursive: true });
    }

    afterSession() {
        const generation = allure([
            'generate',
            'allure-results',
            '--clean',
            '-o',
            this.outputDir
        ]);
        return new Promise<void>((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(new Error('Could not generate Allure report')),
                60000
            );

            generation.on('exit', () => {
                clearTimeout(generationTimeout);
                // console.log('Allure report successfully generated');
                resolve();
            });
        });
    }

    onComplete() {
        allure(['open', this.outputDir]);
    }
}
