let supplierTableReturn
$(document).ready(function () {
  supplierTableReturn = $('#supply_table_return').DataTable({
    processing: true,
    serverSide: true,
    ajax: {
      url: '/api/v1/supply/get-supplies-list',
      data: (d) => {
        d.type = 'returned_supply',
          d.unit = document.getElementById('unit').value,
          d.year = document.getElementById('year-return').value,
          d.status = document.getElementById('status-return').value
      }
    },
    columnDefs: [
      { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'nr' },
      { data: 'supplier.name' },
      { data: 'invoice' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
          ${data.nr_producs?data.nr_producs:0}
      </td>`;
        },
      },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
          ${data.date}
      </td>`;
        },
      },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
          ${data.price?parseFloat(data.price).toFixed(2):''}
      </td>`;
        },
      },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-end fw-bold pt-3">
          <a href="/admin/supplier-see/${data.supplyId}"
          data-bs-toggle="tooltip"
          aria-label="Shiko"
          data-bs-original-title="Shiko furnitorin">
          <i
                class="fas fa-eye text-success fs-5"></i>
        </a>
          <a id="${data._id}"
          class="ms-5"
          edit-supply-return="true"
              data-bs-toggle="tooltip"
              aria-label="Edito"
              data-bs-original-title="Edito">
              <i id="${data._id}"
                  class="fas fa-edit text-primary fs-5"></i>
          </a>
          ${data.isOpen ? `<a href="/admin/supply-new?supply=${data._id}"
          class="ms-5"
          data-bs-toggle="tooltip"
          aria-label="Shiko"
          data-bs-original-title="Shiko">
          <i
                class="fas fa-eye text-primary fs-5"></i>
        </a>`:''}
          
            <a class="ms-5" id="${data._id}" data-bs-toggle="tooltip"
             data-kt-delete-table-expense="true"
                 aria-label="Fshij"
                 data-bs-original-title="Fshij">
                 <i id="${data._id}"
                     class="fas fa-trash text-danger fs-3 pt-1 "></i>
             </a>
             </td>`;
        },
      },
    ], lengthMenu: [
      [10, 20, 50, 100],
      [10, 20, 50, 100],
    ]
  })
  const documentTitle = 'Lista e furnizimeve';
  var buttons = new $.fn.dataTable.Buttons(supplierTableReturn, {
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
  }).container().appendTo($('#print-return'));
  document.getElementsByClassName('dt-buttons btn-group flex-wrap')[0].classList.remove('flex-wrap')

  const search_input1 = document.getElementById('supply_table_return_search')
  search_input1.addEventListener('keyup', (e) => {
    supplierTableReturn.search(e.target.value).draw()
  })
  const resetSuccess = () => {
    supplierTableReturn.search('').draw()
  }

  function editSupply() {

    const n = document.querySelectorAll(
      '[edit-supply-return="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', async function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const invoice = o.querySelectorAll('td')[1].innerText
        const date = o.querySelectorAll('td')[3].innerText
        const swalConfig = {
          title: 'Edito Furnizimin',
          html:
            '<div>' +
            '<p id="sw-invoice-error" class="show-errors-swal text-danger mb0"></p>' +
            `<input id="swal-invoice" type="text"  class="form-control form-control-solid" placeholder="Shëno numrin e faturës" value="${invoice}" >` +
            '<p id="sw-date-error" class="show-errors-swal text-danger mb0"></p>' +
            `<input id="swal-date"   class="form-control form-control-solid"  placeholder="Shëno datë e faturës" value="${date}" >` +
            '</div>',
          confirmButtonColor: '#2abf52',
          confirmButtonText: 'Ruaj',
          focusConfirm: false,

          preConfirm: async () => {
            const invoice = document.getElementById('swal-invoice').value
            const date = document.getElementById('swal-date').value
            try {
              const res = await fetch('/api/v1/supply/edit-supply', {
                method: 'PATCH',
                body: JSON.stringify({ id, invoice, date,}),
                headers: { 'Content-Type': 'application/json' }
              });
              const data = await res.json();
              if (data.status == 'fail') {
                const e = document.getElementsByClassName('show-errors-swal')
                for (var elm of e) {
                  elm.textContent = ''
                }
                for (var key of Object.keys(data.errors)) {

                  if (data.errors[key]) {
                    const p = document.getElementById(`sw-${key}-error`)
                    if (p) {
                      p.textContent = data.errors[key]
                    }
                  }
                }
                // showErrorAlert(data.message)
                return false
              }
              if (data.status === 'success') {
                showSuccessAlert(data.message)
                supplierTableReturn.search(document.getElementById('supply_table_return_search').value).draw()
                return true
              }
            }
            catch (err) {
              console.log(err);
            }
          },
          didOpen: () => {
            // Initialize Flatpickr on the input field
            $("#swal-date").flatpickr();
          },
        }

        const { value: formValues } = await Swal.fire(swalConfig)

      })
    })
  }

  function swalDelete() {
    const n = document.querySelectorAll(
      '[data-kt-delete-table-expense="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tdtableext = o.querySelectorAll('td')[2].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini furnizimin: ' + tdtableext,
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
              text: 'Ti e fshive furnizimin : ' + tdtableext + '!.',
              icon: 'success',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            }).then(async function () {
              const res = await fetch('/api/v1/supply/delete-supply', {
                method: 'PATCH',
                body: JSON.stringify({ id }),
                headers: { 'Content-Type': 'application/json' }

              });
              const data = await res.json();
              if (data.status == 'fail') {
                showErrorAlert(data.message)
              }
              if (data.status == 'success') {
                showSuccessAlert(data.message)
                resetSuccess()
              }
            })
            : 'cancel' === e.dismiss &&
            Swal.fire({
              text: "Furnizimin : " + tdtableext + " nuk u fshi",
              icon: 'error',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            })
        })
      })
    })
  }
  supplierTableReturn.on('draw', () => {
    KTMenu.createInstances()
    swalDelete()
    editSupply()
  })
})


$('#year-return').change(()=>{
  supplierTableReturn.search(document.getElementById('supply_table_return_search').value).draw()

})
$('#status-return').change(()=>{
  supplierTableReturn.search(document.getElementById('supply_table_return_search').value).draw()

})