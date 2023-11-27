$( document ).ready(function() {
   const button = document.getElementById('close-transfer')
   if(button){
   button.addEventListener('click',async(e)=>{
     // e.preventDefault()
     try {
   const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const transferValue = urlParams.get('transfer');
     const res = await fetch('/api/v1/transfer/close-transfer', {
       method: 'POST',
       body: JSON.stringify({id:transferValue}),
       headers: { 'Content-Type': 'application/json' },
     })
     const data = await res.json()
     if (data.status === 'fail') {
   showErrorAlert(data.message)
     }
     if (data.status === 'success') {
       const e = document.getElementsByClassName('show-errors-transfer')
       for(var elm of e){
         elm.textContent=''
      }
      // document.getElementById('paid_status').value =''
      // document.getElementById('supply_status').value =''
      showSuccessAlert(data.message)
      // const modal = $('#close_supply')
      // modal.modal('hide')
      setTimeout(()=>{
        location.assign('/admin/internal-moves')
      },700)
     }
   } catch (err) {
     console.log(err)
   }
   })
}
});
