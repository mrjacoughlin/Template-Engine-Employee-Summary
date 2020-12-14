const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { measureMemory } = require("vm");

const teamMember =[]
const idArray =[]

function appMenu(){

  function createManager(){
    console.log("Please Build Your Team")
    inquire.prompt([
      {
        type:"input",
        name: "managerName",
        message: "What Is Your Managers Name",
        validate: answer =>{
          if (answer !== ""){
            return true;
          }
          return "Please Enter At Least One Character";
        }
      },
      {
        type:"input",
        name:"manager Id",
        message:"What's your Manager's ID?",
        validate: answer =>{
          const pass =answer.match(
            /^[1-9]\d*$/
          );
          if (pass){
            return true;
          }       
          return "PLease Enter A Positive Number Greater Than Zero";
         }
      },
      {
        type:"input",
        name:"managerEmail",
        message: "What Is Your Manager's Email?",
        validate: answer => {
          const pass = answer.match(
            /|S+@\S+\.\S+/
          );
          if(pass){
            return true
          }
          return " PLease Enter A Valid Email Address";
        }
      },
      {
        type:"input",
        name: "MangerOfficeNumber",
        message:"What Is Your Manager's Office Number?",
        validate: answer=>{
          const pass =answer.match(
            /^[1-9]\d*$/
          )
          if(pass){
            return true
          }
          return "PLease Enter A Positive Number Greater Than Zero";
        }
      }
    ]).then(answers => {
      const manger = new Manager(answers.managerName, answers.managerId,answers.managerEmail, answers.managerOfficeNumber);
      teamMemeber.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }
  function createTeam(){
    inquire.prompt([
      {
        type:"list",
        name:"memberChoice",
        message:"Which Type Of Team Member Would You Like To Add?",
        choices: [
          "Engineer",
          "Intern",
          "i Dont Want To Add Any More Members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice){
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

  
}




// const { type } = require("os");
// const Choice = require("inquirer/lib/objects/choice");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

class Employee{
    name:name,
    id:id,
    email:email,

    getName()
    getId()
    getEmail()
    getRole()

    
}
class Manager {
  manager() {
    inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Managers Name?",
      },
      {
        type: "input",
        name: "Email",
        message: "PLease provide your email address",
      },

      {
        type: "checkbox",
        name: "id number",
        message: "PLease Select your id number",
        choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
      {
        type: "input",
        name: "office Number",
        message: "PLease Enter your office number",
      },
    ]);
  }
}
class Engineer {
    Engineer() {
      inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the Managers Name?",
        },
        {
          type: "input",
          name: "Email",
          message: "PLease provide your email address",
        },
  
        {
          type: "checkbox",
          name: "id number",
          message: "PLease Select your id number",
          choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
        {
          type: "input",
          name: "office Number",
          message: "PLease Enter your office number",
        },
      ]);
    }
  }

  class intern {
    Intern() {
      inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the Managers Name?",
        },
        {
          type: "input",
          name: "Email",
          message: "PLease provide your email address",
        },
  
        {
          type: "checkbox",
          name: "id number",
          message: "PLease Select your id number",
          choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
        {
          type: "input",
          name: "office Number",
          message: "PLease Enter your office number",
        },
      ]);
    }
  }
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
