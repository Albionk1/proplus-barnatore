const closeArcButton = document.getElementById('close-arc')

closeArcButton.addEventListener('click',async()=>{
   const arc = location.pathname.split('/')[3]
   const count = document.getElementById('count').value
   const comment = document.getElementById('comment').value
   const res = await fetch('/api/v1/arc/close-arc', {
    method: 'POST',
    body: JSON.stringify({arc,count,comment}),
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await res.json()
if(data.status ==='fail'){
    const e = document.getElementsByClassName('show-errors')
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
if(data.status ==='success'){
    showSuccessAlert(data.message)
     setTimeout(()=>{
      location.assign('/admin/arc-see/'+arc)
      },600)
}
})