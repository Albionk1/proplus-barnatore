let articletable
$(document).ready(function () {
  articletable = $('#find_article_table').DataTable({
    processing: true,
    serverSide: true,
    ajax: {
      url: '/api/v1/article/find-article-pos',
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
      }
    },
    columnDefs: [
      { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [

      { data: 'nr' },
      { data: 'unit' },
      { data: 'address' },
      { data: 'barcode' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${data.code?data.code:''}
      </td>`;
        },
      },
      { data: 'name' },
      { data: 'qty' },

    ], lengthMenu: [
      [1,10,20,50],
      [1,10,20,50],
    ]
  })
   
  const search_input1 = document.getElementById('find_article_table_search')
  search_input1.addEventListener('keyup', (e) => {
    articletable.search(e.target.value).draw()
  })
  articletable.on('draw', () => {
    KTMenu.createInstances()
  })
})