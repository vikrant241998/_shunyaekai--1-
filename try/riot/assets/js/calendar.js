var bookingObj = {

  dateErr: false,

  nameErr: false,

  emailErr: false,

  PhoneErr: false,

  studentErr: false,

  courseErr: false,

};



function createCalendar(elem, year, month) {

  let mon = month; // months in JS are 0..11, not 1..12

  let d = new Date(year, mon);

  let table =

    "<table><thead><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></thead><tbody><tr>";



  // spaces for the first row

  // from Monday till the first day of the month

  //   * 1  2  3  4



  for (let i = 0; i < getDay(d); i++) {

    table += `<td></td>`;

  }



  // <td> with actual dates

  while (d.getMonth() == mon) {

    if (

      d.getDate() === new Date().getDate() &&

      d.getMonth() === new Date().getMonth()

    ) {

      table += `<td class="active">` + d.getDate() + "</td>";

    } else if (d < new Date()) {

      table += `<td class="unactive">` + d.getDate() + "</td>";

    } else {

      table += `<td class="choose">` + d.getDate() + "</td>";

    }



    if (getDay(d) % 7 == 6) {

      // sunday, last day of week - newline

      table += `</tr><tr>`;

    }



    d.setDate(d.getDate() + 1);

  }



  // add spaces after last days of month for the last row

  // 29 30 31

  if (getDay(d) != 0) {

    for (let i = getDay(d); i < 7; i++) {

      table += `<td></td>`;

    }

  }



  // close the table

  table += "</tr></tbody></table>";



  elem.innerHTML = table;

}



function getDay(date) {

  // get day number from 0 (monday) to 6 (sunday)

  let day = date.getDay();

  if (day == 0) day = 7; // make Sunday (0) the last day

  return day - 1;

}



// style code

const monthNames = [

  "January",

  "February",

  "March",

  "April",

  "May",

  "June",

  "July",

  "August",

  "September",

  "October",

  "November",

  "December",

];

let month = document.getElementById("month-name");

// let preButton = document.getElementsByClassName("pre")[0];

// let nextButton = document.getElementsByClassName("next")[0];

let currentMonth = new Date();

month.innerText = `${monthNames[currentMonth.getMonth()]}`;



// main code

function getDay(date) {

  // get day number from 0 (monday) to 6 (sunday)

  let day = date.getDay();

  if (day == 0) day = 7; // make Sunday (0) the last day

  return day - 1;

}



createCalendar(calendar, currentMonth.getFullYear(), currentMonth.getMonth());



let maxMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));



let minMonth = new Date();



function onNext() {

  if (currentMonth < maxMonth) {

    currentMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));

  }



  month.innerText = `${monthNames[currentMonth.getMonth()]}`;

  createCalendar(calendar, currentMonth.getFullYear(), currentMonth.getMonth());

  getValue(currentMonth.getMonth());

}



function onPrev() {

  if (currentMonth > minMonth) {

    currentMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() - 1));

  }



  month.innerText = `${monthNames[currentMonth.getMonth()]}`;

  createCalendar(calendar, currentMonth.getFullYear(), currentMonth.getMonth());

  getValue(currentMonth);

}



// get date value

const dataValue = document.getElementById("calendar");

// set form value

const slotTime = document.getElementsByName("slot_time")[0];



// booking function

const show = document.getElementById("booking");

// function call



function booking() {

  show.style.display = "block";

}



let bookingTime = "";



let OldActive;



function getValue() {

  let Dates =

    document.getElementById("calendar").children[0].children[1].children;

  let SlotForm = document.getElementById("slot-booking");



  for (let i = 0; i < Dates.length; i++) {

    for (let f = 0; f < Dates[i].children.length; f++) {

      // console.log(Dates[i].children[f]);



      Dates[i].children[f].onclick = function () {

        if (this.classList.contains("unactive")) {

          return null;

        } else {

          if (OldActive) [OldActive.classList.remove("select-date")];



          OldActive = Dates[i].children[f];



          Dates[i].children[f];



          bookingTime =

            this.innerText +

            "-" +

            monthNames[currentMonth.getMonth()] +

            "-" +

            currentMonth.getFullYear();

          this.classList.add("select-date");

          slotTime.value = bookingTime;



          bookingObj.dateErr = true;

          slotTime.style.border = "1px solid #F5F5F5";



          // SlotForm.classList.remove("hide");

          // show.classList.add("hide");

          // show.style.display = "none";

        }

      };

    }

  }

}



getValue();



// form validation



let errorMessage = document.getElementsByClassName("error");



