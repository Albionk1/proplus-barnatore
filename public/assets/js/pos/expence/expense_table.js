let expensesTable
$(document).ready(function () {
    $('select:not(.normal)').each(function () {
        $(this).select2({
            dropdownParent: $(this).parent()
        });
    });
   expensesTable = $('#expense_table').DataTable({
    processing: true,
    paging: true,  
    serverSide: true,
    ajax:'/api/v1/sales/get-expenses',
    columnDefs: [
        // { className: "text-center pe-0", targets: "_all" },
    ],
   
    columns: [
      { data: 'nr' },
      { data: 'category_name' },
      { data: 'amount' },
      { data: 'comment' },
      {
        data: null,
        className: 'text-center pe-0',
        render: function (data, type, row) {
          return ` <a id="${data._id}" data-bs-toggle="tooltip" aria-label="Fshij" data-kt-delete-table-expense="true"
          data-bs-original-title="Fshij">
          <i id="${data._id}"class="fas fa-times text-danger fs-3 pt-1 "></i>
      </a>`;
        },
      },
    ]
  })
  

  const search_input1 = document.getElementById('expense_table_search')
  search_input1.addEventListener('keyup', (e) => {
    expensesTable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    expensesTable.search(document.getElementById('expense_table_search').value).draw()
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
        const tdtableext = o.querySelectorAll('td')[1].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini shpenzimin : ' + tdtableext,
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
                text: 'Ti e fshive   shpenzimin: ' + tdtableext,
                icon: 'success',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              }).then(async function () {
                const res = await fetch('/api/v1/sales/remove-expense', {
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
                text:"Shpenzimi: "+tdtableext+" nuk u fshi",
                icon: 'error',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              })
        })
      })
    })
  }
  expensesTable.on('draw', () => {
    KTMenu.createInstances()
    swalDelete()
  })
})