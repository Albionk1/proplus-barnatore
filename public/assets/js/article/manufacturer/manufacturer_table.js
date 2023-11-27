let manufacturertable
$(document).ready(function () {
   manufacturertable = $('#manufacturer_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:'/api/v1/article/get-manufactures',
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
        { orderable: !1, targets: 2 },
    ],
    columns: [
      { data: 'nr' },
      { data: 'name' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="text-gray-700 text-center fw-bold">
          <a id="${data._id}" data-bs-toggle="tooltip" data-kt-delete-manufacturer="true">
              <i id="${data._id}" class="fas fa-times text-danger fs-3 pt-1 "></i>
          </a>
      </td>`;
        },
      },
    ]
  })
 
  const search_input1 = document.getElementById('manufacturer-table-search')
  search_input1.addEventListener('keyup', (e) => {
    manufacturertable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    manufacturertable.search('').draw()
  }
  function swalDeleteSub() {
    const select1 = $('#manufacturer');
const select2Instance1 = select1.select2();
    const n = document.querySelectorAll(
      '[data-kt-delete-manufacturer="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tmanufacturertableext = o.querySelectorAll('td')[2].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini prodhuesin: ' + tmanufacturertableext,
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
                text: 'Ti fshive prodhuesin ' + tmanufacturertableext + '!.',
                icon: 'success',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              }).then(async function () {
                const res = await fetch('/api/v1/article/delete-manufacturer', {
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
                   const optionToRemove1 = select1.find(`option[value="${id}"]`);
                   if (optionToRemove1.length > 0) {
                     optionToRemove1.remove();
                     select2Instance1.trigger('change');
                   }
                }
              })
            : 'cancel' === e.dismiss &&
              Swal.fire({
                text:"Prodhuesi: "+tmanufacturertableext+" nuk u fshi",
                icon: 'error',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              })
        })
      })
    })
  }
  manufacturertable.on('draw', () => {
    swalDeleteSub()
    KTMenu.createInstances()
  })
})
function addManufacturerGrup(){
  const form = document.getElementById('form-add-manufacturer')
  form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    try {
    const name = document.getElementById('manufacturer-name').value
    const res = await fetch('/api/v1/article/add-manufacturer', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.errors) {
      const e = document.getElementsByClassName('show-errors-manufacturer')
    for(var elm of e){
      elm.textContent=''
   }
   for(var key of Object.keys(data.errors)){

    if(data.errors[key]){
     const p = document.getElementById(`${key}-manufacturer-error`)
     if(p){
     p.textContent = data.errors[key]}
    }
  }
    }
    if (!data.errors) {
      const e = document.getElementsByClassName('show-errors-manufacturer')
      for(var elm of e){
        elm.textContent=''
     }
     const newOption = $('<option>', {
      value: data.id,
      text: name
    });
    $('#manufacturer').append(newOption);
    $('#manufacturer').trigger('change.select2');
     showSuccessAlert(data.message)
     manufacturertable.search('').draw()
    }
  } catch (err) {
    console.log(err)
  }
  })
  
}
addManufacturerGrup()