let supplytable
$(document).ready(function () {
   supplytable = $('#supply_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/article/get-supplys-for-article',
    data:(d)=>{
      d.article = location.pathname.split('/')[3]
    }
  },
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'nr' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${parseFloat(data.total_price/data.qty).toFixed(2)}€
      </td>`;
        },
      },
      { data: 'qty' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${parseFloat(data.total_price).toFixed(2)}€
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td class="text-center fw-bold pt-3">
          <div class="d-flex justify-content-around">
              <a id="${data._id}" data-bs-toggle="tooltip"
                  aria-label="Prano" data-kt-edit-table="true"
                  data-bs-original-title="Prano">
                  <i id="${data._id}"
                      class="fas fa-edit text-primary fs-5"></i>
              </a>
          </div>
      </td>`;
        },
      },
    ],lengthMenu: [
      [10,20,50,100],
      [10,20,50,100],
  ]
  })
  function editSupply() {

    const n = document.querySelectorAll(
      '[data-kt-edit-table="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', async function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const qtysw = o.querySelectorAll('td')[2].innerText
        const swalConfig = {
          title: 'Edito Furnizimin',
          html:
            '<div>' +
            '<p id="sw-qty-error" class="show-errors-swal text-danger mb0"></p>' +
            `<input id="swal-qty" type="number"  class="form-control form-control-solid" placeholder="Shëno numrin e faturës" value="${qtysw}" >` +
            '</div>',
          confirmButtonColor: '#2abf52',
          confirmButtonText: 'Ruaj',
          focusConfirm: false,
          preConfirm: async () => {
            const qty = document.getElementById('swal-qty').value
            try {
              const res = await fetch('/api/v1/article/stock-product-edit-supply', {
                method: 'PATCH',
                body: JSON.stringify({ id, qty}),
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
                setTimeout(()=>{
                  location.reload()
                },500)
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
  const search_input1 = document.getElementById('supply_table_search')
  search_input1.addEventListener('keyup', (e) => {
    supplytable.search(e.target.value).draw()
  })
 
  supplytable.on('draw', () => {
    KTMenu.createInstances()
    editSupply()
  })
})
