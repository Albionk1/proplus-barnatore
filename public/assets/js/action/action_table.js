let actiontable
$(document).ready(function () {
   actiontable = $('#action_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/action/get-action-article',
    data:(d)=>{
     d.action = location.pathname.split('/')[3]
    }
  },
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
        { orderable: !1, targets: 0 },
        { orderable: !1, targets: 2 },
        { orderable: !1, targets: 3 },
        { orderable: !1, targets: 4 },


    ],
    columns: [
      { data: 'nr' },
      { data: 'article.name' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${data.price_now_many?data.price_now_many:data.price_now_few}
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${data.price_action_few?data.price_action_few:data.price_action_many}
      </td>`;
        },
      },
      { data: 'percent' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
          <a id="${data._id}" data-bs-toggle="tooltip" data-kt-delete-action="true"
              aria-label="Fshij"
              data-bs-original-title="Fshij">
              <i id="${data._id}"
                  class="fas fa-trash text-danger fs-3 pt-1 "></i>
          </a>
      </td>`;
        },
      },
    ],drawCallback: function(settings) {
      var api = this.api();
      var data = api.ajax.json();
      document.getElementById('show-prod-nr').value=data.recordsFiltered
    }
  })
  
  const documentTitle = 'Lista e artikujve në aksionë';
  var buttons = new $.fn.dataTable.Buttons(actiontable, {
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
  const search_input1 = document.getElementById('action_table-search')
  search_input1.addEventListener('keyup', (e) => {
    actiontable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    actiontable.search('').draw()
  }
  function swalDeleteSub() {
    const n = document.querySelectorAll(
      '[data-kt-delete-action="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tactiontableext = o.querySelectorAll('td')[1].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini artikullin: ' + tactiontableext+' nga aksioni',
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
                text: 'Ti fshive  artikullin: ' + tactiontableext + ' nga aksioni!.',
                icon: 'success',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              }).then(async function () {
                const res = await fetch('/api/v1/action/delete-action-article', {
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
                text:"Artikulli nuk u fshi nga aksioni",
                icon: 'error',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              })
        })
      })
    })
  }
  actiontable.on('draw', () => {
    swalDeleteSub()
    KTMenu.createInstances()
  })
})