let actiontable
$(document).ready(function () {
   actiontable = $('#action_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/article/get-action-for-article',
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
        render: function (data, type, row) 
        {
          console.log(data)
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${parseFloat(data.price_now_many?data.price_now_many:data.price_now_few).toFixed(2)}€
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${parseFloat(data.price_action_many?data.price_action_many:data.price_action_few).toFixed(2)}€
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${parseFloat(data.percent).toFixed(2)}%
      </td>`;
        },
      },
    ],lengthMenu: [
      [10,20,50,100],
      [10,20,50,100],
  ]
  })


  const search_input1 = document.getElementById('action_table_search')
  search_input1.addEventListener('keyup', (e) => {
    actiontable.search(e.target.value).draw()
  })
 
  actiontable.on('draw', () => {
    KTMenu.createInstances()
  })
})
