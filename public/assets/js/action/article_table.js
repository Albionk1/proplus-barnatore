let articletable
let articleId
let articleBarcode
let articlePriceMany
let articlePriceFew
$(document).ready(function () {
   articletable = $('#article_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/action/get-article',
    data:(d)=>{
      const radioButtons = document.querySelectorAll('[name="radioGroup"]');

      let selectedValue = null;
      for (const radioButton of radioButtons) {
        if (radioButton.checked) {
          selectedValue = radioButton.value;
          break; // Stop the loop when a checked radio is found
        }
      }
      d.searchType=selectedValue
      d.unit = document.getElementById('unit').value
    }
  },
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'barcode' },
      { data: 'name' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${document.getElementById('price_selector').checked?data.price_few:data.price_many}€ 
      </td>`;
        },
      },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${data.qty?data.qty:0}
      </td>`;
        },
      }
    ],lengthMenu: [
      [1],
      [1],
  ],drawCallback: function(settings) {
    var api = this.api();
    var data = api.ajax.json();
     articleId =data.data[0]._id
    articleBarcode = data.data[0].barcode
    document.getElementById('price_now_many').value = data.data[0].price_many
    document.getElementById('price_now_few').value = data.data[0].price_few
    articlePriceMany = data.data[0].price_many
    articlePriceFew  = data.data[0].price_few
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
$('#price_selector').change(()=>{
  articletable.draw()
})