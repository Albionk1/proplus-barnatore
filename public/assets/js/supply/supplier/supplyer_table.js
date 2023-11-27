let suppliertable
$(document).ready(function () {
   suppliertable = $('#supplier_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:'/api/v1/supply/get-suppliers',
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
          <a href="/admin/supplier-see/${data._id}" data-bs-toggle="tooltip"
              aria-label="Karta" data-bs-original-title="Karta">
              <i class="fas fa-user text-primary fs-5"></i>
          </a>
          <a id="${data._id}" class="ms-10" data-bs-toggle="tooltip" edit-supplier="true"
              aria-label="Përditëso"
              data-bs-original-title="Përditëso">
              <i id="${data._id}" class="fas fa-edit text-primary fs-5"></i>
          </a>
          <a id="${data._id}" class="ms-10" data-bs-toggle="tooltip"
              aria-label="Fshij" data-bs-original-title="Fshij" data-kt-delete-supplier="true">
              <i id="${data._id}" class="fas fa-trash-alt text-danger fs-5"></i>
          </a>
      </td>`;
        },
      },
    ]
  })
 
  const documentTitle = 'Lista e furnitorve';
  var buttons = new $.fn.dataTable.Buttons(suppliertable, {
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
      {
        extend: 'colvis',
        text: 'Zgjedh kolonat'
      }


    ]
  }).container().appendTo($('#print'));

  const search_input1 = document.getElementById('supplier-table-search')
  search_input1.addEventListener('keyup', (e) => {
    suppliertable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    suppliertable.search('').draw()
  }
  function editSupplier() {
  
    const n = document.querySelectorAll(
      '[edit-supplier="true"]'
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
          title: 'Edito Furnitorin',
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
             const res = await fetch('/api/v1/supply/edit-supplier', {
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
                suppliertable.search('').draw()      
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
      '[data-kt-delete-supplier="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tsuppliertableext = o.querySelectorAll('td')[2].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini furnitori: ' + tsuppliertableext,
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
                text: 'Ti fshive furnitori ' + tsuppliertableext + '!.',
                icon: 'success',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              }).then(async function () {
                const res = await fetch('/api/v1/supply/delete-supplier', {
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
                text:"Furnitori: "+tsuppliertableext+" nuk u fshi",
                icon: 'error',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              })
        })
      })
    })
  }
  suppliertable.on('draw', () => {
    editSupplier()
    swalDeleteSub()
    KTMenu.createInstances()
  })
})
function addSupplier(){
  const form = document.getElementById('form-add-supplier')
  form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    try {
    const name = document.getElementById('name').value
    const arbk = document.getElementById('arbk').value
    const address = document.getElementById('address').value
    const email = document.getElementById('email').value
    const phone_number = document.getElementById('phone_number').value
    const res = await fetch('/api/v1/supply/add-supplier', {
      method: 'POST',
      body: JSON.stringify({name,arbk,address, email, phone_number}),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.errors) {
      const e = document.getElementsByClassName('show-errors-supplier')
    for(var elm of e){
      elm.textContent=''
   }
   for(var key of Object.keys(data.errors)){

    if(data.errors[key]){
     const p = document.getElementById(`${key}-supplier-error`)
     if(p){
     p.textContent = data.errors[key]}
    }
  }
    }
    if (!data.errors) {
      const e = document.getElementsByClassName('show-errors-supplier')
      for(var elm of e){
        elm.textContent=''
     }
     document.getElementById('name').value = ""
     document.getElementById('arbk').value = ""
     document.getElementById('address').value = ""
     document.getElementById('email').value = ""
     document.getElementById('phone_number').value = ""
     showSuccessAlert(data.message)
     suppliertable.search('').draw()
    }
  } catch (err) {
    console.log(err)
  }
  })
  
}
addSupplier()