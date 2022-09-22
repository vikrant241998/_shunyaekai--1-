let errorMessage = document.getElementsByClassName("error");
var contactObj = {
  nameErr: false,
  emailErr: false,
  phoneErr: false,
  countryErr: false,
  stateErr: false,
  citiesErr: false,
companynameErr:false,
companytypeErr:false,
  industryErr: false,
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
    contactObj.nameErr = true;
    errorMessage[0].innerHTML = "";
  } else {
    errorMessage[0].innerHTML = "Please enter a valid name";
    contactObj.nameErr = false;
  }
};
// email validation
let email = document.getElementsByName("email")[0];
email.onkeyup = function () {
  var regex = /^\S+@\S+\.\S+$/;
  if (this.value.length >= 3 && regex.test(this.value) && this.value.trim()) {
    errorMessage[1].innerHTML = "";
    contactObj.emailErr = true;
  } else {
    errorMessage[1].innerHTML = "Please enter a valid email";
    contactObj.emailErr = false;
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
    regex.test(this.value) &&
    this.value.trim()
  ) {
    errorMessage[2].innerHTML = "";
    contactObj.phoneErr = true;
  } else {
    errorMessage[2].innerHTML = "phone number must be 10-15 digits";
    contactObj.phoneErr = false;
  }
};
// country validation
var Country = document.getElementById("countryId");
Country.onchange = function () {
  if (!this.value) {
    errorMessage[3].innerHTML = "Please selcet your country name";
    contactObj.countryErr = false;
  } else {
    errorMessage[3].innerHTML = "";
    contactObj.countryErr = true;
  }
};

//  state validation
var state = document.getElementById("stateId");
state.onchange = function () {
  if (state.value === "") {
    errorMessage[4].innerHTML = "Please select your state name";
    contactObj.stateErr = false;
  } else {
    errorMessage[4].innerHTML = "";
    contactObj.stateErr = true;
  }
  // city validation
};
var city = document.getElementById("cityId");
city.onchange = function () {
  if (!city.value) {
    errorMessage[5].innerHTML = "Please select your cities name";
    contactObj.citiesErr = false;
  } else {
    errorMessage[5].innerHTML = "";
    contactObj.citiesErr = true;
  }
};


// Company Name  Types
var companyname = document.getElementById("companyName");
companyname.onchange = function () {
  if (!companyname.value) {
    errorMessage[6].innerHTML = "Please enter the company name";
    contactObj.companynameErr = false;
  } else {
    errorMessage[6].innerHTML = "";
    contactObj.companynameErr = true;
  }
};

// company Type  Types
var companytype = document.getElementById("companyType");
companytype.onchange = function () {
  if (!companytype.value) {
    errorMessage[7].innerHTML = "Please enter company type";
    contactObj.companytypeErr = false;
  } else {
    errorMessage[7].innerHTML = "";
    contactObj.companytypeErr = true;
  }
};

// industry Types
var industry = document.getElementById("Industry");
industry.onchange = function () {
  if (!industry.value) {
    errorMessage[8].innerHTML = "Please enter industry type";
    contactObj.industryErr = false;
  } else {
    errorMessage[8].innerHTML = "";
    contactObj.industryErr = true;
  }
};

// message validation
let Description = document.getElementsByName("Description")[0];
Description.onkeyup = function () {
  var minLenght = 20;
  let regex = /^[a-zA-Z0-9., ]+$/;
  if (
    this.value.length >= minLenght &&
    regex.test(this.value) &&
    this.value.trim()
  ) {
    errorMessage[9].innerHTML = "";
    contactObj.descriptionErr = true;
  } else if (!regex.test(this.value)) {
    errorMessage[9].innerHTML = "please enter valid description";
    contactObj.descriptionErr = false;
  } else {
    errorMessage[9].innerHTML = "Description must be atleast 20 characters";
    contactObj.descriptionErr = false;
  }
};
// address
function contactFormSubmit(event) {
  event.preventDefault();
  if (Object.values(contactObj).every((value) => value === true)) {
    // Create Message
    let finalmessage = `Contact%20Form%20Details%20<br/>%20Name%20:%20${Name.value}%20<br/>%20Email%20:%20${email.value}%20<br/>%20Phone%20:%20${country_code}%20-%20${phone.value}%20<br/>%20Country%20Name%20:%20${Country.value}%20<br/>%20State%20:%20${state.value}%20<br/>%20City%20:%20${city.value}%20<br/>%20Description%20:%20${Description.value}%20`;
    document.getElementById("submit").innerHTML = "PLEASE WAIT..";
    console.log(finalmessage);
    fetch(
      `https://mailssl.shunyaekai.tech/sendmail?msg=${finalmessage}&email=${email.value}`
    )
      .then((res) => res.json())
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  } else {
    console.log(contactObj.descriptionErr);
    if (contactObj.nameErr === false) {
      errorMessage[0].innerHTML = "Please fill in this field";
    }
    if (contactObj.emailErr === false) {
      errorMessage[1].innerHTML = "Please fill in this field";
    }
    if (contactObj.phoneErr === false) {
      errorMessage[2].innerHTML = "Please fill in this field";
    }
    if (contactObj.countryErr === false) {
      errorMessage[3].innerHTML = "please select the country";
    }
    if (contactObj.stateErr === false) {
      errorMessage[4].innerHTML = "please select the state";
    }
    if (contactObj.citiesErr === false) {
      errorMessage[5].innerHTML = "please select the city";
    }
    if (contactObj.companynameErr === false) {
      errorMessage[6].innerHTML = "please enter company name";
    }
    if (contactObj.companytypeErr === false) {
      errorMessage[7].innerHTML = "please select company type";
    }
    if (contactObj.industryErr === false) {
      errorMessage[8].innerHTML = "please select the industry type";
    }
    if (contactObj.descriptionErr === false) {
      errorMessage[9].innerHTML = "Please fill in this field";
    }
  }
}
