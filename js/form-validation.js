let errorMessage = document.getElementsByClassName("error");
var ValidationObj = {
  nameErr: false,
  emailErr: false,
  phoneErr: false,
  productSelectErr: false,
  NdeviceErr: false,
  industryErr: false,
  countryErr: false,
  stateErr: false,
  citiesErr: false,
  organizationErr: false,
  descriptionErr: false,
};
let Nameregex = /^[a-zA-Z ]+$/;
// name validation
let Name = document.getElementsByName("name")[0];
Name.onkeyup = function () {
  if (
    this.value.length >= 3 &&
    Nameregex.test(this.value) &&
    this.value.trim()
  ) {
    ValidationObj.nameErr = true;
    errorMessage[0].innerHTML = "";
  } else {
    errorMessage[0].innerHTML = "Please enter a valid name";
    ValidationObj.nameErr = false;
  }
};
// email validation
let email = document.getElementsByName("email")[0];
email.onkeyup = function () {
  var regex = /^\S+@\S+\.\S+$/;
  if (this.value.length >= 3 && regex.test(this.value) && this.value.trim()) {
    errorMessage[1].innerHTML = "";
    ValidationObj.emailErr = true;
  } else {
    errorMessage[1].innerHTML = "Please enter a valid email";
    ValidationObj.emailErr = false;
  }
};
// phone validation
let country_code = document.getElementsByClassName("iti__selected-dial-code")[0]
  .innerText;
let phone = document.getElementsByName("phone")[0];
phone.onkeyup = function () {
  var regex = /^[0-9]+$/;
  if (
    this.value.length >= 10 &&
    this.value.length <= 15 &&
    this.value.trim() &&
    regex.test(this.value)
  ) {
    errorMessage[2].innerHTML = "";
    ValidationObj.phoneErr = true;
  } else {
    errorMessage[2].innerHTML = "phone number must be 10-15 digits";
    ValidationObj.phoneErr = false;
  }
};
// product list validation

let productSelect = document.getElementById("inputState");

window.onload = function () {
  if (productSelect.value) {
    ValidationObj.productSelectErr = true;
  } else {
    ValidationObj.productSelectErr = false;
  }
};

productSelect.onchange = function () {
  if (this.value === "") {
    errorMessage[3].innerHTML = "Please Select Product";
    console.log("jgu");
    ValidationObj.productSelectErr = false;
  } else {
    console.log("jgu");
    console.log(this.value);
    ValidationObj.productSelectErr = true;
    errorMessage[3].innerHTML = "";
  }
};

let NDevice = document.getElementsByName("NDevice")[0];
NDevice.onkeyup = function () {
  var regex = /^[0-9]+$/;
  if (regex.test(this.value) && this.value.trim()) {
    errorMessage[4].innerHTML = "";
    ValidationObj.NdeviceErr = true;
  } else {
    errorMessage[4].innerHTML = "Please enter a number";
    ValidationObj.NdeviceErr = false;
  }
};
// industry validation
let Industry = document.getElementsByName("Industry")[0];
Industry.onkeyup = function () {
  if (
    this.value.length >= 3 &&
    Nameregex.test(this.value) &&
    this.value.trim()
  ) {
    errorMessage[5].innerHTML = "";
    ValidationObj.industryErr = true;
  } else {
    errorMessage[5].innerHTML = "Please enter a valid industry name";
    ValidationObj.industryErr = false;
  }
};
// country validation
var Country = document.getElementById("countryId");
Country.onchange = function () {
  if (!this.value) {
    errorMessage[6].innerHTML = "Please selcet your country name";
    ValidationObj.countryErr = false;
  } else {
    errorMessage[6].innerHTML = "";
    ValidationObj.countryErr = true;
  }
};

