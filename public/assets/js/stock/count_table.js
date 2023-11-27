let countTable
$(document).ready(function () {
  moment.locale('sq')
  countTable = $('#count_table').DataTable({
    processing: true,
    serverSide: true,
    ajax: {
      url: '/api/v1/article/get-articles-stock-count',
      data: (d) => {
        d.unit=document.getElementById('unit').value
      }
    },
    columnDefs: [
      { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'nr' },
      { data: 'user.full_name' },
      { data: 'article.name' },
      { data: 'system_qty' },
      { data: 'qty' },
      {
        data: null,
        render: function (data, type, row) {
          let difference =data.qty  - data.system_qty
          return `<td class="text-center fw-bold pt-3">
          <div class="d-flex justify-content-around">
             ${difference>0?"+"+difference:difference}
          </div>
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td class="text-center fw-bold pt-3">
          <div class="d-flex justify-content-around">
             ${moment(data.createdAt).format('LLL')}
          </div>
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td class="text-center fw-bold pt-3">
          <div class="d-flex justify-content-around">
              <a id="${data._id}" data-bs-toggle="tooltip"
                  aria-label="Prano" data-kt-accept-table="true"
                  data-bs-original-title="Prano">
                  <i id="${data._id}"
                      class="fas fa-check text-success fs-5"></i>
              </a>
              <a id="${data._id}" data-bs-toggle="tooltip"
                  aria-label="Prano" data-kt-accept-table="true"
                  data-bs-original-title="Prano">
                  <i id="${data._id}"
                      class="fas fa-plus text-primary fs-5"></i>
              </a>
              <a id="${data._id}" data-bs-toggle="tooltip"
                  aria-label="Refuzo" data-kt-refuze-table="true"
                  data-bs-original-title="Refuzo">
                  <i id="${data._id}"
                      class="fas fa-trash-alt text-danger fs-5"></i>
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
  function swalAccept() {
    const n = document.querySelectorAll(
      '[data-kt-accept-table="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tdtableext = o.querySelectorAll('td')[2].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta pranoni numrimin e artikullit: ' + tdtableext,
          icon: 'warning',
          showCancelButton: !0,
          buttonsStyling: !1,
          confirmButtonText: 'Po, prano',
          cancelButtonText: "Jo, mos e prano",
          customClass: {
            confirmButton: 'btn fw-bold btn-success',
            cancelButton: 'btn fw-bold btn-active-light-primary',
          },
        }).then(function (e) {
          e.value
            ? Swal.fire({
              text: 'Ti e pranonve numrimin e artikullit ' + tdtableext + '!.',
              icon: 'success',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            }).then(async function () {
              const res = await fetch('/api/v1/article/accept-article-count', {
                method: 'PATCH',
                body: JSON.stringify({ id,unit:document.getElementById('unit').value }),
                headers: { 'Content-Type': 'application/json' }

              });
              const data = await res.json();
              if (data.status == 'fail') {
                showErrorAlert(data.message)
              }
              if (data.status == 'success') {
                showSuccessAlert(data.message)
                countTable.draw()

              }
            })
            : 'cancel' === e.dismiss &&
            Swal.fire({
              text: "Numrimi i artikullit: " + tdtableext + " nuk u pranua",
              icon: 'error',
              buttonsStyling: !1,  
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            })
        })
      })
    })
  }
  function swalAdd() {
    const n = document.querySelectorAll(
      '[data-kt-accept-table="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tdtableext = o.querySelectorAll('td')[2].innerText
        const tdqty = o.querySelectorAll('td')[4].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ti shtoni sasin e ' + tdtableext +' për '+tdqty,
          icon: 'warning',
          showCancelButton: !0,
          buttonsStyling: !1,
          confirmButtonText: 'Po, prano',
          cancelButtonText: "Jo, mos e prano",
          customClass: {
            confirmButton: 'btn fw-bold btn-success',
            cancelButton: 'btn fw-bold btn-active-light-primary',
          },
        }).then(function (e) {
          e.value
            ? Swal.fire({
              text: 'Ti e pranove shtimin numrimin e artikullit ' + tdtableext + '!.',
              icon: 'success',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            }).then(async function () {
              const res = await fetch('/api/v1/article/add-article-count', {
                method: 'PATCH',
                body: JSON.stringify({ id,unit:document.getElementById('unit').value }),
                headers: { 'Content-Type': 'application/json' }

              });
              const data = await res.json();
              if (data.status == 'fail') {
                showErrorAlert(data.message)
              }
              if (data.status == 'success') {
                showSuccessAlert(data.message)
                countTable.draw()

              }
            })
            : 'cancel' === e.dismiss &&
            Swal.fire({
              text: "Numrimi i artikullit: " + tdtableext + " nuk u pranua",
              icon: 'error',
              buttonsStyling: !1,  
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            })
        })
      })
    })
  }
  function swalDelete() {
    const n = document.querySelectorAll(
      '[data-kt-refuze-table="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tdtableext = o.querySelectorAll('td')[2].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta refuzoni numrimin e artikullit: ' + tdtableext,
          icon: 'warning',
          showCancelButton: !0,
          buttonsStyling: !1,
          confirmButtonText: 'Po, refuzoje',
          cancelButtonText: "Jo, mos e refuzo",
          customClass: {
            confirmButton: 'btn fw-bold btn-danger',
            cancelButton: 'btn fw-bold btn-active-light-primary',
          },
        }).then(function (e) {
          e.value
            ? Swal.fire({
              text: 'Ti e refuzove numrimin e artikullit ' + tdtableext + '!.',
              icon: 'success',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            }).then(async function () {
              const res = await fetch('/api/v1/article/refuze-article-count', {
                method: 'PATCH',
                body: JSON.stringify({ id,unit:document.getElementById('unit').value }),
                headers: { 'Content-Type': 'application/json' }

              });
              const data = await res.json();
              if (data.status == 'fail') {
                showErrorAlert(data.message)
              }
              if (data.status == 'success') {
                showSuccessAlert(data.message)
                countTable.draw()

              }
            })
            : 'cancel' === e.dismiss &&
            Swal.fire({
              text: "Numrimi i artikullit: " + tdtableext + " nuk u refuzua",
              icon: 'error',
              buttonsStyling: !1,  
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            })
        })
      })
    })
  }
  
  const search_input1 = document.getElementById('count_table_search')
  search_input1.addEventListener('keyup', (e) => {
    countTable.search(e.target.value).draw()
  })

  countTable.on('draw', () => {
    KTMenu.createInstances()
    swalDelete()
    swalAccept()
    swalAdd()
  })
})
$('#unit').change(()=>{
  countTable.draw()
 })