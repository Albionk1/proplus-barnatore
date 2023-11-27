let dtable
$(document).ready(function () {
  dtable = $('#politic_table').DataTable({
    processing: true,
    serverSide: true,
    ajax: '/api/v1/auth/get-politics',
    columnDefs: [
      { className: "text-center pe-0", targets: "_all" },
      { orderable: !1, targets: 4 },
      { orderable: !1, targets: 5 }
    ],
    columns: [
      { data: 'nr' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td class="text-center pe-0">${data.keyboard?'Po':'Jo'}</td>`
        }
      },
      { data: 'message_few' },
      { data: 'message_many' },
     {
        data: null,
        render: function (data, type, row) {
          return `<td class="text-center pe-0">${data.sales_minus?'Po':'Jo'}</td>`
        }
      },
      { data: 'printer' },
      { data: 'unit.unit_name' },
      { data: 'message_bill' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return ` <td class="text-center fw-bold pt-3">
          <a id="${data._id}" class="menu-link px-3" edit-politic="true" data-bs-toggle="tooltip"
          aria-label="Edito"
          data-bs-original-title="Edito">
                          <i id="${data._id}"
                              class="fas fa-edit text-primary fs-5 me-2"></i>
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
  const search_input1 = document.getElementById('politic_table-search')
  search_input1.addEventListener('keyup', (e) => {
    dtable.search(e.target.value).draw()
  })
  const resetSuccess = () => {
    dtable.search('').draw()
  }
  function editPolitics() {

    const n = document.querySelectorAll(
      '[edit-politic="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', async function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const unit_name = o.querySelectorAll('td')[6].innerText
        const keyboard = o.querySelectorAll('td')[1].innerText
        const message_few = o.querySelectorAll('td')[2].innerText
        const message_many = o.querySelectorAll('td')[3].innerText
        const sales_minus = o.querySelectorAll('td')[4].innerText
        const printer = o.querySelectorAll('td')[5].innerText
        const message_bill = o.querySelectorAll('td')[7].innerText



        
        const swalConfig = {
            title: 'Edito politikat e '+unit_name,
            html:
              '<div>' +
              '<p id="sw-keyboard-error" class="show-errors-swal text-danger mb0"></p>' +
              `<select id="swal-keyboard" type="text" class="form-control form-control-solid" >` +
              `<option value="true" ${keyboard==='Po'?'selected':''}>Po</option>`+
              `<option value="false" ${keyboard==='Jo'?'selected':''}>Jo</option>`+
              `</select>`+
              '<p id="sw-message_few-error" class="show-errors-swal text-danger mb0"></p>' +
              `<input id="swal-message_few"  class="form-control form-control-solid"  value="${message_few}" >` +
              '<p id="sw-message_many-error" class="show-errors-swal text-danger mb0"></p>' +
              `<input id="swal-message_many"  class="form-control form-control-solid"  value="${message_many}" >` +
              '<p id="sw-sales_minus-error" class="show-errors-swal text-danger mb0"></p>' +
              `<select id="swal-sales_minus" type="text" class="form-control form-control-solid" >` +
              `<option value="true" ${sales_minus==='Po'?'selected':''}>Po</option>`+
              `<option value="false" ${sales_minus==='Jo'?'selected':''}>JO</option>`+
              `</select>`+
              '<p id="sw-printer-error" class="show-errors-swal text-danger mb0"></p>' +
              `<input id="swal-printer"  class="form-control form-control-solid"  value="${printer}" >` +
              '<p id="sw-message_bill-error" class="show-errors-swal text-danger mb0"></p>' +
              `<input id="swal-message_bill"  class="form-control form-control-solid"  value="${message_bill}" >` +
              '</div>',
              confirmButtonColor: '#2abf52',
            confirmButtonText: 'Ruaj',
            focusConfirm: false,
            
            preConfirm: async() => {
                const keyboard = document.getElementById('swal-keyboard').value
        const message_few = document.getElementById('swal-message_few').value
        const message_many =document.getElementById('swal-message_many').value
        const sales_minus = document.getElementById('swal-sales_minus').value
        const printer = document.getElementById('swal-printer').value
        const message_bill = document.getElementById('swal-message_bill').value

              try {
               const res = await fetch('/api/v1/auth/edit-politic', {
                  method: 'PATCH',
                  body: JSON.stringify({ id,keyboard,message_few,message_many,sales_minus,printer,message_bill}),
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
  dtable.on('draw', () => {
    editPolitics()
    KTMenu.createInstances()
  })
})