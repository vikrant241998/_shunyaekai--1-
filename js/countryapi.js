// country api
const countries = document.querySelector("#countryId")
fetch("https://admin.shunyaekai.tech/api/countries").
  then((res) => res.json())
  .then((results) => {
    let out = "";
    out += `<option value="">Select Country</option>`
    results.data.forEach(element => {
      out += `<option value="${element.name}">${element.name}</option>`
    });
    countries.innerHTML = out;
  })
  .catch((err) => console.log(err))
// cities api
const cities = document.querySelector("#cityId")
// state api
const states = document.querySelector("#stateId")
countries.addEventListener('change', function () {
  console.log(this.selectedIndex)
  cities.innerHTML =`<option value="">Select City</option>`
  fetch("https://admin.shunyaekai.tech/api/states/"+this.value)
    .then((res) => res.json())
    .then((results) => {
      let out = "";
      out += `<option value="">Select State</option>`
      results.data.forEach(element => {
        out += `<option value="${element.name}">${element.name}</option>`
      });
      out += `<option value="other">Other</option>`
      states.innerHTML = out;
    })
    .catch((err) => console.log(err))
});


// cities api call using state
states.addEventListener('change',function(){
fetch("https://admin.shunyaekai.tech/api/cities/"+this.value)

  .then((res) => res.json())
  .then((results) => {
    let out = "";
    out += `<option value="">Select City</option>`    
    results.data.forEach(element => {
      out += `<option value="${element.name}">${element.name}</option>`
    });
    out += `<option value="other">Other</option>`
    cities.innerHTML = out;
  })
  .catch((err) => console.log(err))
})