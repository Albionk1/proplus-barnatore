$( document ).ready(function() {
   const button = document.getElementById('create_supply')
   if(button){
   button.addEventListener('click',async(e)=>{
     // e.preventDefault()
     try {
   let unit = document.getElementById('unit').value 
   let date = document.getElementById('kt_datepicker_1').value 
   let supplier = document.getElementById('supplier').value 
   let invoice = document.getElementById('invoice').value 
   let buy_type = document.getElementById('buy_type').value 
     const res = await fetch('/api/v1/supply/add-supply', {
       method: 'POST',
       body: JSON.stringify({unit,date,supplier,invoice,buy_type,}),
       headers: { 'Content-Type': 'application/json' },
     })
     const data = await res.json()
     if (data.errors) {
       const e = document.getElementsByClassName('show-errors-supply')
     for(var elm of e){
       elm.textContent=''
    }
    for(var key of Object.keys(data.errors)){
 
     if(data.errors[key]){
      const p = document.getElementById(`${key}-supply-error`)
      if(p){
      p.textContent = data.errors[key]}
     }
   }
     }
     if (!data.errors) {
       const e = document.getElementsByClassName('show-errors-supply')
       for(var elm of e){
         elm.textContent=''
      }
      $('#unit').val('').trigger('change.select2');
      document.getElementById('kt_datepicker_1').value = ""
      $('#supplier').val('').trigger('change.select2');
      document.getElementById('invoice').value = ""
      $('#buy_type').val('').trigger('change.select2');
      showSuccessAlert(data.message)
      setTimeout(()=>{
      location.assign('/admin/supply-new?supply='+data.supply)
      },600)
     }
   } catch (err) {
     console.log(err)
   }
   })
}
});
