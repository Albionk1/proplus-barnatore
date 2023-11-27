let offerttable
$(document).ready(function () {
  offerttable = $('#offert_table').DataTable({
    processing: true,
    serverSide: true,
    ajax: {
      url: '/api/v1/offert/get-offerts-main',
      data: (d) => {
        d.unit = document.getElementById('unit').value,
          d.date = document.getElementById('kt_datepicker_1').value
      }
    },
    columnDefs: [
      { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'nr' },
      { data: 'invoice' },
      { data: 'client.name' },
      { data: 'date' },
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
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${!isNaN(data.total_price_Without_Discount)?parseFloat(data.total_price_Without_Discount).toFixed(2):''}
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${data.total_price?parseFloat(data.total_price-data.total_price_Without_Discount).toFixed(2):''}
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${data.total_price?data.total_price:''}
      </td>`;
        },
      },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="text-center">
          <a href="#"
              class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end">
              Opsione <i
                  class="fas fa-chevron-down fs-5 ms-1"></i>
          </a>
          <!--begin::Menu-->
          <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
              data-kt-menu="true">
              <!--Begin::Menu item-->

              ${data.isOpen ? '' : `<!--Begin::Menu item-->
              <div class="menu-item px-3">
                  <a href="/admin/sales-wholesale?offert=${data._id}"
                      class="menu-link px-3">
                      <i id="${data._id}" 
                          class="fa fa-pen-nib fs-5 me-2"></i>Kalo
                      si shitje të rregullt
                  </a>
              </div>
              <!--end::Menu item-->`}
              <div class="menu-item px-3">
              <a href="/admin/offer-new?offert=${data._id}" 
                  class="menu-link px-3">
                  <i id="${data._id}"
                      class="fas fa-eye fs-5 me-2"></i>Vështroe ofertën
              </a>
          </div>
              <!--Begin::Menu item-->
              <div class="menu-item px-3 ">
                  <a id="${data._id}" data-kt-delete-table="true"
                      class="menu-link px-3 text-danger">
                      <i id="${data._id}"
                          class="fas fa-trash-alt text-danger fs-5 me-2"></i>
                      Anuloe
                  </a>
              </div>
              <!--end::Menu item-->
          </div>
          <!--end::Menu-->
      </td>`;
        },
      },
    ], lengthMenu: [
      [10, 20, 50, 100],
      [10, 20, 50, 100],
    ]
  })
  const documentTitle = 'Lista e ofertave';
  var buttons = new $.fn.dataTable.Buttons(offerttable, {
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
  document.getElementsByClassName('dt-buttons btn-group flex-wrap')[0].classList.remove('flex-wrap')

  const search_input1 = document.getElementById('offert_table-search')
  search_input1.addEventListener('keyup', (e) => {
    offerttable.search(e.target.value).draw()
  })
  const resetSuccess = () => {
    offerttable.search('').draw()
  }
  function editOffer() {

    const n = document.querySelectorAll(
      '[edit-offerr="true"]'
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

          preConfirm: async () => {
            const name = document.getElementById('swal-name').value
            const arbk = document.getElementById('swal-arbk').value
            const address = document.getElementById('swal-address').value
            const email = document.getElementById('swal-email').value
            const phone_number = document.getElementById('swal-phone_number').value
            try {
              const res = await fetch('/api/v1/supply/edit-supplier', {
                method: 'PATCH',
                body: JSON.stringify({ id, name, arbk, address, phone_number, email }),
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
  function swalDelete() {
    const n = document.querySelectorAll(
      '[data-kt-delete-table="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tdtableext = o.querySelectorAll('td')[2].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini ofertën për klientin: ' + tdtableext,
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
              text: 'Ti e fshive oferten e klientit: ' + tdtableext + '!.',
              icon: 'success',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            }).then(async function () {
              const res = await fetch('/api/v1/offert/delete-offert', {
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
              text: "Oferta e klientit: " + tdtableext + " nuk u fshi",
              icon: 'error',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            })
        })
      })
    })
  }

  offerttable.on('draw', () => {
    KTMenu.createInstances()
    editOffer()
    swalDelete()
  })
})