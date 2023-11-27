$( document ).ready(function() {
  const button = document.getElementById('button-transfer')
  button.addEventListener('click',async(e)=>{
    // e.preventDefault()
    try {
  let unit = document.getElementById('unit').value 
  let unit_for = document.getElementById('unit_for').value 
  let date = document.getElementById('kt_datepicker_1').value 
  let code = document.getElementById('code').value 
  let transfer_type = document.getElementById('transfer_type').value 
    const res = await fetch('/api/v1/transfer/add-transfer', {
      method: 'POST',
      body: JSON.stringify({unit,date,unit_for,code,transfer_type}),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.errors) {
      const e = document.getElementsByClassName('show-errors-transfer')
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
      const e = document.getElementsByClassName('show-errors-transfer')
      for(var elm of e){
        elm.textContent=''
     }
     $('#unit').val('').trigger('change.select2');
     document.getElementById('kt_datepicker_1').value = ""
     showSuccessAlert(data.message)
     setTimeout(()=>{
      location.assign('/admin/merchandise-transfer?transfer='+data.transfer)
      },600)
    }
  } catch (err) {
    console.log(err)
  }
  })
});
