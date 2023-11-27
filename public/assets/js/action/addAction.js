const actionForm = document.getElementById('addAction')

actionForm.addEventListener('submit',async(e)=>{
e.preventDefault()
try {
      
    const start_time = document.getElementById('kt_datepicker_1').value
    const end_time = document.getElementById('kt_datepicker_2').value
    const unit = document.getElementById('unit').value
    const beneficiaries = document.getElementById('beneficiaries').value
    const res = await fetch('/api/v1/action/add-action', {
      method: 'POST',
      body: JSON.stringify({start_time,end_time,unit,beneficiaries }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.errors) {
      const e = document.getElementsByClassName('show-errors-action')
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
      const e = document.getElementsByClassName('show-errors-action')
      for(var elm of e){
        elm.textContent=''
     }
     showSuccessAlert(data.message)
     setTimeout(()=>{
      location.assign('/admin/shares-new/'+data.action)
     },700)
    }
  } catch (err) {
    console.log(err)
  }
})