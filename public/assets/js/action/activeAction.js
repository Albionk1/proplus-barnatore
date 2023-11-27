const activeActionButton= document.getElementById('active-action')

 activeActionButton.addEventListener('click',async()=>{
    try {
        const id = location.pathname.split('/')[3]
        const res = await fetch('/api/v1/action/active-action', {
          method: 'PATCH',
          body: JSON.stringify({id }),
          headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        if (data.status ==='fail') {
            showErrorAlert(data.message)
       
        }
        if (data.status ==='success') {
         showSuccessAlert(data.message)
         setTimeout(()=>{
          location.assign('/admin/shares')
         },700)
        }
      } catch (err) {
        console.log(err)
      }
})