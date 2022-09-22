let errorMessage = document.querySelectorAll(".error");

var contactObj = {
  nameErr: false,
  emailErr: false,
  phoneErr: false,
  studentErr: false,
  courseErr: false,
};

let Nameregex = /^[a-zA-Z ]+$/;
// name validation
let Name = document.getElementsByName("name")[0];
Name.onkeyup = function () {
  console.log("uiui");
  if (
    this.value.length >= 3 &&
    Nameregex.test(this.value) &&
    this.value.trim()
  ) {
    contactObj.nameErr = true;
    errorMessage[0].innerHTML = "";
    this.style.border = "1px solid #F5F5F5";
  } else {
    errorMessage[0].innerHTML = "Please enter a valid name";
    contactObj.nameErr = false;
    this.style.border = "1px solid red";
  }
};

// email validation
let email = document.getElementsByName("email")[0];
email.onkeyup = function () {
  var regex = /^\S+@\S+\.\S+$/;
  if (this.value.length >= 3 && regex.test(this.value) && this.value.trim()) {
    errorMessage[1].innerHTML = "";
    contactObj.emailErr = true;
    this.style.border = "1px solid #F5F5F5";
  } else {
    errorMessage[1].innerHTML = "Please enter a valid email";
    contactObj.emailErr = false;
    this.style.border = "1px solid red";
  }
};

// phone validation
let Phone = document.getElementsByName("phone")[0];
Phone.onkeyup = function () {
  var regex = /^[0-9]+$/;
  if (
    this.value.length >= 10 &&
    this.value.length <= 15 &&
    regex.test(this.value)
  ) {
    this.style.border = "1px solid #F5F5F5";
    errorMessage[2].innerHTML = "";
    contactObj.phoneErr = true;
  } else {
    errorMessage[2].innerHTML = "phone number must be 10-15 digits";
    contactObj.phoneErr = false;
    this.style.border = "1px solid red";
  }
};

const Student = document.getElementById("students");
Student.onchange = function () {
  const studentInfo = document.getElementsByClassName("student-info");
  this.value === "yes"
    ? ((studentInfo[0].style.display = "block"),
      (studentInfo[1].style.display = "block"))
    : ((studentInfo[0].style.display = "none"),
      (studentInfo[1].style.display = "none"));

  if (this.selectedIndex !== 0) {
    errorMessage[3].innerHTML = "";
    this.style.border = "1px solid #F5F5F5";
    contactObj.studentErr = true;
  } else {
    errorMessage[3].innerHTML = "Are You Student or Not!";
    contactObj.studentErr = false;
    this.style.border = "1px solid red";
  }
};

const Course = document.getElementById("course");
Course.onchange = function () {
  if (this.selectedIndex !== 0) {
    errorMessage[4].innerHTML = "";
    this.style.border = "1px solid #F5F5F5";
    contactObj.courseErr = true;
  } else {
    contactObj.courseErr = false;
    this.style.border = "1px solid red";
    errorMessage[4].innerHTML = "Please Select Your Course";
  }
};

const college_name = document.getElementById("college");

const university_name = document.getElementById("university");
// address

const Auth = {};
function contactFormSubmit(event) {
  event.preventDefault();
  console.log(contactObj);

  if (Object.values(contactObj).every((value) => value === true)) {
    const Data = {
      name: Name.value,
      email: email.value,
      course_name: Course.value,
      mobile: Phone.value,
      university: university_name.value,
      collage_name: college_list.value,
      form_type: "contact",
    };
    fetch(`https://admin.shunyaekai.tech/form/add`, {
      method: "POST",
      body: JSON.stringify(Data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
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
    if (contactObj.nameErr === false) {
      Name.style.border = "1px solid red";
    }
    if (contactObj.emailErr === false) {
      email.style.border = "1px solid red";
    }
    if (contactObj.phoneErr === false) {
      Phone.style.border = "1px solid red";
    }
    if (contactObj.studentErr === false) {
      Student.style.border = "1px solid red";
    }
    if (contactObj.courseErr === false) {
      Course.style.border = "1px solid red";
    }
  }
}

// otp verification

var OTPVerify = false;

const OTP = document.getElementById("otp");

OTP.onkeyup = function () {
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
      email: email.value,
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
