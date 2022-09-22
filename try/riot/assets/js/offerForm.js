let errorMessage = document.getElementsByClassName("error");
var offerObj = {
  fnameErr: false,
  lnameErr: false,
  emailErr: false,
  phoneErr: false,
  courseErr: false,
};
let Nameregex = /^[a-zA-Z ]+$/;
// first name validation
let first_name = document.getElementsByName("fname")[0];
first_name.onkeyup = function () {
if(this.value) {
if (
    this.value.length >= 3 &&
    Nameregex.test(this.value) &&
    this.value.trim()
  ) {
    offerObj.fnameErr = true;
    errorMessage[0].innerHTML = "";
    this.style.border = "1px solid black";
  } else {
    errorMessage[0].innerHTML = "Please enter a valid name";
    offerObj.fnameErr = false;
    this.style.border = "1px solid red";
  }
} else {
    errorMessage[0].innerHTML = "";
    this.style.border = "1px solid black";
}
  
};
// last name validation
let last_name = document.getElementsByName("lname")[0];
last_name.onkeyup = function () {
 if(this.value){
 if (
    this.value.length >= 3 &&
    Nameregex.test(this.value) &&
    this.value.trim()
  ) {
    offerObj.lnameErr = true;
    errorMessage[0].innerHTML = "";
    this.style.border = "1px solid black";
  } else {
    errorMessage[0].innerHTML = "Please enter a valid name";
    offerObj.lnameErr = false;
    this.style.border = "1px solid red";
  }
} else {
    errorMessage[0].innerHTML = "";
    this.style.border = "1px solid black";
}

};
// email validation
let email = document.getElementsByName("email")[0];
email.onkeyup = function () {
if(this.value){
  var regex = /^\S+@\S+\.\S+$/;
  if (this.value.length >= 3 && regex.test(this.value) && this.value.trim()) {
    errorMessage[1].innerHTML = "";
    offerObj.emailErr = true;
    this.style.border = "1px solid black";
  } else {
    errorMessage[1].innerHTML = "Please enter a valid email";
    offerObj.emailErr = false;
    this.style.border = "1px solid red";
  }
} else {
    errorMessage[1].innerHTML = "";
    this.style.border = "1px solid black";
}
};
// phone validation
let country_code = document.getElementsByClassName("iti__selected-dial-code")[0]
  .innerText;
let phone = document.getElementsByName("phone")[0];
phone.onkeyup = function () {
if(this.value){
  var regex = /^[0-9]+$/;
  if (
    this.value.length >= 10 &&
    this.value.length <= 15 &&
    regex.test(this.value) &&
    this.value.trim()
  ) {
    errorMessage[2].innerHTML = "";
    offerObj.phoneErr = true;
    this.style.border = "1px solid black";
  } else {
    errorMessage[2].innerHTML = "phone number must be 10-15 digits";
    offerObj.phoneErr = false;
    this.style.border = "1px solid red";
  }

} else {
    errorMessage[2].innerHTML = "";
    this.style.border = "1px solid black";
}

};
// country validation
var course = document.getElementById("course");
course.onchange = function () {
  if (!this.value) {
    errorMessage[3].innerHTML = "Please selcet your country name";
    offerObj.courseErr = false;
  } else {
    errorMessage[3].innerHTML = "";
    offerObj.courseErr = true;
  }
};
console.log(phone);
// const loader = document.getElementsByClassName("loader")[0];
// address

let Auth = {};
function offer(event) {
  event.preventDefault();
  if (Object.values(offerObj).every((value) => value === true)) {
console.log(offerObj);
    const data = {
      name: `${first_name.value} ${last_name.value}`,
      email: email.value,
      mobile: `${country_code}-${phone.value}`,
      course_name: course.value,
      form_type: "offer",
    };
    // loader.style.display = "block";
    fetch(`https://admin.shunyaekai.tech/form/add`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
console.log("j");
        if (result.status === "success") {
          Auth.pre = true;
        }
        // loader.style.display = "none";
      })
      .then(() => {
        if (Auth.pre) {
          let Modal = document.querySelector(".modals");
          Modal.classList.remove("hide");
        }
      })
      .catch((error) => {

        console.log(error);
      });
  } else {
console.log(offerObj)
    if (offerObj.fnameErr === false) {
      first_name.style.border = "1px solid red";
    }
    if (offerObj.lnameErr === false) {
      last_name.style.border = "1px solid red";
    }
    if (offerObj.emailErr === false) {
      email.style.border = "1px solid red";
    }
    if (offerObj.phoneErr === false) {
      phone.style.border = "1px solid red";
    }
    if (offerObj.courseErr === false) {
      course.style.border = "1px solid red";
    }
  }
}

// otp verification

var OTPVerify = false;

const OTP = document.getElementById("otp");

OTP.onchange = function () {
  var regex = /^[0-9]+$/;

  if (this.value.length === 6 && regex.test(this.value)) {
    errorMessage[2].innerHTML = "";
    OTPVerify = true;
  } else {
    errorMessage[2].innerHTML = "OTP must be 6 digits";
    OTPVerify = false;
  }
};

// otp verification
function VerifyHandler(event) {
  event.preventDefault();

  if (OTPVerify) {
    const data = {
      email: "rohit@shunyaekai.tech",
      otp: OTP.value,
    };
    fetch("https://admin.shunyaekai.tech/form/auth", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") [(Auth.post = true)];
      })
      .then(() => {
        if (Auth.post) {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch(() => alert("Enroll OTP is Invalid or has been Expire"));
  } else {
    alert("Please Enter Valid OTP");
  }
}
