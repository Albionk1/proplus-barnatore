$( document ).ready(function() {
   const button = document.getElementById('buy_button')
   if(button){
   button.addEventListener('click',async(e)=>{
     // e.preventDefault()
     try {
   let qty = document.getElementById('qty').value 
   let price = document.getElementById('price').value 
   let rab_1 = document.getElementById('rab_1').value 
   let rab_2 = document.getElementById('rab_2').value 
   let mazh = document.getElementById('mazh').value 
   let price_few = document.getElementById('price_few').value 
   let price_many = document.getElementById('price_many').value 
   const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const supplyValue = urlParams.get('supply');
     const res = await fetch('/api/v1/supply/add-supply-articles', {
       method: 'POST',
       body: JSON.stringify({qty,price,rab_1,rab_2,mazh,price_few,price_many,article:articleId,barcode:articleBarcode,supply:supplyValue}),
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
      document.getElementById('qty').value =1
      document.getElementById('price').value =''
      document.getElementById('rab_1').value =0
      document.getElementById('rab_2').value =0
      document.getElementById('mazh').value =0
      const modal = $('#product')
      modal.modal('hide')
      supplytable.search(document.getElementById('supply_table-search').value).draw()     
      articletable.search(e.target.value).draw()
     }
   } catch (err) {
     console.log(err)
   }
   })
}
});
