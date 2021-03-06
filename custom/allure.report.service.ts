import * as fs from 'fs';

// import allure from 'allure-commandline';
// const allure = require('allure-commandline');
import allure = require('allure-commandline');

export default class AllureReporter {
    outputDir:string;

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
