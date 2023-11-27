const openArcButton= document.getElementById('start-arc-button')

openArcButton.addEventListener('click',async(e)=>{
   try{
       const startCount = document.getElementById('startCount').value
       const res = await fetch('/api/v1/sales/open-arc', {
         method: 'POST',
         body: JSON.stringify({startCount}),
         headers: { 'Content-Type': 'application/json' },
       })
       const data = await res.json()
       if(data.status === 'fail'){
        showErrorAlert(data.message)
       }
       if(data.status === 'success'){
        showSuccessAlert(data.message)
        $('#startday').modal('hide')
        setTimeout(()=>{ $('#article-table-search').focus()},10)
       }
   }
   catch(e){
      console.log(e)
   }
})