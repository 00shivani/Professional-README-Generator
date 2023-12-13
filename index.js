const inquirer = require("inquirer");
const fs = require("fs");

function generateBadge(license) {
  const licenseBadges = {
    MIT: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    Apache: "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
    IBM: "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)",
    Mozilla: "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
    Unlicense: "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)"
  };

  return licenseBadges[license] || licenseBadges.Unlicense;
}

function writeReadme(fileName, data) {
  const fileContent = `
${data.author}'s README

# ${data.projectTitle}

${generateBadge(data.license)}

## Table of Contents

* [Description](#description)
* [Installation](#installation)
* [Usage Information](#usage-information)
* [Contribution Guidelines](#contribution-guidelines)
* [Test Instructions](#test-instructions)
* [License](#license)
* [Questions](#questions)

## Description

${data.projectDescription}

## Installation

${data.installation}

## Usage Information

${data.usage}

## Contribution Guidelines

${data.contribution}

## Test Instructions

${data.test}

## License

NOTICE: This application is covered under the ${data.license}

## Questions

Have additional questions? Click the links below to reach me through my GitHub account or Email address.

[Link to GitHub](https://github.com/${data.github})
<a href="mailto:${data.email}">${data.email}</a>
`;

  fs.writeFile(fileName, fileContent, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("README file successfully generated!");
    }
  });
}

function initializeApp() {
  inquirer
    .prompt([
      { type: "input", message: "What is your name?", name: "author" },
      { type: "input", message: "What is the title of your project?", name: "projectTitle" },
      { type: "input", message: "Add the description of your project:", name: "projectDescription" },
      { type: "input", message: "Add the installation instructions of your project:", name: "installation" },
      { type: "input", message: "Add the usage information of your project:", name: "usage" },
      { type: "input", message: "Add the contribution guidelines of your project:", name: "contribution" },
      { type: "input", message: "Add the test instructions of your project:", name: "test" },
      {
        type: "list",
        message: "Select the type of license you would like for your project:",
        choices: ["MIT", "Apache", "IBM", "Mozilla", "Unlicense"],
        name: "license",
      },
      { type: "input", message: "What is your GitHub handle?", name: "github" },
      { type: "input", message: "What is your email?", name: "email" },
    ])
    .then((data) => {
      writeReadme("sample-README.md", data);
    });
}

initializeApp();
