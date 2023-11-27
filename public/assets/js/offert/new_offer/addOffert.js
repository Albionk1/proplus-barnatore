$( document ).ready(function() {
  const button = document.getElementById('button-offert')
  button.addEventListener('click',async(e)=>{
    // e.preventDefault()
    try {
  let unit = document.getElementById('unit').value 
  let date = document.getElementById('kt_datepicker_1').value 
  let client = document.getElementById('client').value 
  let invoice = document.getElementById('invoice').value 
  let sell_type = document.getElementById('sell_type').value 
    const res = await fetch('/api/v1/offert/add-offert', {
      method: 'POST',
      body: JSON.stringify({unit,date,client,invoice,sell_type}),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.errors) {
      const e = document.getElementsByClassName('show-errors-offer')
    for(var elm of e){
      elm.textContent=''
   }
   for(var key of Object.keys(data.errors)){

    if(data.errors[key]){
     const p = document.getElementById(`${key}-offer-error`)
     if(p){
     p.textContent = data.errors[key]}
    }
  }
    }
    if (!data.errors) {
      const e = document.getElementsByClassName('show-errors-offer')
      for(var elm of e){
        elm.textContent=''
     }
     $('#unit').val('').trigger('change.select2');
     document.getElementById('kt_datepicker_1').value = ""
     $('#client').val('').trigger('change.select2');
     document.getElementById('invoice').value = ""
     $('#sell_type').val('').trigger('change.select2');
     showSuccessAlert(data.message)
     setTimeout(()=>{
      location.assign('/admin/offer-new?offert='+data.offert)
      },600)
    }
  } catch (err) {
    console.log(err)
  }
  })
});
