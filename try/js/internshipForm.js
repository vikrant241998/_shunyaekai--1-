let errorMessage = document.getElementsByClassName("error");
var InternObj = {
  nameErr: false,
  emailErr: false,
  phoneErr: false,
  collageErr: false,
  descriptionErr: false,
  fileErr: false,
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
    InternObj.nameErr = true;
    errorMessage[0].innerHTML = "";
  } else {
    errorMessage[0].innerHTML = "Please enter a valid name";
    InternObj.nameErr = false;
  }
};

// email validation
let email = document.getElementsByName("email")[0];
email.onkeyup = function () {
  var regex = /^\S+@\S+\.\S+$/;
  if (this.value.length >= 3 && regex.test(this.value) && this.value.trim()) {
    errorMessage[1].innerHTML = "";
    InternObj.emailErr = true;
  } else {
    errorMessage[1].innerHTML = "Please enter a valid email";
    InternObj.emailErr = false;
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
    InternObj.phoneErr = true;
  } else {
    errorMessage[2].innerHTML = "phone number must be 10-15 digits";
    InternObj.phoneErr = false;
  }
};

// Collage validation
let Collage = document.getElementsByName("collage-name")[0];
Collage.onkeyup = function () {
  if (
    this.value.length >= 3 &&
    Nameregex.test(this.value) &&
    this.value.trim()
  ) {
    InternObj.collageErr = true;
    errorMessage[3].innerHTML = "";
  } else {
    errorMessage[3].innerHTML = "Please enter a valid name";
    InternObj.collageErr = false;
  }
};
// message validation
let Description = document.getElementsByName("Description")[0];
Description.onkeyup = function () {
  var minLenght = 20;
  let regex = /^[a-zA-Z0-9., !'"?]+$/;
  if (
    this.value.length >= minLenght &&
    regex.test(this.value) &&
    this.value.trim()
  ) {
    errorMessage[4].innerHTML = "";
    InternObj.descriptionErr = true;
  } else if (!regex.test(this.value)) {
    errorMessage[4].innerHTML = "please enter valid description";
    InternObj.descriptionErr = false;
  } else {
    errorMessage[4].innerHTML = "Description must be atleast 20 characters";
    InternObj.descriptionErr = false;
  }
};

const inputElement = document.getElementById("resume");
inputElement.addEventListener("change", handleFiles, false);
let labelName = document.getElementById("file-select");

// upload file validation
let fileList = [];
function handleFiles() {
  let fileTypes = this.files[0].type.split("/")[1];
  if (this.files[0].size >= 2097152) {
    fileList = "";
    InternObj.fileErr = false;
    labelName.style.color = "red";
    labelName.innerText = "file size too large";
  } else if (fileTypes !== "pdf") {
    fileList = "";
    labelName.style.color = "red";
    labelName.innerText = "Please upload pdf valid file";
    InternObj.fileErr = false;
  } else {
    fileList = this.files;
    labelName.style.color = "unset";
    labelName.innerText = fileList[0].name;
    InternObj.fileErr = true;
  }
}

const formData = new FormData();

const InterBtn = document.getElementsByClassName("intern-submit")[0];
const loader = document.getElementsByClassName("loader")[0];

function internFormSubmit(event) {
  event.preventDefault();
  if (Object.values(InternObj).every((value) => value === true)) {
    formData.append("profile_name", "Internship");
    formData.append("name", Name.value);
    formData.append("email", email.value);
    formData.append("phone_no", `${country_code}-${phone.value}`);
    formData.append("collage", Collage.value);
    formData.append("description", Description.value);
    formData.append("resume", fileList[0]);
    console.log("obj", InternObj);
    loader.style.display = "block";
    InterBtn.innerHTML = "Please Wait...";
    fetch(`https://adminapi.shunyaekai.tech/sendmail`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          loader.style.display = "none";
          InterBtn.innerHTML = "Success";
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        loader.style.display = "none";
        InterBtn.innerHTML = "Try again";
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  } else {
    if (InternObj.nameErr === false) {
      errorMessage[0].innerHTML = "Please fill in this field";
    }
    if (InternObj.emailErr === false) {
      errorMessage[1].innerHTML = "Please fill in this field";
    }
    if (InternObj.phoneErr === false) {
      errorMessage[2].innerHTML = "Please fill in this field";
    }
    if (InternObj.collageErr === false) {
      errorMessage[3].innerHTML = "Please fill in this field";
    }
    if (InternObj.descriptionErr === false) {
      errorMessage[4].innerHTML = "Please fill in this field";
    }
    if (InternObj.fileErr === false) {
      labelName.style.color = "red";
    }
  }
}