// form object



// Name validation

let Nameregex = /^[a-zA-Z ]+$/;

const Name = document.getElementsByName("name");

Name[0].onkeyup = function () {

  if (

    this.value.length >= 3 &&

    Nameregex.test(this.value) &&

    this.value.trim()

  ) {

    bookingObj.nameErr = true;

    errorMessage[1].innerHTML = "";

    this.style.border = "1px solid #F5F5F5";

  } else {

    errorMessage[1].innerHTML = "Please enter a valid name";

    bookingObj.nameErr = false;

    this.style.border = "1px solid red";

  }

};



// email validation

const Email = document.getElementsByName("email");

Email[0].onkeyup = function () {

  var regex = /^\S+@\S+\.\S+$/;

  if (this.value.length >= 3 && regex.test(this.value) && this.value.trim()) {

    errorMessage[2].innerHTML = "";

    bookingObj.emailErr = true;

    this.style.border = "1px solid #F5F5F5";

  } else {

    errorMessage[2].innerHTML = "Please enter a valid email";

    bookingObj.emailErr = false;

    this.style.border = "1px solid red";

  }

};



// Phone validation

const Phone = document.getElementsByName("phone");

Phone[0].onkeyup = function () {

  var regex = /^[0-9]+$/;

  if (

    this.value.length >= 10 &&

    this.value.length <= 15 &&

    regex.test(this.value) &&

    this.value.trim()

  ) {

    errorMessage[3].innerHTML = "";

    bookingObj.PhoneErr = true;

    this.style.border = "1px solid #F5F5F5";

  } else {

    errorMessage[3].innerHTML = "phone number must be 10-15 digits";

    bookingObj.PhoneErr = false;

    this.style.border = "1px solid red";

  }

};



const students = document.getElementById("students");

students.onchange = function () {

  const studentInfo = document.getElementsByClassName("student-info");

  this.value === "yes"

    ? ((studentInfo[0].style.display = "block"),

      (studentInfo[1].style.display = "block"))

    : ((studentInfo[0].style.display = "none"),

      (studentInfo[1].style.display = "none"));



  if (this.selectedIndex !== 0) {

    bookingObj.studentErr = true;

    this.style.border = "1px solid #F5F5F5";

    errorMessage[4].innerHTML = "";

  } else {

    bookingObj.studentErr = false;

    this.style.border = "1px solid red";

    errorMessage[4].innerHTML = "Are you Student or Not!";

  }

};



const college_name = document.getElementById("college");



const university_name = document.getElementById("university");



const course_name = document.getElementById("course");



course_name.onchange = function () {

  if (this.selectedIndex !== 0) {

    bookingObj.courseErr = true;

    this.style.border = "1px solid #F5F5F5";

    errorMessage[5].innerHTML = "";

  } else {

    bookingObj.courseErr = false;

    this.style.border = "1px solid red";

    errorMessage[5].innerHTML = "Please Select Your Course";

  }

};



const Auth = {};



//const loader = document.getElementsByClassName("loader")[0];

// address

function bookingMail(event) {

  event.preventDefault();



  if (Object.values(bookingObj).every((value) => value === true)) {

    // create object

    const data = {

      enroll_time: bookingTime,

      name: Name[0].value,

      email: Email[0].value,

      mobile: Phone[0].value,

      student: students.value,

      university: university_name.value,

      college_name: college_name.value,

      course_name: course_name.value,

    };



//    loader.style.display = "block";



    // document.getElementById("submit").innerHTML = "PLEASE WAIT..";

    fetch(`https://admin.shunyaekai.tech/mail/pre/enroll`, {

      method: "POST",

      body: JSON.stringify(data),

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

    if (bookingObj.nameErr === false) {

      Name[0].style.border = "1px solid red";

    }

    if (bookingObj.emailErr === false) {

      Email[0].style.border = "1px solid red";

    }

    if (bookingObj.PhoneErr === false) {

      Phone[0].style.border = "1px solid red";

    }

    if (bookingObj.studentErr === false) {

      students.style.border = "1px solid red";

    }

    if (bookingObj.dateErr === false) {

      slotTime.style.border = "1px solid red";

    }

    if (bookingObj.courseErr === false) {

      course_name.style.border = "1px solid red";

    }

  }

}



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

      email: Email[0].value,

      otp: OTP.value,

    };

    fetch("https://admin.shunyaekai.tech/mail/post/enroll", {

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



function cancelBooking() {

  let SlotForm = document.getElementById("slot-booking");

  SlotForm.classList.add("hide");

}

