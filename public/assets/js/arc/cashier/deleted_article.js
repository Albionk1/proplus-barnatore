let deleteArticleTable
moment.locale('sq')
$(document).ready(function () {
   deleteArticleTable = $('#deleted_sale_article').DataTable({
    processing: true,
    serverSide: true,
    ajax:'/api/v1/sales/get-deleted-article',
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'nr' },
      { data: 'invoice' },
      { data: 'qty' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
        ${moment(data.updatedAt).format('L')} ${ moment(data.updatedAt).format('HH:mm')}
      </td>`;
        },
      },
      { data: 'total_price' },
    ],lengthMenu: [
      [10,20,50,100],
      [10,20,50,100],
  ]
  })


  const search_input1 = document.getElementById('deleted_sale_article_search')
  search_input1.addEventListener('keyup', (e) => {
    deleteArticleTable.search(e.target.value).draw()
  })  
  deleteArticleTable.on('draw', () => {
    KTMenu.createInstances()
  })
})
