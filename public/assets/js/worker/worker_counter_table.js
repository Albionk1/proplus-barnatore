let workerCounttable
$(document).ready(function () {
  moment.locale('sq')
  workerCounttable = $('#worker_count_table').DataTable({
    processing: true,
    serverSide: true,
    ajax: {
      url: '/api/v1/auth/get-workers-count',
      data: (d) => {
        d.unit = document.getElementById('unit').value
      }
    },
    columnDefs: [
      { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'nr' },
      { data: 'full_name' },
      { data: 'username' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${moment(data.createdAt).format('LLL')}
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td class="text-end fw-bold pt-3">
         <div class="d-flex justify-content-around">
     <a id="${data._id}" data-bs-toggle="tooltip" data-kt-delete-counter-table="true"
         aria-label="Fshij" data-bs-original-title="Fshij">
         <i id="${data._id}" class="fas fa-trash-alt text-danger fs-5"></i>
     </a>
         </div>
      </td>`;
        },
      },
    ], lengthMenu: [
      [10, 20, 50, 100],
      [10, 20, 50, 100],
    ]
  })
  function swalDelete() {
    const n = document.querySelectorAll(
      '[data-kt-delete-counter-table="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tdtableext = o.querySelectorAll('td')[1].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini puntorin: ' + tdtableext,
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
              text: 'Ti e fshive puntorin ' + tdtableext + '!.',
              icon: 'success',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            }).then(async function () {
              const res = await fetch('/api/v1/auth/delete-worker', {
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
                workerCounttable.search(document.getElementById('worker_table_search').value).draw()

              }
            })
            : 'cancel' === e.dismiss &&
            Swal.fire({
              text: "Puntori :" + tdtableext + " nuk u fshi",
              icon: 'error',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            })
        })
      })
    })
  }
  const search_input1 = document.getElementById('worker_count_table_search')
  search_input1.addEventListener('keyup', (e) => {
    workerCounttable.search(e.target.value).draw()
  })

  workerCounttable.on('draw', () => {
    KTMenu.createInstances()
    swalDelete()
  })
})
