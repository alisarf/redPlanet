/* 
    CHECK FORMATTING OF USER INPUT
    Used by Login and Sign Up Page (login.html, index.html)
    !formattingErrors() called from Index.js file!
    Check if the input values > 0 and if email is correctly formatted,
    if not display ui alert to user by the use of the showinvalid class.
*/
function formattingErrors() {
  var elements_arr;
  var switcher = true;
  var emailswitcher = true;
  const email = document.getElementById("email");

  //##Get the elements to validate then convert to array type
  elements_arr = nodeList_to_Array("format_check", (reqInputs = true));

  //##Check all input lengths
  checkInputLength(elements_arr);

  //##Check email format
  checkEmail(email);
  function checkEmail(email) {
    if (validateEmail(email.value) == false) {
      getInvalidFormatEl(email, true);
      emailswitcher = false;
    } else {
      getInvalidFormatEl(email, false);
      emailswitcher = true;
    }
  }

  //****FINAL STEP: CHECK STATUSES OF SWITCHES AND RETURN VALUE TO INDEX.JS***
  if (switcher == false || emailswitcher == false) {
    throw new Error();
  } else if (switcher == true && emailswitcher == true) {
    return true;
  }

  /*--- FXNS BELOW REQUIRE ACCESS TO SWITCHER VARIABLE ---*/

  //##Check for empty input values
  function checkInputLength(arr) {
    arr.forEach((el) => {
      if (el.input.length == 0) {
        //add alert
        getInvalidFormatEl(el, true);
        return (switcher = false);
      } else {
        //remove alert
        getInvalidFormatEl(el, false);
      }
    });
  }
}

//##Email Validator
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//## Toggle UI Alert Prompts
function getInvalidFormatEl(el, toggle = true) {
  //get node by id
  var el_node = document.getElementById(el.id);
  //get target nodes ancestor with alert ui
  var alert_nodes = el_node.parentNode.querySelectorAll(".alert_format");

  toggle == true ? (todo = "add") : (todo = "remove");
  for (const alert_node of alert_nodes) {
    alert_node.classList[todo]("showinvalid");
  }
}

//Invalid password but accurate username given
function invalidPass() {
  var invalidDis = document.getElementById("login-invalidPassword");
  invalidDis.classList.add("active");
}
