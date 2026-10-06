export const LoginTestCaseData = [
  {
    name: "Login with valid username and valid password",
    username: "standard_user",
    password: "secret_sauce",
    error: null,
  },
  {
    name: "Login with valid username and invalid password",
    username: "standard_user",
    password: "wrong_password",
    error:
      "Epic sadface: Username and password do not match any user in this service",
  },
  {
    name: "Login with invalid username and valid password",
    username: "wrong_username",
    password: "secret_sauce",
    error:
      "Epic sadface: Username and password do not match any user in this service",
  },
  {
    name: "Login with invalid username and invalid password",
    username: "wrong_username",
    password: "wrong_password",
    error:
      "Epic sadface: Username and password do not match any user in this service",
  },
  {
    name: "Login with blanks username and valid password",
    username: "",
    password: "secret_sauce",
    error: "Epic sadface: Username is required",
  },
  {
    name: "Login with valid username and blank password",
    username: "standard_user",
    password: "",
    error: "Epic sadface: Password is required",
  },
  {
    name: "Login with blank username and blank password",
    username: "",
    password: "",
    error: "Epic sadface: Username is required",
  },
];
