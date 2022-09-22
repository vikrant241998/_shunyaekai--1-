const CourseData = document.getElementById("course-duration-content")
// fetch("http://192.168.1.143:4003/course").then(res => res.json()).then(result => {
//     CourseData.innerHTML = ""

//     result.data.forEach(data => {
//         CourseData.innerHTML += ` <div class="col-xl-4 col-lg-4 col-md-6 _${data.course_duration}">
//         <div class="course-grid course-style-3">
//             <div class="course-header">
//                 <div class="course-thumb">
//                     <img src="http://192.168.1.143:4003/${data.course_img}" alt="" class="img-fluid">
//                 </div>
//             </div>
//             <div class="course-content">
//                 <div class="course-meta d-flex justify-content-between mb-20">
//                     <span class="category">Design</span>
//                     <span class="label"><i class="fas fa-signal me-2"></i>${data.course_level}</span>
//                 </div>
//                 <h3 class="course-title mb-20"> <a href="#">${data.course_title}</a> </h3>
//                 <div class="course-meta-info">
//                     <div class="d-flex align-items-center">
                        
//                         <span class="students"><i class="far fa-user-alt me-2"></i>Course/ Industrial
//                             Training</span>
                            
//                     </div>
//                 </div>
//                 <div class="course-footer mt-20 d-flex align-items-center justify-content-between">
//                     <div class="course-price">$${data.course_price}</div>
//                     <a href="embeded-fundamental-course.html" class="btn btn-main-outline btn-radius btn-sm">View
//                         Details <i class="fa fa-long-arrow-right"></i></a>
//                 </div>
//             </div>
//         </div>
//     </div>`
//     })
// })

const MainLi = document.getElementById("course-duration-id").children


function onOpen (duration) {
    const Course_forty = document.querySelectorAll("._45")
const Course_sixty = document.querySelectorAll("._60")
const Course_ninty = document.querySelectorAll("._90")
    

    if(duration === "45") {
        MainLi[1].classList.add("active")
        MainLi[0].classList.remove("active")
        MainLi[2].classList.remove("active")
        MainLi[3].classList.remove("active")

        Course_forty.forEach(value => console.log(value.classList.remove("hide")))
        Course_sixty.forEach(value => console.log(value.classList.add("hide")))
        Course_ninty.forEach(value => console.log(value.classList.add("hide")))
    } else if(duration === "60") {
        MainLi[2].classList.add("active")
        MainLi[1].classList.remove("active")
        MainLi[0].classList.remove("active")
        MainLi[3].classList.remove("active")
        Course_sixty.forEach(value => console.log(value.classList.remove("hide")))
        Course_forty.forEach(value => console.log(value.classList.add("hide")))
        Course_ninty.forEach(value => console.log(value.classList.add("hide")))
    } else if(duration === "90") {
        MainLi[3].classList.add("active")
        MainLi[2].classList.remove("active")
        MainLi[1].classList.remove("active")
        MainLi[0].classList.remove("active")
        Course_ninty.forEach(value => console.log(value.classList.remove("hide")))
        Course_sixty.forEach(value => console.log(value.classList.add("hide")))
        Course_forty.forEach(value => console.log(value.classList.add("hide")))
    } else {
        MainLi[0].classList.add("active")
        MainLi[3].classList.remove("active")
        MainLi[2].classList.remove("active")
        MainLi[1].classList.remove("active")
        Course_sixty.forEach(value => console.log(value.classList.remove("hide")))
        Course_forty.forEach(value => console.log(value.classList.remove("hide")))
        Course_ninty.forEach(value => console.log(value.classList.remove("hide")))
    }
    

}


let CourseTitle = document.querySelectorAll(".course-title")
let Url = document.querySelectorAll(".course-footer")
const Input = document.getElementsByTagName("input")[0]

let Word = ""

Input.onchange = function() {
    Word = this.value
}


function onSubmit(event) {
event.preventDefault()
    CourseTitle.forEach((value, index) => {

        console.log(`${value.children[0].innerHTML}`.trim().split(" ")[0].toLowerCase())


        if(`${value.children[0].innerHTML}`.trim().split(" ")[0].toLowerCase() == `${Word}`.toLowerCase()) {
            
            window.location.href = Url[index].children[1].href
        }
    
    })

}


