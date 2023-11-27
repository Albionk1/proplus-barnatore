let countTable
$(document).ready(function () {
  countTable = $('#count_table').DataTable({
    processing: true,
    serverSide: true,
    ajax: '/api/v1/supply/get-article-count',
    columnDefs: [
      { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'nr' },
      { data: 'article_name' },
      { data: 'qty' },

      // {
      //   data: null,
      //   render: function (data, type, row) {
      //     return `<td
      //     class="text-gray-700 text-center fw-bold">
      //    ${role[data.role]}
      // </td>`;
      //   },
      // },
      {
        data: null,
        render: function (data, type, row) {
          return `<td class="text-end fw-bold pt-3">
         <div class="d-flex justify-content-around">
     <a id="${data._id}" data-bs-toggle="tooltip"
         aria-label="Përditëso" edit-qty="true"
         data-bs-original-title="Përditëso">
         <i id="${data._id}" class="fas fa-edit text-primary fs-5"></i>
     </a>
     <a id="${data._id}" data-kt-delete-table="true"
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
      '[data-kt-delete-table="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tdtableext = o.querySelectorAll('td')[1].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini numrimin e artikullit: ' + tdtableext,
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
              text: 'Ti e fshive numrimin e artikullit ' + tdtableext + '!.',
              icon: 'success',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            }).then(async function () {
              const res = await fetch('/api/v1/supply/delete-count', {
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
                countTable.draw()

              }
            })
            : 'cancel' === e.dismiss &&
            Swal.fire({
              text: "Numrimi i artikullit: " + tdtableext + " nuk u fshi",
              icon: 'error',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            })
        })
      })
    })
  }
  function editCount() {
  
    const n = document.querySelectorAll(
      '[edit-qty="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', async function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const qty = o.querySelectorAll('td')[2].innerText
        const article = o.querySelectorAll('td')[1].innerText
        const swalConfig = {
          title: `Edito Numrimin e ${article}`,
          html:
            '<div>' +
            '<p id="sw-qty-error" class="show-errors-swal text-danger mb0"></p>' +
            `<input type="number" min="0" step="1" id="swal-qty"  class="form-control form-control-solid"  value="${qty}" >` +
            '</div>',
            confirmButtonColor: '#2abf52',
          confirmButtonText: 'Ruaj',
          focusConfirm: false,
          
          preConfirm: async() => {
            const qty = document.getElementById('swal-qty').value
            try {
             const res = await fetch('/api/v1/supply/edit-count-qty', {
                method: 'PATCH',
                body: JSON.stringify({ id,qty}),
                headers: { 'Content-Type': 'application/json' }
             });
             const data = await res.json();
             if (data.status=='fail') {
                showErrorAlert(data.message)
                return false
             }
             if (data.status==='success') {
                showSuccessAlert(data.message)
                countTable.draw()      
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
  const search_input1 = document.getElementById('count_table_search')
  search_input1.addEventListener('keyup', (e) => {
    countTable.search(e.target.value).draw()
  })

  countTable.on('draw', () => {
    KTMenu.createInstances()
    swalDelete()
    editCount()
  })
})
