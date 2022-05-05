const path = require("path")

const stepDefinitionsPath = path.resolve(process.cwd(), "./src/step-definitions")
const outputFolder = path.resolve(process.cwd(), "../../cyreport/cucumber-json")

console.log(path.resolve(process.cwd(), "./src/integration"))

module.exports = {

  nonGlobalStepDefinitions: true,
  stepDefinitions: stepDefinitionsPath,
  cucumberJson: {
    generate: true,
    outputFolder: outputFolder,
    filePrefix: "",
    fileSuffix: ".cucumber",
  },
}