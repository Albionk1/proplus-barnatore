function getRepeaterValues() {
    var values = [];
    var repeaterItems = document.querySelectorAll("[data-repeater-item]");
    
    repeaterItems.forEach(function (item) {
        console.log(item)
        var barcode = item.querySelector("input[name='barcode']").value;
        var name = item.querySelector("input[name='name']").value;
        var qty = item.querySelector("input[name='qty']").value;

        // Create an object with the values and push it to the array
        values.push({
            barcode: barcode,
            name: name,
            qty: qty
        });
    });

    return values;
}

const closeCount = document.getElementById('close-count')
closeCount.addEventListener('click',async()=>{
  try{
    if(document.querySelectorAll("[data-repeater-item]").length < 1){
      return showErrorAlert('Nuk keni asnjë numrim për të mbyllur')
    }
   const count= $('#kt_docs_repeater_basic').repeaterVal().kt_docs_repeater_basic
    const res = await fetch('/api/v1/supply/close-count', {
        method: 'POST',
        body: JSON.stringify({count}),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (data.status === 'fail') {
    showErrorAlert(data.message)
      }
      if (data.status === 'success') {
        showSuccessAlert(data.message)
        countTable.draw()
        setTimeout(()=>{
          location.assign('/admin/worker-stock-count')
        },500)
      }
    }catch(e){
      console.log(e)
    }
})