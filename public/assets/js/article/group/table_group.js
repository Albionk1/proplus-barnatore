let dtable
$(document).ready(function () {
   dtable = $('#group_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:'/api/v1/article/get-groups',
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
          <a id="${data._id}" data-bs-toggle="tooltip" data-kt-delete-group="true"
              data-bs-original-title="Fshij">
              <i id="${data._id}" class="fas fa-times text-danger fs-3 pt-1 "></i>
          </a>
      </td>`;
        },
      },
    ]
  })
  // const documentTitle = 'Lista e klientëve';
  // var buttons = new $.fn.dataTable.Buttons(dtable, {
  //     buttons: [
  //         {
  //             extend: 'excelHtml5',
  //             title: documentTitle,
  //             exportOptions: {
  //               columns: ':visible'
  //           }
  //         },
  //         {
  //             extend: 'pdfHtml5',
  //             title: documentTitle,
  //             exportOptions: {
  //               columns: ':visible'
  //           }
  //         },
  //         {
  //           extend: 'print',
  //           title: documentTitle,
  //           exportOptions: {
  //             columns: ':visible'
  //         }
  //       },
  //       {extend:'colvis',
  //     text:'Zgjedh kolonat'}
        
          
  //     ]
  // }).container().appendtableo($('#toolbar-print'));
  const search_input1 = document.getElementById('group-table-search')
  search_input1.addEventListener('keyup', (e) => {
    dtable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    dtable.search('').draw()
  }
  function swalDelete() {
    
    const select = $('#subgroup-grname');
    const select1 = $('#group');
const select2Instance = select.select2();
const select2Instance1 = select1.select2();
    const n = document.querySelectorAll(
      '[data-kt-delete-group="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tdtableext = o.querySelectorAll('td')[1].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini grupin: ' + tdtableext,
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
                text: 'Ti fshive grupin ' + tdtableext + '!.',
                icon: 'success',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              }).then(async function () {
                const res = await fetch('/api/v1/article/delete-group', {
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
                   const optionToRemove = select.find(`option[value="${id}"]`);
                   if (optionToRemove.length > 0) {
                     optionToRemove.remove();
                     select2Instance.trigger('change');
                   }
                   const optionToRemove1 = select1.find(`option[value="${id}"]`);
                   if (optionToRemove1.length > 0) {
                     optionToRemove1.remove();
                     select2Instance1.trigger('change');
                   }
                }
              })
            : 'cancel' === e.dismiss &&
              Swal.fire({
                text:"Grupi: "+tdtableext+" nuk u fshi",
                icon: 'error',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              })
        })
      })
    })
  }
  dtable.on('draw', () => {
    swalDelete()
    KTMenu.createInstances()
  })
})
function addGrup(){
  const form = document.getElementById('form-add-grup')
  form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    try {
    const name = document.getElementById('group_name').value
    const res = await fetch('/api/v1/article/add-group', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.errors) {
      const e = document.getElementsByClassName('show-errors-group')
    for(var elm of e){
      elm.textContent=''
   }
   for(var key of Object.keys(data.errors)){

    if(data.errors[key]){
     const p = document.getElementById(`${key}-group-error`)
     if(p){
     p.textContent = data.errors[key]}
    }
  }
    }
    if (!data.errors) {
      const e = document.getElementsByClassName('show-errors-group')
      for(var elm of e){
        elm.textContent=''
     }
     showSuccessAlert(data.message)
     dtable.search('').draw()

     // Set the value and text for the new option
     const newOption = $('<option>', {
      value: data.id,
      text: name
    });
    const newOption1 = $('<option>', {
      value: data.id,
      text: name
    });
    $('#subgroup-grname').append(newOption);
    $('#group').append(newOption1);
     $('#subgroup-grname').trigger('change.select2');
     $('#group').trigger('change.select2');
    }
  } catch (err) {
    console.log(err)
  }
  })
  
}
addGrup()