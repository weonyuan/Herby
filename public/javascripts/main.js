function checkFields() {
  var firstName = document.forms['basicInfoForm']['firstName'].value.trim();
  var lastName = document.forms['basicInfoForm']['lastName'].value.trim();
  var email = document.forms['basicInfoForm']['email'].value.trim();
  var emailPattern = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*\.[a-z]{2,6}$/i;


  if (firstName !== null && firstName.length > 0 &&
      lastName !== null && lastName.length > 0 &&
      email !== null && email.length > 0 && emailPattern.test(email)) {
    return true;
  } else {
    return false;
  }
}

function proceed() {
  localStorage.clear();
  return true;
}