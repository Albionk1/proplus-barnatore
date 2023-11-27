$(document).ready(function () {
const form = document.getElementById('updateForm')
  form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    try {
    const company_name = document.getElementById('company_name').value
    const address = document.getElementById('address').value
    const arbk = document.getElementById('arbk').value
    const phone_number = document.getElementById('phone_number').value
    const email = document.getElementById('email').value
    const fb = document.getElementById('fb').value
    const tw = document.getElementById('tw').value
    const ig = document.getElementById('ig').value
    const mission_vision = document.getElementById('mission_vision').value


    const res = await fetch('/api/v1/auth/update-company', {
      method: 'POST',
      body: JSON.stringify({ company_name,address,arbk,phone_number,email, fb,tw,ig, mission_vision}),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.errors) {
      const e = document.getElementsByClassName('show-errors')
    for(var elm of e){
      elm.textContent=''
   }
   for(var key of Object.keys(data.errors)){

    if(data.errors[key]){
     const p = document.getElementById(`${key}-error`)
     if(p){
     p.textContent = data.errors[key]}
    }
  }
    }
    if (!data.errors) {
      const e = document.getElementsByClassName('show-errors')
      for(var elm of e){
        elm.textContent=''
     }
     showSuccessAlert(data.message)
    }
  } catch (err) {
    console.log(err)
  }
  })})