//  state validation
var state = document.getElementById("stateId");
state.onchange = function () {
  if (state.value === "") {
    errorMessage[7].innerHTML = "Please select your state name";
    ValidationObj.stateErr = false;
  } else {
    errorMessage[7].innerHTML = "";
    ValidationObj.stateErr = true;
  }
  // city validation
};
var city = document.getElementById("cityId");
city.onchange = function () {
  if (!city.value) {
    errorMessage[8].innerHTML = "Please select your cities name";
    ValidationObj.citiesErr = false;
  } else {
    errorMessage[8].innerHTML = "";
    ValidationObj.citiesErr = true;
  }
};

// organization validation
let Organization = document.getElementsByName("Organization")[0];
Organization.onkeyup = function () {
  if (
    this.value.length >= 3 &&
    Nameregex.test(this.value) &&
    this.value.trim()
  ) {
    errorMessage[9].innerHTML = "";
    ValidationObj.organizationErr = true;
  } else {
    errorMessage[9].innerHTML = "Please enter a valid name";
    ValidationObj.organizationErr = false;
  }
};
// message validation
let Description = document.getElementsByName("Description")[0];
Description.onkeyup = function () {
  var minLenght = 50;
  let regex = /^[a-zA-Z0-9., ]+$/;
  if (
    this.value.length >= minLenght &&
    regex.test(this.value) &&
    this.value.trim()
  ) {
    errorMessage[10].innerHTML = "";
    ValidationObj.descriptionErr = true;
  } else if (!regex.test(this.value)) {
    errorMessage[10].innerHTML = "please enter valid description";
    ValidationObj.descriptionErr = false;
  } else {
    errorMessage[10].innerHTML = "Description must be atleast 50 characters";
    ValidationObj.descriptionErr = false;
  }
};

// address
console.log(ValidationObj);
function sendEmail(event) {
  event.preventDefault();
  if (Object.values(ValidationObj).every((value) => value === true)) {
    // create message
    let finalmessage = `Product-Detail%20<br/>%20Name%20:%20${Name.value}%20<br/>%20Email%20:%20${email.value}%20<br/>%20Phone%20:%20${country_code}%20-%20${phone.value}%20<br/>%20Device%20Name%20:%20${productSelect.value}%20<br/>%20No%20.%20of%20Device%20:%20${NDevice.value}%20<br/>%20Industry%20Name%20:%20${Industry.value}%20<br/>%20Country%20Name%20:%20${Country.value}%20<br/>%20State%20:%20${state.value}%20<br/>%20City%20:%20${city.value}%20<br/>%20Organization%20:%20${Organization.value}%20<br/>%20Description%20:%20${Description.value}%20`;
    document.getElementById("submit").innerHTML = "PLEASE WAIT..";
    fetch(
      `https://mailssl.shunyaekai.tech/sendmail?msg=${finalmessage}&email=${email.value}`
    )
      .then((res) => res.json())
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  } else {
    if (ValidationObj.nameErr === false) {
      errorMessage[0].innerHTML = "Please fill in this field";
    }
    if (ValidationObj.emailErr === false) {
      errorMessage[1].innerHTML = "Please fill in this field";
    }
    if (ValidationObj.phoneErr === false) {
      errorMessage[2].innerHTML = "Please fill in this field";
    }
    if (ValidationObj.productSelectErr === false) {
      errorMessage[3].innerHTML = "Please fill in this field";
    }
    if (ValidationObj.NdeviceErr === false) {
      errorMessage[4].innerHTML = "Please fill in this field";
    }
    if (ValidationObj.industryErr === false) {
      errorMessage[5].innerHTML = "Please fill in this field";
    }
    if (ValidationObj.countryErr === false) {
      errorMessage[6].innerHTML = "please select the country";
    }
    if (ValidationObj.stateErr === false) {
      errorMessage[7].innerHTML = "please select the state";
    }
    if (ValidationObj.citiesErr === false) {
      errorMessage[8].innerHTML = "please select the city";
    }
    if (ValidationObj.organizationErr === false) {
      errorMessage[9].innerHTML = "Please fill in this field";
    }
    if (ValidationObj.descriptionErr === false) {
      errorMessage[10].innerHTML = "Please fill in this field";
    }
  }
}
