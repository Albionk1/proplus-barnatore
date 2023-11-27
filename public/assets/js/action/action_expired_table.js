let actionexpiredtable
$(document).ready(function () {
   actionexpiredtable = $('#table_expire_action').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/action/get-action-by-status',
    data:(d)=>{
     d.unit = document.getElementById('expire-unit').value
     d.active = false
    }
  },
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
        { orderable: !1, targets: 0 },
        { orderable: !1, targets: 1 },
        { orderable: !1, targets: 2 },
        { orderable: !1, targets: 3 },
        { orderable: !1, targets: 4 },
        { orderable: !1, targets: 5 },
        { orderable: !1, targets: 6 },



    ],
    columns: [
      { data: 'nr' },
      { data: 'code' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${data.nr_articles?data.nr_articles:''}
      </td>`;
        },
      },

      { data: 'price_total' },
      { data: 'price_action' },
      { data: 'percent' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${moment(data.start_time).format('L')}
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${moment(data.end_time).format('L')}
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${data.beneficiaries==='all'? 'Të gjithë' :'card'}
      </td>`;
        },
      },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-center fw-bold pt-3">
          
          <a id="${data._id}"
              class="ms-10" data-kt-delete-action-expire="true"
              data-bs-toggle="tooltip"
              aria-label="Fshij"
              data-bs-original-title="Fshij">
              <i id="${data._id}"
                  class="fas fa-trash-alt text-danger fs-5"></i>
          </a>`;
        },
      },
    ],drawCallback: function(settings) {
      var api = this.api();
      var data = api.ajax.json();
    //   document.getElementById('show-prod-nr').value=data.recordsFiltered
    }
  })
  
  const documentTitle = 'Lista e aksionë';
  var buttons = new $.fn.dataTable.Buttons(actionexpiredtable, {
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
  }).container().appendTo($('#print-expire'));
  document.getElementsByClassName('dt-buttons btn-group flex-wrap')[0].classList.remove('flex-wrap')
  const search_input1 = document.getElementById('table-expire-search')
  search_input1.addEventListener('keyup', (e) => {
    actionexpiredtable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    actionexpiredtable.search(document.getElementById('table-expire-search').value).draw()
  }
  function swalDeleteSub() {
    const n = document.querySelectorAll(
      '[data-kt-delete-action-expire="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tactiontableext = o.querySelectorAll('td')[1].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini aksionin: ' + tactiontableext+' ',
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
                text: 'Ti fshive  alsionin: ' + tactiontableext + '.',
                icon: 'success',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              }).then(async function () {
                const res = await fetch('/api/v1/action/delete-action', {
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
                text:"Aksioni nuk u fshi",
                icon: 'error',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              })
        })
      })
    })
  }
  actionexpiredtable.on('draw', () => {
    swalDeleteSub()
    KTMenu.createInstances()
  })
})

$('#unit-active').change(()=>{
    actionexpiredtable.search(document.getElementById('table-expire-search').value).draw()
})