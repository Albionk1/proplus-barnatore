 async function editAbonim() {
   const startCount_sw = document.getElementById('sw_startCount').value
       const swalConfig = {
         title: 'Përditso Startimin e arkës',
         html:
           '<div>' +
           '<p id="sw-startCount-error" class="show-errors-swal text-danger mb0"></p>' +
           `<input id="swal-startCount" type="number"  class="form-control form-control-solid"  value="${startCount_sw}" >` +
           '</div>',
         confirmButtonColor: '#2abf52',
         confirmButtonText: 'Ruaj',
         focusConfirm: false,

         preConfirm: async () => {
           const startCount = document.getElementById('swal-startCount').value
           try {
             const res = await fetch('/api/v1/arc/arc-edit-start', {
               method: 'PATCH',
               body: JSON.stringify({ id, startCount }),
               headers: { 'Content-Type': 'application/json' }
             });
             const data = await res.json();
             if (data.status == 'fail') {
               showErrorAlert(data.message)
               return false
             }
             if (data.status === 'success') {
               showSuccessAlert(data.message)
               setTimeout(()=>{
                  location.reload()
               },500)
               return true
             }
           }
           catch (err) {
             console.log(err);
           }
         },
       }
       const { value: formValues } = await Swal.fire(swalConfig)
 }