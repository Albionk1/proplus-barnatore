$( document ).ready(function() {
   const button = document.getElementById('add-article-transfer')
   if(button){
   button.addEventListener('click',async(e)=>{
     // e.preventDefault()
     try {
   let qty = document.getElementById('qty').value  
   const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const transferValue = urlParams.get('transfer');
     const res = await fetch('/api/v1/transfer/add-transfer-articles', {
       method: 'POST',
       body: JSON.stringify({qty,article:articleId,barcode:articleBarcode,transfer:transferValue}),
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
      document.getElementById('qty').value =1
      const modal = $('#product')
      modal.modal('hide')
      transfertable.search(document.getElementById('transfer_table-search').value).draw()     
     }
   } catch (err) {
     console.log(err)
   }
   })
}
});
