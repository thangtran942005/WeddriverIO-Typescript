const WDIOReporter = require('@wdio/reporter').default

module.exports = class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * make reporter to write to the output stream by default
         */
        options = Object.assign(options, { stdout: true, outputDir: 'custom-report1', stdin: 'abc'})
        super(options)
    }
    onTestStart() {
        this.start = Date.now()
        // this.write(`Start test at: ${this.start.toString()}\n`)
    }

    onTestEnd(test) {
        this.write(` Execute: ${test.title}  *** Duration: ${(Date.now() - this.start).toString()} ms *** Status: ${test.state}\n`)
        
    }

    // onTestPass(test) {
    //     this.write(`Congratulations! Your test "${test.title}" passed 👏\n`)
    // }

    // onTestFail(test) {
    //     this.write(`Sorry! Your test "${test.title}" failed\n`)
    // }

    onRunnerStart() {
        this.write('------ RunnerStart ------\n')
    }

    onRunnerEnd() {
        this.write('------ RunnerEnd ------\n')
    }
}