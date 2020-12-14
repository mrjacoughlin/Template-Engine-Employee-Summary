const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function appMenu() {
  function createManager() {
    console.log("Please Build Your Team");
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "What Is Your Manager's Name",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please Enter At Least One Character";
          },
        },
        {
          type: "input",
          name: "manager Id",
          message: "What's your Manager's ID?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "PLease Enter A Positive Number Greater Than Zero";
          },
        },
        {
          type: "input",
          name: "managerEmail",
          message: "What Is Your Manager's Email?",
          validate: (answer) => {
            const pass = answer.match(/|S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return " PLease Enter A Valid Email Address";
          },
        },
        {
          type: "input",
          name: "MangerOfficeNumber",
          message: "What Is Your Manager's Office Number?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "PLease Enter A Positive Number Greater Than Zero";
          },
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }
  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which Type Of Team Member Would You Like To Add?",
          choices: [
            "Engineer",
            "Intern",
            "i Dont Want To Add Any More Members",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What Is Your Engineer's Name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "PLease Enter One Character";
          },
        },
        {
          type: "input",
          name: "engineerId",
          message: "What's Your Engineer Id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return "This Id Has Been Taken.Please Enter A Different Number";
              } else {
                return true;
              }
            }
            return "Please Enter A Positive Number";
          },
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "What's Your Engineer's Email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please Enter A Valid Email Address";
          },
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "What's Your Engineer's Github Username?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "PLease Enter One Character";
          },
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub
        );
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);
        createTeam();
      });
  }
  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What Is Your Interns's Name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "PLease Enter One Character";
          },
        },
        {
          type: "input",
          name: "internId",
          message: "What's Your Intern Id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return "This Id Has Been Taken. Please Enter A Different Number";
              } else {
                return true;
              }
            }
            return "Please Enter A Positive Number";
          },
        },
        {
          type: "input",
          name: "internEmail",
          message: "What's Your Intern's Email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please Enter A Valid Email Address";
          },
        },
        {
          type: "input",
          name: "internSchool",
          message: "What's Your Intern's School?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "PLease Enter One Character";
          },
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamMembers.push(intern);
        idArray.push(answers.internId);
        createTeam();
      });
  }
  function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }
  createManager();
}

appMenu();
