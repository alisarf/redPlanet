/*
 CONNECT TO REALTIME DATABASE AND THEN PROCESS IF THE USER IS CREATING NEW ACCOUNT
 OR LOGGING IN . IF LOGGING IN, THEN MATCH THE INPUT EMAIL TO A DB KEY AND CHECK IF
 THE KEY HAS THE CORRESPONDING PASSWORD. IF YES, MOVE TO HOMEPAGE, ELSE IF, USER ENTER 
 VALID USERNAME WITH INCORRECT PASSWORD PROMPT USER TO TRY AGAIN || SIGNUP, ELSE, PROMPT
 USER TO SIGNUP -> REDIRECT TO SIGNUP PAGE.
 */

const usersRef = firebase.database().ref("Users");

let signup_alert = document.getElementById("signup_alert");

let login_btn = document.getElementById("login");
let signup_btn = document.getElementById("signup");

btnEvent(login_btn);
btnEvent(signup_btn);

function btnEvent(btn) {
  //for sign up and login
  if (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      let email = document.getElementById("email").value;
      let pwd = document.getElementById("pwd").value;

      formattingErrors(); //throws error
      if (btn == login_btn) {
        doesitExist(email, pwd);
      } else if (btn == signup_btn) {
        addUserToDB(email, pwd); //add user to db
        redirect(email);
      }
    });
  }
}

function doesitExist(email, pwd) {
  const ref = usersRef.orderByChild("email");
  let queryPwd = usersRef.orderByChild("password").equalTo(pwd);
  let query = ref.equalTo(email);
  query.once("value", function (snapshot) {
    if (snapshot.exists()) {
      getEmailKey(email);
      queryPwd.once("value", function (snapshot2) {
        if (snapshot2.exists()) {
          redirect(email);
          return;
        } else {
          signup_alert.classList.add("show"); //incorrect pwd
        }
      });
    } else {
      signup_alert.classList.add("show"); //incorrect email
    }
  });
}

function addUserToDB(elemail, elpassword) {
  /** Create new User in DB with User Info
   *may use data-set in the future, its set in html already
   *under the classes with .user_foo
   *then, read the data-set type with its input to write into DB
   */
  const fName = document.getElementById("firstName").value;
  const lName = document.getElementById("lastName").value;
  const avatar = document.getElementById("avatar").value;
  const title = document.getElementById("careertitle").value;
  let newUser = usersRef.push();
  newUser.set({
    email: elemail,
    password: elpassword,
    firstname: fName,
    lastname: lName,
    fullname: `${fName} ${lName}`,
    avatar: avatar,
    title: title,
  });
}

function getEmailKey(email) {
  /* returns DB emailkey */
  let authKey;
  usersRef
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", (snap) => {
      authKey = snap.ref.key;
    });
  return authKey;
}

function itsaMatch(input_pwd, email) {
  /* Does the email match the pwd in DB */
  let emailKey = getEmailKey(email);

  let authPwd = database
    .ref("Users")
    .child(emailKey)
    .once("value")
    .then(function (snapshot) {
      return snapshot.val().password;
    });

  if (input_pwd === authPwd) {
    redirect(email);
    return true;
  } else {
    invalidPass(); //throws error
    return false;
  }
}

function redirect(email) {
  //set storage and redirect
  let emailKey = getEmailKey(email);
  localStorage.setItem("emailkey", emailKey);
  window.location.href = "home.html";
}
