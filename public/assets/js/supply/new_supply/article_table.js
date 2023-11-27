let articletable
let articleId
let articleBarcode
let articleTvsh
$(document).ready(function () {
  articletable = $('#article_table').DataTable({
    processing: true,
    serverSide: true,
    ajax: {
      url: '/api/v1/supply/get-article',
      data: (d) => {
        const radioButtons = document.querySelectorAll('[name="radioGroup"]');
        d.unit = document.getElementById('unit').value

        let selectedValue = null;
        for (const radioButton of radioButtons) {
          if (radioButton.checked) {
            selectedValue = radioButton.value;
            break; // Stop the loop when a checked radio is found
          }
        }
        d.searchType = selectedValue
      }
    },
    columnDefs: [
      { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [

      { data: 'barcode' },
      { data: 'name' },
      { data: 'price_many' },
      { data: 'price_few' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${data.qty ? data.qty : 0}
      </td>`;
        },
      },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
          <a id="" <i class="fas fa-plus-circle fs-2x text-primary ms-auto"
          data-bs-toggle="modal" data-bs-target="#product" onclick='addArticleModal(${JSON.stringify(data)})'
          style="cursor: pointer;"></i>
          </a>
      </td>`;
        },
      },
    ], lengthMenu: [
      [5,10,15],
      [5,10,15],
    ], drawCallback: function (settings) {
      var api = this.api();
      var data = api.ajax.json();
      if (data.data.length > 0) {
        
      }
      else {
        showErrorAlert('Ky produkt nuk është i regjistruar')
      }
      // document.getElementById('price_much').value = data.data[0].price_many
    }
  })

  const search_input1 = document.getElementById('article-table-search')
  search_input1.addEventListener('keyup', (e) => {
    articletable.search(e.target.value).draw()
  })
  $('#unit').change(() => {
    articletable.search(search_input1.value).draw()
  })
  articletable.on('draw', () => {
    KTMenu.createInstances()
  })
})

const addArticleModal =(data)=>{
  articleId = data._id
  articleBarcode = data.barcode
  articleTvsh = data.tvsh
  articlePrice = data.price_many
  document.getElementById('article_name').textContent = data.name
  document.getElementById('price_few').value = data.price_few
  document.getElementById('price_many').value = data.price_many
  document.getElementById('price').value = data.price_supply
  calcProfit()
}