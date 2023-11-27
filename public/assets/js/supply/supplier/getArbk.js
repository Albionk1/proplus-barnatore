const arbkButton = document.getElementById('arbk-button')
arbkButton.addEventListener('click',async(e)=>{
    const arbk = document.getElementById('arbk').value
    try {
        const res = await fetch('/api/v1/offert/get-arbk', {
          method: 'POST',
          body: JSON.stringify({ arbk}),
          headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        
        if(data.businesses.length>0){
            document.getElementById('name').value=data.businesses[0].name
            document.getElementById('address').value=data.businesses[0].address
        }
       else{
        showErrorAlert('Numri i biznesit është gabim ose nuk gjindet në sistem')
       }
        
      } catch (err) {
        console.log(err)
      }
})
