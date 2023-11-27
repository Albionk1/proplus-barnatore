let clientTable
$(document).ready(function () {
   clientTable = $('#client_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:'/api/v1/offert/get-clients',
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
        { orderable: !1, targets: 2 },
    ],
    columns: [
      { data: 'nr' },
      { data: 'name' },
      { data: 'address' },
      { data: 'phone_number' },
      { data: 'arbk' },
      { data: 'email' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="text-center fw-bold pt-3">
          <a href="/admin/offers-clients-see/${data._id}" data-bs-toggle="tooltip"
              aria-label="Karta" data-bs-original-title="Karta">
              <i class="fas fa-user text-primary fs-5"></i>
          </a>
          <a id="${data._id}" class="ms-10" data-bs-toggle="tooltip" edit-client="true"
              aria-label="Përditëso"
              data-bs-original-title="Përditëso">
              <i id="${data._id}" class="fas fa-edit text-primary fs-5"></i>
          </a>
          <a id="${data._id}" class="ms-10" data-bs-toggle="tooltip"
              aria-label="Fshij" data-bs-original-title="Fshij" data-kt-delete-client="true">
              <i id="${data._id}" class="fas fa-trash-alt text-danger fs-5"></i>
          </a>
      </td>`;
        },
      },
    ]
  })
 
  const documentTitle = 'Lista e klienteve';
  var buttons = new $.fn.dataTable.Buttons(clientTable, {
      buttons: [
          {
              extend: 'excelHtml5',
              title: documentTitle,
              exportOptions: {
                columns: ':visible'
            }
          },
          {
              extend: 'pdfHtml5',
              title: documentTitle,
              exportOptions: {
                columns: ':visible'
            }
          },
          {
            extend: 'print',
            title: documentTitle,
            exportOptions: {
              columns: ':visible'
          }
        },
        {extend:'colvis',
      text:'Zgjedh kolonat'}
        
          
      ]
  }).container().appendTo($('#print'));
  document.getElementsByClassName('dt-buttons btn-group flex-wrap')[0].classList.remove('flex-wrap')

  const search_input1 = document.getElementById('client-table-search')
  search_input1.addEventListener('keyup', (e) => {
    clientTable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    clientTable.search('').draw()
  }
  function editClient() {
  
    const n = document.querySelectorAll(
      '[edit-client="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', async function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const name = o.querySelectorAll('td')[1].innerText
        const arbk = o.querySelectorAll('td')[4].innerText
        const address = o.querySelectorAll('td')[2].innerText
        const email = o.querySelectorAll('td')[5].innerText
        const phone_number = o.querySelectorAll('td')[3].innerText
        const swalConfig = {
          title: 'Edito Klientin',
          html:
            '<div>' +
            '<p id="sw-name-error" class="show-errors-swal text-danger mb0"></p>' +
            `<input id="swal-name" type="text"  class="form-control form-control-solid" placeholder="Shëno emrin e biznesit ARBK" value="${name}" >` +
            '<p id="sw-arbk-error" class="show-errors-swal text-danger mb0"></p>' +
            `<input id="swal-arbk" type="text"  class="form-control form-control-solid"  placeholder="Shëno numrin e biznesit" value="${arbk}" >` +
            '<p id="sw-address-error" class="show-errors-swal text-danger mb0"></p>' +
            `<input id="swal-address" type="text"  class="form-control form-control-solid" placeholder="Shëno adresën e biznesit"  value="${address}" >` +
            '<p id="sw-email-error" class="show-errors-swal text-danger mb0"></p>' +
            `<input id="swal-email" type="text"  class="form-control form-control-solid" placeholder="Shëno email (opsionale)"  value="${email}" >` +
            '<p id="sw-phone_number-error" class="show-errors-swal text-danger mb0"></p>' +
            `<input id="swal-phone_number" type="text"  class="form-control form-control-solid" placeholder="Shëno nr e telefonit (opsionale)" value="${phone_number}" >` +
            '</div>',
            confirmButtonColor: '#2abf52',
          confirmButtonText: 'Ruaj',
          focusConfirm: false,
          
          preConfirm: async() => {
         const name = document.getElementById('swal-name').value
         const arbk = document.getElementById('swal-arbk').value
         const address = document.getElementById('swal-address').value
         const email = document.getElementById('swal-email').value
         const phone_number = document.getElementById('swal-phone_number').value
            try {
             const res = await fetch('/api/v1/offert/edit-client', {
                method: 'PATCH',
                body: JSON.stringify({ id,name,arbk,address,phone_number,email}),
                headers: { 'Content-Type': 'application/json' }
             });
             const data = await res.json();
             if (data.status=='fail') {
              const e = document.getElementsByClassName('show-errors-swal')
    for(var elm of e){
      elm.textContent=''
   }
   for(var key of Object.keys(data.errors)){

    if(data.errors[key]){
     const p = document.getElementById(`sw-${key}-error`)
     if(p){
     p.textContent = data.errors[key]}
    }
  }
                // showErrorAlert(data.message)
                return false
             }
             if (data.status==='success') {
                showSuccessAlert(data.message)
                clientTable.search('').draw()      
                return true
             }
          }
          catch (err) {
             console.log(err);
          }
          }
        }
        
        const { value: formValues } = await Swal.fire(swalConfig)
        
      })
    })
  }
  function swalDeleteSub() {
    const n = document.querySelectorAll(
      '[data-kt-delete-client="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tclientTableext = o.querySelectorAll('td')[2].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini klientin: ' + tclientTableext,
          icon: 'warning',
          showCancelButton: !0,
          buttonsStyling: !1,
          confirmButtonText: 'Po, fshije',
          cancelButtonText: "Jo, mos e fshi",
          customClass: {
            confirmButton: 'btn fw-bold btn-danger',
            cancelButton: 'btn fw-bold btn-active-light-primary',
          },
        }).then(function (e) {
          e.value
            ? Swal.fire({
                text: 'Ti fshive klienti ' + tclientTableext + '!.',
                icon: 'success',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              }).then(async function () {
                const res = await fetch('/api/v1/offert/delete-client', {
                   method: 'PATCH',
                   body: JSON.stringify({id }),
                   headers: { 'Content-Type': 'application/json' }
                   
                });
                const data = await res.json();
                if(data.status =='fail'){
                   showErrorAlert(data.message)
                }
                if(data.status == 'success'){
                   showSuccessAlert(data.message)
                   resetSuccess()
                }
              })
            : 'cancel' === e.dismiss &&
              Swal.fire({
                text:"Klienti: "+tclientTableext+" nuk u fshi",
                icon: 'error',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              })
        })
      })
    })
  }
  clientTable.on('draw', () => {
    editClient()
    swalDeleteSub()
    KTMenu.createInstances()
  })
})
function addClient(){
  const form = document.getElementById('form-add-client')
  form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    try {
    const name = document.getElementById('name').value
    const arbk = document.getElementById('arbk').value
    const address = document.getElementById('address').value
    const email = document.getElementById('email').value
    const phone_number = document.getElementById('phone_number').value
    const res = await fetch('/api/v1/offert/add-client', {
      method: 'POST',
      body: JSON.stringify({name,arbk,address, email, phone_number}),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.errors) {
      const e = document.getElementsByClassName('show-errors-client')
    for(var elm of e){
      elm.textContent=''
   }
   for(var key of Object.keys(data.errors)){

    if(data.errors[key]){
     const p = document.getElementById(`${key}-client-error`)
     if(p){
     p.textContent = data.errors[key]}
    }
  }
    }
    if (!data.errors) {
      const e = document.getElementsByClassName('show-errors-client')
      for(var elm of e){
        elm.textContent=''
     }
     document.getElementById('name').value = ""
     document.getElementById('arbk').value = ""
     document.getElementById('address').value = ""
     document.getElementById('email').value = ""
     document.getElementById('phone_number').value = ""
     showSuccessAlert(data.message)
     clientTable.search('').draw()
    }
  } catch (err) {
    console.log(err)
  }
  })
  
}
addClient()