$( document ).ready(function() {
   const button = document.getElementById('add-article-offert')
   if(button){
   button.addEventListener('click',async(e)=>{
     // e.preventDefault()
     try {
   let qty = document.getElementById('qty').value  
   let total_price = document.getElementById('total_price').value 
   let rab_1 = document.getElementById('rab_1').value 
   let rab_2 = document.getElementById('rab_2').value 
   let discount = document.getElementById('discountInput').value 
   let price_many = document.getElementById('price_many').value 
   const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const offertValue = urlParams.get('offert');
     const res = await fetch('/api/v1/offert/add-offert-articles', {
       method: 'POST',
       body: JSON.stringify({qty,discount,total_price,rab_1,rab_2,price_many,article:articleId,barcode:articleBarcode,offert:offertValue,tvsh:articleTvsh}),
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
      document.getElementById('total_price').value =0
      document.getElementById('rab_1').value =0
      document.getElementById('rab_2').value =0
      const modal = $('#product')
      modal.modal('hide')
      offerttable.search(document.getElementById('offert_table-search').value).draw()     
     }
   } catch (err) {
     console.log(err)
   }
   })
}
});
