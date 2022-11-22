#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
async function wdCalculator() {
    let ans;
    let opSign;
    let errormsg = false;
    let again = false;
    do {
        let inputs = await inquirer.prompt([
            {
                name: "firstInput",
                type: "number",
                message: "Please enter " + chalk.redBright("First") + " number:",
            },
            {
                name: "operator",
                type: "list",
                message: "Please choose " + chalk.redBright("Operator") + ":",
                choices: [
                    "addition (+)",
                    "subtraction (-)",
                    "multiplication (*)",
                    "division (/)",
                    "remainder -or- modulus (%)",
                    "power -or- exponenet(^)",
                ],
                default() {
                    return "add (+)";
                },
            },
            {
                name: "secondInput",
                type: "number",
                message: "Please enter " + chalk.redBright("Second") + " number:",
            },
        ]);
        switch (inputs.operator) {
            case "addition (+)":
                ans = inputs.firstInput + inputs.secondInput;
                opSign = "+";
                break;
            case "subtraction (-)":
                ans = inputs.firstInput - inputs.secondInput;
                opSign = "-";
                break;
            case "multiplication (*)":
                ans = inputs.firstInput * inputs.secondInput;
                opSign = "x";
                break;
            case "division (/)":
                ans = inputs.firstInput / inputs.secondInput;
                opSign = "/";
                break;
            case "remainder -or- modulus (%)":
                ans = inputs.firstInput % inputs.secondInput;
                opSign = "%";
                break;
            case "power -or- exponenet(^)":
                ans = inputs.firstInput ** inputs.secondInput;
                opSign = "^";
                break;
            default:
                errormsg = true;
                break;
        }
        if (errormsg || Number.isNaN(ans)) {
            console.log(chalk.bold.white.bgRedBright("\nInvalid Input"));
        }
        else {
            if (Number.isInteger(ans)) {
                console.log("\n Ans:", inputs.firstInput, opSign, inputs.secondInput, "=", chalk.bold.bgYellowBright(" " + ans + " \n"));
            }
            else {
                console.log("\n Ans:", inputs.firstInput, inputs.operator, inputs.secondInput, "=", chalk.bold.bgYellowBright(" " + ans + " "), "or", chalk.bold.bgYellowBright(" " + ans.toFixed(2) + " \n"));
            }
        }
        let goAgain = await inquirer.prompt([
            {
                name: "askAgain",
                type: "list",
                message: "Would you like to make another calculation?",
                choices: ["Yes", "No"],
            },
        ]);
        if (goAgain.askAgain == "Yes") {
            again = true;
            console.log("");
        }
        else {
            again = false;
            console.log("\nThankyou for using wdCalculator\n");
        }
    } while (again === true);
}
console.clear();
console.log("TypeScript Assignment: Calculator\n");
wdCalculator();
