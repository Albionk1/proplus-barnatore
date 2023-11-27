let dtable
$(document).ready(function () {
  dtable = $('#unit-table').DataTable({
    processing: true,
    serverSide: true,
    ajax: '/api/v1/auth/get-units',
    columnDefs: [
      { className: "text-center pe-0", targets: "_all" },
      { orderable: !1, targets: 4 },
      { orderable: !1, targets: 5 }
    ],
    columns: [
      { data: 'nr' },
      { data: 'company_name' },
      { data: 'unit_name' },
      { data: 'address' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td class="text-center pe-0">0</td>`
        }
      },
      { data: 'token.token' },

      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return ` <td class="text-center fw-bold pt-3">
          <a id="${data._id}" class="menu-link px-3" edit-unit="true" data-bs-toggle="tooltip"
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
  const search_input1 = document.getElementById('unit-search')
  search_input1.addEventListener('keyup', (e) => {
    dtable.search(e.target.value).draw()
  })
  const resetSuccess = () => {
    dtable.search('').draw()
  }
  function editAbonim() {

    const n = document.querySelectorAll(
      '[edit-unit="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', async function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const unit_name = o.querySelectorAll('td')[2].innerText
        const address = o.querySelectorAll('td')[3].innerText
        const swalConfig = {
          title: 'Edito Njesin',
          html:
            '<div>' +
            '<p id="sw-unit_name-error" class="show-errors-swal text-danger mb0"></p>' +
            `<input id="swal-unit_name"  class="form-control form-control-solid"  value="${unit_name}" >` +
            '<p id="sw-address-error" class="show-errors-swal text-danger mb0"></p>' +
            `<input id="swal-address"  class="form-control form-control-solid"  value="${address}" >` +
            '</div>',
          confirmButtonColor: '#2abf52',
          confirmButtonText: 'Ruaj',
          focusConfirm: false,

          preConfirm: async () => {
            const unit_name = document.getElementById('swal-unit_name').value
            const address = document.getElementById('swal-address').value
            try {
              const res = await fetch('/api/v1/auth/edit-unit', {
                method: 'PATCH',
                body: JSON.stringify({ id, unit_name, address }),
                headers: { 'Content-Type': 'application/json' }
              });
              const data = await res.json();
              if (data.status == 'fail') {
                showErrorAlert(data.message)
                return false
              }
              if (data.status === 'success') {
                showSuccessAlert(data.message)
                dtable.search('').draw()
                return true
              }
            }
            catch (err) {
              console.log(err);
            }
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
        }).then(function (e) {
          e.value
            ? Swal.fire({
              text: 'Tie fshive abonimin me kod ' + tdtableext + '!.',
              icon: 'success',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            }).then(async function () {
              const res = await fetch('/api/v1/authorization/delete-authorization', {
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
              text: "Abonimi me kod:" + tdtableext + " nuk u fshi",
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
    editAbonim()
    KTMenu.createInstances()
  })
})
function addUnit() {
  const form = document.getElementById('form-add-unit')
  const select = $('#token');
  const select2Instance = select.select2();
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
      const dataObj={unit_name:document.getElementById('unit_name').value,address:document.getElementById('address').value,token:document.getElementById('token').value}
      const unit_price = document.getElementById('unit_price')
      if(unit_price){
        if(!unit_price.value){
         return document.getElementById('unit_price-error').textContent='Zgjedhni njesin që doni tja kopjoni qmimet'
        }
        else{
          dataObj.unit_price=unit_price.value
        }
      }
      showLoadingSpinner()
      const res = await fetch('/api/v1/auth/add-unit', {
        method: 'POST',
        body: JSON.stringify(dataObj),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      hideLoadingSpinner()
      if (data.errors) {
        const e = document.getElementsByClassName('show-errors')
        for (var elm of e) {
          elm.textContent = ''
        }
        for (var key of Object.keys(data.errors)) {

          if (data.errors[key]) {
            const p = document.getElementById(`${key}-error`)
            if (p) {
              p.textContent = data.errors[key]
            }
          }
        }
      }
      if (!data.errors) {
        const e = document.getElementsByClassName('show-errors')
        for (var elm of e) {
          elm.textContent = ''
        }
        showSuccessAlert(data.message)
        dtable.search('').draw()
        const optionToRemove = select.find(`option[value="${token}"]`);
        if (optionToRemove.length > 0) {
          optionToRemove.remove();
          select2Instance.trigger('change');
        }
      }
    } catch (err) {
      hideLoadingSpinner()
      console.log(err)
    }
  })

}
addUnit()