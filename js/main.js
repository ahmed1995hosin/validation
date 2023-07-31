//regular expression matching
var regexName = /^([a-zA-Z])+(\s\w+)?$/;
var regexEmail = /^[A-Za-z]+([\_\-\.]?\w+)?@([A-Za-z])+\.([A-Za-z]{2,4})$/;
var regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
// function of regex
function regExpersion(str, pattern) {
  return new RegExp(pattern, "g").test(str);
}

// select elements
var listUsers = JSON.parse(localStorage.getItem("listU")) || [];
var globalIndex = 0;

// function available item in list
function availableItem(item, target) {
  console.log("available:");
  for (let i = 0; i < listUsers.length; i++) {
    if (listUsers[i][`${item}`] == target.toLowerCase()) {
      console.log(listUsers.length);
      globalIndex = i;
      return 1;
    }
  }
  return 0;
}
// url location
var pathPart = location.pathname;
var localHost = location.hostname;
var baseURL = [];
console.log(pathPart, localHost);
var pathName = pathPart.split("/");
console.log(pathName);
for (var i = 0; i < pathName.length - 1; i++) {
  baseURL.push(pathName[i]);
}
baseURL = baseURL.join("/");
console.log("https://" + localHost + "/" + baseURL + "/home.html");

// if (baseURL) console.log("not empty base URL");
// else console.log("empty base URL");
// ////////////////////////////////////
// locationManager
function locationManager(name) {
  if (baseURL) {
    console.log("not empty base URL");
    location.replace("https://" + localHost + "/" + baseURL + `/${name}.html`);
  } else {
    console.log("empty base URL");
    location.replace("https://" + localHost + `/${name}.html`);
  }
}

// sign up a user

// clear values inputs
function clearInput() {
  userName.value = "";
  userEmail.value = "";
  userPassword.value = "";
}

var userName = document.querySelector("#username");
var userEmail = document.querySelector("#useremail");
var userPassword = document.querySelector("#userpassword");
var signUp = document.querySelector("#signup");
var signuPage = document.getElementById("signuPage");
// console.log(userName, userEmail, userPassword);
if (signuPage) {
  // form defaults prevent
  document.querySelector(".form").addEventListener("click", function (e) {
    //   console.log(e.target);
    e.preventDefault();
  });
  // checking username
  userName.addEventListener("input", function () {
    // console.log();
    if (userName.value.trim() !== "") {
      if (regExpersion(userName.value.trim(), regexName)) {
        userName.classList.add("is-valid");
        userName.classList.remove("is-invalid");
        userName.nextElementSibling.classList.remove("text-danger");
        userName.nextElementSibling.classList.add("opacity-0");
      } else {
        userName.classList.add("is-invalid");
        userName.classList.remove("is-valid");
        userName.nextElementSibling.classList.remove("opacity-0");
        userName.nextElementSibling.innerHTML = "Enter correct name ";
      }
    } else {
      userName.classList.add("is-invalid");
      userName.classList.remove("is-valid");
      userName.nextElementSibling.classList.remove("opacity-0");
      userName.nextElementSibling.innerHTML = "Name is required";
      userName.nextElementSibling.classList.add("text-danger");
    }
  });

  // checking userEmail
  userEmail.addEventListener("input", function (event) {
    console.log();
    if (userEmail.value.trim() !== "") {
      if (regExpersion(userEmail.value.trim(), regexEmail)) {
        if (!availableItem("useremail", userEmail.value.trim())) {
          userEmail.classList.add("is-valid");
          userEmail.classList.remove("is-invalid");
          userEmail.nextElementSibling.classList.add("text-success");
          userEmail.nextElementSibling.classList.remove(
            "text-danger",
            "opacity-0"
          );
          userEmail.nextElementSibling.innerHTML = "available Email";
        } else {
          userEmail.classList.add("is-invalid");
          userEmail.classList.remove("is-valid");
          userEmail.nextElementSibling.classList.remove(
            "text-success",
            "opacity-0"
          );
          userEmail.nextElementSibling.classList.add("text-danger");
          userEmail.nextElementSibling.innerHTML = "try anther Email";
        }
      } else {
        userEmail.classList.add("is-invalid");
        userEmail.classList.remove("is-valid");
        userEmail.nextElementSibling.classList.remove(
          "text-success",
          "opacity-0"
        );
        userEmail.nextElementSibling.classList.add("text-danger");
        userEmail.nextElementSibling.innerHTML = "Enter correct Email ";
      }
    } else {
      userEmail.classList.add("is-invalid");
      userEmail.classList.remove("is-valid");
      userEmail.nextElementSibling.classList.remove(
        "opacity-0",
        "text-success"
      );
      userEmail.nextElementSibling.classList.add("text-danger");
      userEmail.nextElementSibling.innerHTML = "Email is required";
    }
  });

  // checking userpassword
  userPassword.addEventListener("input", function (event) {
    userPassword.value.trim();
    console.log();
    if (userPassword.value.trim() !== "") {
      if (regExpersion(userPassword.value, regexPassword)) {
        userPassword.classList.add("is-valid");
        userPassword.classList.remove("is-invalid");
        userPassword.nextElementSibling.classList.remove("text-danger");
        userPassword.nextElementSibling.classList.add("opacity-0");
      } else {
        userPassword.classList.add("is-invalid");
        userPassword.classList.remove("is-valid");
        userPassword.nextElementSibling.classList.remove("opacity-0");
        userPassword.nextElementSibling.innerHTML =
          "At least one upper ,one lower,one digit ,Password with min 8 characters ";
      }
    } else {
      userPassword.classList.add("is-invalid");
      userPassword.classList.remove("is-valid");
      userPassword.nextElementSibling.classList.remove("opacity-0");
      userPassword.nextElementSibling.innerHTML = "Password is required";
      userPassword.nextElementSibling.classList.add("text-danger");
    }
  });

  // submit user
  signUp.addEventListener("click", function (e) {
    // truthy input
    if (
      regExpersion(userName.value.trim(), regexName) &&
      !availableItem("useremail", userEmail.value.trim()) &&
      regExpersion(userEmail.value.trim(), regexEmail) &&
      regExpersion(userPassword.value.trim(), regexPassword)
    ) {
      var user = {
        username: userName.value,
        useremail: userEmail.value.toLowerCase(),
        userpassword: userPassword.value,
      };
      // success callback
      signUp.previousElementSibling.innerHTML = "Success";
      signUp.previousElementSibling.classList.replace(
        "text-danger",
        "text-success"
      );
      signUp.previousElementSibling.classList.remove("opacity-0");
      // push the new element
      listUsers.push(user);
      localStorage.setItem("listU", JSON.stringify(listUsers));
      // clear the input
      clearInput();
      clearInputClass();

      // timers 0.4s
      setTimeout(() => {
        signUp.previousElementSibling.classList.add("opacity-0");
      }, 400);
      locationManager("index");

      // go to log in page
    } else {
      // falsely vales
      signUp.previousElementSibling.classList.replace(
        "text-success",
        "text-danger"
      );
      signUp.previousElementSibling.classList.remove("opacity-0");
      if (
        userName.value == "" ||
        userEmail.value == "" ||
        userPassword.value == ""
      ) {
        signUp.previousElementSibling.innerHTML = "All inputs are required";
      } else {
        signUp.previousElementSibling.innerHTML = "please correct your values";
      }
    }
  });
  // function clearInputClass
  function clearInputClass() {
    userName.classList.remove("is-valid", "is-invalid");
    userName.nextElementSibling.classList.add("opacity-0");
    userEmail.classList.remove("is-valid", "is-invalid");
    userEmail.nextElementSibling.classList.add("opacity-0");
    userPassword.classList.remove("is-valid", "is-invalid");
    userPassword.nextElementSibling.classList.add("opacity-0");
  }
  clearInputClass();
}

