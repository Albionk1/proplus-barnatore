let articletable
let articleId
let articleBarcode
let articleTvsh
let price_many
$(document).ready(function () {
  articletable = $('#article_table').DataTable({
    processing: true,
    serverSide: true,
    ajax: {
      url: '/api/v1/sales/get-article',
      data: (d) => {
        const radioButtons = document.querySelectorAll('[name="radioGroup"]');

        let selectedValue = null;
        for (const radioButton of radioButtons) {
          if (radioButton.checked) {
            selectedValue = radioButton.value;
            break; // Stop the loop when a checked radio is found
          }
        }
        d.searchType = selectedValue
        d.unit=document.getElementById('unit').value
      }
    },
    columnDefs: [
      { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'barcode' },
      { data: 'name' },
      { data: 'price_many' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${data.qty?data.qty:0}
      </td>`;
        },
      }, {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
          <a id="" <i class="fas fa-plus-circle fs-2x text-primary ms-auto"
          data-bs-toggle="modal" data-bs-target="#product"
          style="cursor: pointer;"></i>
          </a>
      </td>`;
        },
      },
    ], lengthMenu: [
      [1],
      [1],
    ], drawCallback: function (settings) {
      var api = this.api();
      var data = api.ajax.json();
      articleId = data.data[0]._id
      articleBarcode = data.data[0].barcode
      articleTvsh = data.data[0].tvsh
      articlePrice = data.data[0].price_many
      
      document.getElementById('show-tvsh').value = data.data[0].tvsh
      price_many=data.data[0].price_many
      document.getElementById('price_many').value = data.data[0].price_many
      document.getElementById('total_price').value = data.data[0].price_many
      document.getElementById('show_article_name').textContent = data.data[0].name

    }
  })

  const search_input1 = document.getElementById('article-table-search')
  search_input1.addEventListener('keyup', (e) => {
    articletable.search(e.target.value).draw()
  })
  articletable.on('draw', () => {
    KTMenu.createInstances()
  })
})