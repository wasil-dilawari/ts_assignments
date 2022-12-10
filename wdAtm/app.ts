#! /usr/bin/env node

import inquirer from "inquirer";

type User = {
  username: string;
  password: string;
  accountBalance: number;
};

const user: User = {
  username: "",
  password: "",
  accountBalance: 1_000_000,
};

let confirmPassword: Boolean = false;
let exit: Boolean = false;
let newUser: Boolean = true;

const welcomeMessage = async (oldUser: Boolean = false) => {
  console.clear();
  console.log("************ Welcome to WD ATM ************\n");
  if (oldUser) {
    console.log(`****** Welcome Back, ${user.username} ******\n`);
    let passwordCheck = await inquirer.prompt([
      {
        name: "passwordCheck",
        message: "Please enter your Pin Code: ",
        type: "password",
        mask: true,
        validate(input) {
          if (input !== user.password) {
            return "Incorrect Pin Code";
          } else {
            return true;
          }
        },
      },
    ]);
  }
};

const registerUser = async () => {
  console.log("*** New User Detected ***");

  var RegisterNewUser = await inquirer.prompt([
    {
      name: "newUsername",
      type: "input",
      message: "Please enter a username: ",
      validate(input) {
        if (input === "") {
          return "Not a valid username";
        } else {
          return true;
        }
      },
    },
  ]);

  do {
    var newPass = await inquirer.prompt([
      {
        name: "newPassword1",
        type: "password",
        mask: true,
        message: "Please set new Pin Code: ",
        validate(input) {
          if (isNaN(input)) {
            return "Pin Code can only contain Numbers";
          } else {
            return true;
          }
        },
      },
      {
        name: "newPassword2",
        type: "password",
        mask: true,
        message: "Please enter the Pin Code again: ",
        validate(input) {
          if (isNaN(input)) {
            return "Pin Code can only contain Numbers";
          } else {
            return true;
          }
        },
      },
    ]);
    if (newPass.newPassword1 === newPass.newPassword2) confirmPassword = true;
    else console.log("Pin Codes do not match. Please try again ...");
  } while (!confirmPassword);

  user.username = RegisterNewUser.newUsername;
  user.password = newPass.newPassword1;
  console.log(`\nUser ${user.username} created Successfully`);
  console.log("\nStarting ATM ...");

  setTimeout(() => {}, 2000);

  newUser = false;
};

const atmOperation = async (username: string) => {
  let action = await inquirer.prompt([
    {
      name: "action",
      message: "Please select operation:",
      type: "list",
      choices: [
        "Check Account Balance",
        "Cash Withdrawal",
        "Funds Transfer",
        "Exit ATM",
      ],
      default() {
        return "Check Account Balance";
      },
    },
  ]);

  // console.log(action.action);

  switch (action.action) {
    case "Check Account Balance":
      checkAccountBalance();
      await again();
      break;
    case "Cash Withdrawal":
      await cashWithdrawal();
      await again();
      break;
    case "Funds Transfer":
      await fundsTransfer();
      await again();
      break;
    default:
      exit = true;
      break;
  }
};

const again = async () => {
  var ready = await inquirer.prompt([
    {
      name: "status",
      message: "Do you want to quit ATM? ",
      type: "confirm",
    },
  ]);
  exit = ready.status;
};

const checkAccountBalance = () => {
  console.log("\nYour Account Balance is: ", user.accountBalance, "\n");
};

const cashWithdrawal = async () => {
  checkAccountBalance();
  var withdrawalAmount = await inquirer.prompt([
    {
      name: "amount",
      message:
        "Please Enter the Amount you want to withdraw from your account:",
      type: "number",
      validate(input) {
        if (isNaN(input)) {
          console.log("Invalid Amount. Please enter valid Amount.");
        } else if (input === 0) {
          console.log("Amount cannot be Zero (0). Please enter valid Amount.");
        } else if (input > user.accountBalance) {
          console.log(
            "Amount enter exceeds available Balance. Please enter valid Amount"
          );
        } else return true;
      },
    },
  ]);
  user.accountBalance -= withdrawalAmount.amount;
  console.log("Please collect Cash...");
  console.log("New Account Balance is", user.accountBalance, "\n");
};

const fundsTransfer = async () => {
  checkAccountBalance();
  console.log("Funds Transfer Option is not available at the moment.\n");
};

do {
  if (newUser) {
    await welcomeMessage(false);
    await registerUser();
  } else {
    await welcomeMessage(true);
    do {
      await atmOperation(user.username);
    } while (!exit);
    console.log("\n******** Thankyou for using WD ATM ********\n");
  }
} while (!exit);
