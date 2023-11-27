$( document ).ready(function() {
   const button = document.getElementById('close-supply')
   if(button){
   button.addEventListener('click',async(e)=>{
     // e.preventDefault()
     try {
   let paid_status = document.getElementById('paid_status').value 
   let sale_status = document.getElementById('sale_status').value 
   const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const saleValue = urlParams.get('sale');
     const res = await fetch('/api/v1/sales/close-sale', {
       method: 'POST',
       body: JSON.stringify({id:saleValue,paid_status,sale_status}),
       headers: { 'Content-Type': 'application/json' },
     })
     const data = await res.json()
     if (data.status === 'fail') {
       const e = document.getElementsByClassName('show-errors-sales')
     for(var elm of e){
       elm.textContent=''
    }
    for(var key of Object.keys(data.errors)){
 
     if(data.errors[key]){
      const p = document.getElementById(`${key}-sales-error`)
      if(p){
      p.textContent = data.errors[key]}
     }
   }
   showErrorAlert(data.message)
     }
     if (data.status === 'success') {
       const e = document.getElementsByClassName('show-errors-sales')
       for(var elm of e){
         elm.textContent=''
      }
      document.getElementById('paid_status').value =''
      document.getElementById('sale_status').value =''
      showSuccessAlert(data.message)
      const modal = $('#close_sale')
      modal.modal('hide')
      setTimeout(()=>{
        location.assign('/admin/sales-wholesale')
      },700)
     }
   } catch (err) {
     console.log(err)
   }
   })
}
});
