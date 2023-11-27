let suppliertable
$(document).ready(function () {
  suppliertable = $('#table_lolyalty_card').DataTable({
    processing: true,
    serverSide: true,
    ajax: '/api/v1/loyaltycard/get-loyaltycards',
    columnDefs: [
      { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'nr' },
      { data: 'code' },
      { data: 'name' },
      { data: 'email' },
      { data: 'phone_number' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
          25
      </td>`;
        },
      },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-end fw-bold pt-3">         
            <a id="${data._id}" data-bs-toggle="tooltip"
             data-kt-delete-table="true"
                 aria-label="Fshij"
                 data-bs-original-title="Fshij">
                 <i id="${data._id}"
                     class="fas fa-trash text-danger fs-3 pt-1 "></i>
             </a>
             </td>`;
        },
      },
    ], drawCallback: function (settings) {
      var api = this.api();
      var data = api.ajax.json();
      document.getElementById('total-clients').textContent = data.recordsFiltered
    }, lengthMenu: [
      [10, 20, 50, 100],
      [10, 20, 50, 100],
    ]
  })


  const search_input1 = document.getElementById('table_lolyalty_card_search')
  search_input1.addEventListener('keyup', (e) => {
    suppliertable.search(e.target.value).draw()
  })
  const resetSuccess = () => {
    suppliertable.search(document.getElementById('table_lolyalty_card_search').value).draw()
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
          text: 'A jeni të sigurt që doni ta fshini klientin: ' + tdtableext,
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
              text: 'Ti e fshive klientin : ' + tdtableext + '!.',
              icon: 'success',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            }).then(async function () {
              const res = await fetch('/api/v1/loyaltycard/delete-loyaltycard', {
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
              text: "Klienti : " + tdtableext + " nuk u fshi",
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
    KTMenu.createInstances()
    swalDelete()
  })
})