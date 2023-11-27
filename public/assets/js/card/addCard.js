function printQr() {
  const printWindow = window.open('', '_blank');
  const qr=document.getElementById('qr-code').innerHTML
  printWindow.document.write(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  </head>
 
  
  <body>
   
  ${qr}
  </body>
  
  </html>`);
  

  // Close the print window when the user clicks on the "close" button

setTimeout(()=>{
  printWindow.print();
},150)
 
 printWindow.addEventListener('afterprint', function() {
  // This function will be called after the user has closed the print dialog
  printWindow.close();
});
if (printWindow.closed) {
}
}


$(document).ready(function () {
   const addCardButton = document.getElementById('add-card-button')
   addCardButton.addEventListener('click',async(e)=>{
       try {
      
       const code = document.getElementById('code').value
       const name = document.getElementById('name').value
       const email = document.getElementById('email').value
       const phone_number = document.getElementById('phone_number').value
       const res = await fetch('/api/v1/loyaltycard/add-loyaltycard', {
         method: 'POST',
         body: JSON.stringify({code,name,email,phone_number }),
         headers: { 'Content-Type': 'application/json' },
       })
       const data = await res.json()
       if (data.errors) {
         const e = document.getElementsByClassName('show-errors-card')
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
         const e = document.getElementsByClassName('show-errors-card')
         for(var elm of e){
           elm.textContent=''
        }
        showSuccessAlert(data.message)
        if(document.getElementById('print-qr').checked){
          printQr()
        }
        const modal = $('#gift_card')
        modal.modal('hide')
       }
     } catch (err) {
       console.log(err)
     }
     })})

     document.getElementById('code').addEventListener('input',()=>{
      document.getElementById('qr-code').innerHTML=''
      var qr_code = new QRCode(document.getElementById("qr-code"), {
        text: code.value,
        width: 100,
        height:100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    document.getElementById('qr-code').querySelector('img').style='height:100%;width:100%;'
    if(document.getElementById('code').value===''){
      document.getElementById('qr-code').innerHTML=''
      }
     })
      
    document.getElementById('reset_all').addEventListener('click',()=>{
      document.getElementById('code').value = ''
      document.getElementById('name').value = ''
      document.getElementById('email').value = ''
      document.getElementById('phone_number').value = ''
      document.getElementById('qr-code').innerHTML=''
      document.getElementById('print-qr').checked = false
    })
   
 
   
        
 
