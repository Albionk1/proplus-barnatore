$( document ).ready(function() {
   const button = document.getElementById('close-offert')
   if(button){
   button.addEventListener('click',async(e)=>{
     // e.preventDefault()
     try {
  //  let paid_status = document.getElementById('paid_status').value 
  //  let supply_status = document.getElementById('supply_status').value 
   const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const offertValue = urlParams.get('offert');
     const res = await fetch('/api/v1/offert/close-offert', {
       method: 'POST',
       body: JSON.stringify({id:offertValue}),
       headers: { 'Content-Type': 'application/json' },
     })
     const data = await res.json()
     if (data.status === 'fail') {
  //      const e = document.getElementsByClassName('show-errors-offert')
  //    for(var elm of e){
  //      elm.textContent=''
  //   }
  //   for(var key of Object.keys(data.errors)){
 
  //    if(data.errors[key]){
  //     const p = document.getElementById(`${key}-offert-error`)
  //     if(p){
  //     p.textContent = data.errors[key]}
  //    }
  //  }
   showErrorAlert(data.message)
     }
     if (data.status === 'success') {
       const e = document.getElementsByClassName('show-errors-offert')
       for(var elm of e){
         elm.textContent=''
      }
      // document.getElementById('paid_status').value =''
      // document.getElementById('supply_status').value =''
      showSuccessAlert(data.message)
      // const modal = $('#close_supply')
      // modal.modal('hide')
      setTimeout(()=>{
        location.assign('/admin/offers')
      },700)
     }
   } catch (err) {
     console.log(err)
   }
   })
}
});
