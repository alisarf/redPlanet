// Initialize Firebase

//get the active user's email key
var emailKey = localStorage.getItem("emailkey");

//if not logged in, redirect to login page
if (emailKey == null) {
  alert("Please remember to login.");
  window.open("login.html", "_self");
}

//Populate user's profile settings into nodes
database
  .ref("Users")
  .child(emailKey)
  .once("value")
  .then(function (snapshot) {
    var x = snapshot.val();
    console.log(x);
    authPassword = x.password; //associated psw

    for (const key in x) {
      let nodes = document.querySelectorAll(`.user_${key}`);
      Array.from(nodes).forEach((node) => {
        if (key == "avatar") {
          node.src = "images/avatars/" + x[key] + ".png";
        } else {
          node.innerHTML = x[key];
        }
      });
    }
  });

//Sign Out User
function signOut() {
  localStorage.removeItem("emailkey", emailKey);
}