// log in
// select elements

var loginEmail = document.querySelector("#loginEmail");
var loginPassword = document.querySelector("#loginPassword");
var logIn = document.querySelector("#login");
var signinPage = document.querySelector("#signinPage");
console.log(loginEmail);

if (signinPage) {
  // form defaults prevent
  document.querySelector(".form").addEventListener("click", function (e) {
    //   console.log(e.target);
    e.preventDefault();
  });
  // function login clear password and Email
  function clearInputLogin() {
    loginEmail.value = "";
    loginPassword.value = "";
  }
  clearInputLogin();
  // event input email. login email
  loginEmail.addEventListener("input", function (e) {
    if (regExpersion(loginEmail.value.trim(), regexEmail)) {
      loginEmail.nextElementSibling.classList.add("opacity-0");
    } else {
      loginEmail.nextElementSibling.classList.remove(
        "opacity-0",
        "text-success"
      );
      loginEmail.nextElementSibling.classList.add("text-danger");
      if (loginEmail.value.trim() == "") {
        loginEmail.nextElementSibling.innerHTML = "Email is required";
      } else {
        loginEmail.nextElementSibling.innerHTML =
          "please enter the  email address";
      }
    }
  });
  // password confirmation   for  password
  loginPassword.addEventListener("input", function (e) {
    if (loginPassword.value.trim() == "") {
      loginPassword.nextElementSibling.classList.remove(
        "opacity-0",
        "text-success"
      );
      loginPassword.nextElementSibling.classList.add("text-danger");
      loginPassword.nextElementSibling.innerHTML = "Password is required";
    } else {
      loginPassword.nextElementSibling.classList.add("opacity-0");
    }
  });

  // log in btn the user
  logIn.addEventListener("click", function (e) {
    // console.log("User clicked");
    if (
      availableItem("useremail", loginEmail.value) &&
      loginPassword.value != ""
    ) {
      console.log(" clicked");
      if (listUsers[globalIndex].userpassword == loginPassword.value) {
        logIn.previousElementSibling.classList.add("opacity-0");
        console.log("clicked");
        localStorage.setItem(
          "activeUser",
          JSON.stringify(listUsers[globalIndex])
        );
        clearInputLogin();
        // activeUserHome();

        // locationManager
        locationManager("home");
      } else {
        logIn.previousElementSibling.innerHTML = "incorrect email or password";
        logIn.previousElementSibling.classList.remove("opacity-0");
      }
    } else {
      logIn.previousElementSibling.classList.remove("opacity-0");
      if (loginPassword.value != "" && loginEmail != "") {
        logIn.previousElementSibling.innerHTML = "incorrect email or password";
      } else {
        logIn.previousElementSibling.innerHTML = "All inputs are required";
      }
    }
  });
}

// home page

var logOut = document.querySelector(".btn-logout");
var homePage = document.querySelector("#homePage");

// log out btn
if (homePage) {
  // function active user page home
  function activeUserHome() {
    var currentUser = JSON.parse(localStorage.getItem("activeUser"));
    document.querySelector(
      ".homeh2"
    ).innerHTML = `welcome ${currentUser.username}`;
  }
  if (localStorage.getItem("activeUser")) {
    activeUserHome();
  }

  logOut.addEventListener("click", function (e) {
    localStorage.removeItem("activeUser");
    console.log("logged out");
  });
}
