let articletablecol5;
// let articleId;
// let articleBarcode;
// let articleTvsh;
// let articlePrice;
let foundArticleCol5;



articletablecol5 = $('#article_table_col5').DataTable({
  processing: true,
  paging: false,
  data: articles,
  columnDefs: [
    { className: 'text-center pe-0', targets: '_all' },
  ],
  columns: [
    { data: 'barcode' },
    { data: 'name' },
    { data: 'price_few' },
    // {
    //   data: null,
    //   className: 'text-end',
    //   render: function (data, type, row) {
    //     return `<td class="text-gray-700 text-center fw-bold">12</td>`;
    //   },
    // },
    {
      data: null,
      className: 'text-end',
      render: function (data, type, row) {
        return `<td class="text-gray-700 text-center fw-bold">
          <a id="${data._id}" <i id="${data._id}" class="fas fa-plus-circle fs-2x text-primary ms-auto" onclick='addArticleCol5(${JSON.stringify(data)})'
          style="cursor: pointer;"></i>
          </a>
        </td>`;
      },
    },
  ],
  
});

function updateDataTableCol5(newData) {
  articletablecol5.clear(); // Clear the existing data in the DataTable
  articletablecol5.rows.add(newData).draw(); // Add and redraw the table with new data
}

updateDataTableCol5(articles);

// const search_input1 = document.getElementById('article-table-search');
// search_input1.addEventListener('keyup', (e) => {
//   articletablecol5.search(e.target.value).draw();
// });

articletablecol5.on('draw', () => {
  KTMenu.createInstances();
});
const addArticleCol5 = async(data)=>{
  foundArticleCol5=data
  let price =foundArticleCol5.price_few
        if(foundArticleCol5.price_few_discount){
          if(foundArticleCol5.target_few ==='all'){
            const currentDate = new Date();
            const discountExpirationDate = new Date(foundArticleCol5.discount_date_few)
            const startdiscountExpirationDate = new Date(foundArticle.discount_date_few_start)
            if(startdiscountExpirationDate<=currentDate &&currentDate <= discountExpirationDate){
              price=foundArticleCol5.price_few_discount
            }
          }
          if(foundArticleCol5.target_few ==='card'&&buyer.col5){
            const currentDate = new Date();
            const discountExpirationDate = new Date(foundArticleCol5.discount_date_few)
            const startdiscountExpirationDate = new Date(foundArticle.discount_date_few_start)
            if(startdiscountExpirationDate<=currentDate &&currentDate <= discountExpirationDate){
              price=foundArticleCol5.price_few_discount
            }
          }
        }
  try {
    let qty =document.getElementById('qty-col5').value
    const res = await fetch('/api/v1/sales/add-sale-pos', {
      method: 'POST',
      body: JSON.stringify({qty,total_price:parseFloat(price*qty).toFixed(2),price_few:price,discount:parseFloat((foundArticleCol5.price_few-price)*qty).toFixed(2),article:foundArticleCol5._id,barcode:foundArticleCol5.barcode,colon:'col_5',tvsh:foundArticleCol5.tvsh}),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.errors) { 
      const e = document.getElementsByClassName('show-errors-sales')
    for(var elm of e){
      elm.textContent=''
   }
   for(var key of Object.keys(data.errors)){

    if(data.errors[key]){
     const p = document.getElementById(`${key}-sales-error`)
     if(p){
     p.textContent = data.errors[key]}
    }
  }
    }
    if (!data.errors) {
      const e = document.getElementsByClassName('show-errors-sales')
      for(var elm of e){
        elm.textContent=''
     }
     ColFiveTable.search(document.getElementById('col_5_table_search').value).draw()     
    }
  } catch (err) {
    console.log(err)
  }
}