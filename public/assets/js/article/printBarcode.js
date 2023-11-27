function printBarcode() {
    const printWindow = window.open('', '_blank');
    const barcode=document.getElementById('showBarcode').outerHTML
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
     
    ${barcode}
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

  const barcodeInput = document.getElementById('barcode-value')

  barcodeInput.addEventListener('input',()=>{
document.getElementById('showBarcode').innerHTML=''
if(barcodeInput.value.length>=12 && barcodeInput.value.length<14){
    JsBarcode("#showBarcode", barcodeInput.value, {
        format: "EAN13",
      });
}else{
document.getElementById('showBarcode').innerHTML=''
}
    if(document.getElementById('barcode-value').value===''){
      document.getElementById('showBarcode').innerHTML=''
      } 
  })

document.getElementById('print-barcode').addEventListener('click',printBarcode)