let dtableable
$(document).ready(function () {
   dtable = $('#company-auth').DataTable({
    processing: true,
    serverSide: true,
    ajax: '/api/v1/authorization/get-authorization',
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
        { orderable: !1, targets: 6 }
    ],
    columns: [
      { data: 'nr' },
      { data: 'token' },
      { data: 'start_time' },
      { data: 'end_time'},
      {data:null,
        render:function(data,type,row){
           return `<td class="text-center pe-0">${data.isActive?'aktiv':'pasiv'}</td>`
        }},
      {data:'comment'},
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-center fw-bold pt-3">
          <a id="${data._id}"
              data-bs-toggle="tooltip"
              aria-label="Përditëso"
              edit-abonim="true">
              <i id="${data._id}"
                  class="fas fa-edit text-primary fs-5"></i>
          </a>
          <a id="${data._id}"
              class="ms-10"
              data-bs-toggle="tooltip"
              aria-label="Fshij"
              data-kt-delete-table="true">
              <i id="${data._id}"
                  class="fas fa-trash-alt text-danger fs-5"></i>
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
  const search_input1 = document.getElementById('search-company')
  search_input1.addEventListener('keyup', (e) => {
    dtable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    dtable.search('').draw()
  }
  function editAbonim() {
  
    const n = document.querySelectorAll(
      '[edit-abonim="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', async function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const end_time = o.querySelectorAll('td')[3].innerText
        const status = o.querySelectorAll('td')[4].innerText
        const comment = o.querySelectorAll('td')[5].innerText
        const swalConfig = {
          title: 'Edito abonimin',
          html:
            '<div>' +
            '<p id="sw-end_time-error" class="show-errors-swal text-danger mb0"></p>' +
            `<input id="swal-end_time"  class="form-control form-control-solid"  value="${end_time}" >` +
            '<p id="sw-isActive-error" class="show-errors-swal text-danger mb0"></p>' +
            `<select id="swal-isActive" type="text" class="form-control form-control-solid" >` +
            `<option value="true" ${status==='aktiv'?'selected':''}>Aktive</option>`+
            `<option value="false" ${status==='pasiv'?'selected':''}>Pasive</option>`+
            `</select>`+
            '<p id="sw-comment-error" class="show-errors-swal text-danger mb0"></p>' +
            `<textarea class="form-control form-control-solid"
            name="" rows="2" id="swal-comment"
            placeholder="Shëno koment">${comment}</textarea>` +
            '</div>',
            confirmButtonColor: '#2abf52',
          confirmButtonText: 'Ruaj',
          focusConfirm: false,
          
          preConfirm: async() => {
            const end_time = document.getElementById('swal-end_time').value
            const isActive = document.getElementById('swal-isActive').value
            const comment = document.getElementById('swal-comment').value
            try {
             const res = await fetch('/api/v1/authorization/edit-authorization', {
                method: 'PATCH',
                body: JSON.stringify({ id,end_time,isActive,comment}),
                headers: { 'Content-Type': 'application/json' }
             });
             const data = await res.json();
             if (data.status=='fail') {
                showErrorAlert(data.message)
                return false
             }
             if (data.status==='success') {
                showSuccessAlert(data.message)
                dtable.search('').draw()      
                return true
             }
          }
          catch (err) {
             console.log(err);
          }
          },
          didOpen: () => {
            // Initialize Flatpickr on the input field
            $("#swal-end_time").flatpickr();
          },
        }
        
        const { value: formValues } = await Swal.fire(swalConfig)
        
      })
    })
  }
  function swalDelete() {
    const n = document.querySelectorAll(
      '[data-kt-delete-table="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tdtableext = o.querySelectorAll('td')[1].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini abonimin me kod: ' + tdtableext,
          icon: 'warning',
          showCancelButton: !0,
          buttonsStyling: !1,
          confirmButtonText: 'Po, fshije',
          cancelButtonText: "Jo, mos e fshi",
          customClass: {
            confirmButton: 'btn fw-bold btn-danger',
            cancelButton: 'btn fw-bold btn-active-light-primary',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            // User clicked "Po, fshije"
            fetch('/api/v1/authorization/delete-authorization', {
              method: 'PATCH',
              body: JSON.stringify({ id }),
              headers: { 'Content-Type': 'application/json' },
            })
              .then(async (res) => {
                const data = await res.json();
                if (data.status === 'fail') {
                  showErrorAlert(data.message);
                } else if (data.status === 'success') {
                  showSuccessAlert(data.message);
                  resetSuccess();
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // User clicked "Jo, mos e fshi"
            Swal.fire({
              text: "Abonimi me kod:" + tdtableext + " nuk u fshi",
              icon: 'error',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            });
          }
        });
        
      })
    })
  }
  dtable.on('draw', () => {
    swalDelete()
    editAbonim()
    
  })
})
function addAuthorization(){
  const form = document.getElementById('form-comp-auth')
  form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    try {
    const start_time = document.getElementById('kt_datepicker_1').value
    const end_time = document.getElementById('kt_datepicker_2').value
    const comment = document.getElementById('comment').value
    const res = await fetch('/api/v1/authorization/add-authorization', {
      method: 'POST',
      body: JSON.stringify({ start_time, end_time,comment }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.errors) {
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
    if (!data.errors) {
      const e = document.getElementsByClassName('show-errors')
      for(var elm of e){
        elm.textContent=''
     }
     showSuccessAlert(data.message)
     dtable.search('').draw()
    }
  } catch (err) {
    console.log(err)
  }
  })
  
}
addAuthorization()