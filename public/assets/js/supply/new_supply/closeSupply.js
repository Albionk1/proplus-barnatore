$( document ).ready(function() {
   const button = document.getElementById('close-supply')
   if(button){
   button.addEventListener('click',async(e)=>{
     // e.preventDefault()
     try {
   let paid_status = document.getElementById('paid_status').value 
   let supply_status = document.getElementById('supply_status').value 
   const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const supplyValue = urlParams.get('supply');
     const res = await fetch('/api/v1/supply/close-supply', {
       method: 'POST',
       body: JSON.stringify({id:supplyValue,supply_status,paid_status}),
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
      document.getElementById('paid_status').value =''
      document.getElementById('supply_status').value =''
      showSuccessAlert(data.message)
      const modal = $('#close_supply')
      modal.modal('hide')
      setTimeout(()=>{
        location.assign('/admin/supplies')
      },500)
     }
   } catch (err) {
     console.log(err)
   }
   })
}
});
