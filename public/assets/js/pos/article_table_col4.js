let articletablecol4;
// let articleId;
// let articleBarcode;
// let articleTvsh;
// let articlePrice;
let foundArticleCol4;



articletablecol4 = $('#article_table_col4').DataTable({
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
          <a id="${data._id}" <i id="${data._id}" class="fas fa-plus-circle fs-2x text-primary ms-auto" onclick='addArticleCol4(${JSON.stringify(data)})'
          style="cursor: pointer;"></i>
          </a>
        </td>`;
      },
    },
  ],
  
});

function updateDataTableCol4(newData) {
  articletablecol4.clear(); // Clear the existing data in the DataTable
  articletablecol4.rows.add(newData).draw(); // Add and redraw the table with new data
}

updateDataTableCol4(articles);

// const search_input1 = document.getElementById('article-table-search');
// search_input1.addEventListener('keyup', (e) => {
//   articletablecol4.search(e.target.value).draw();
// });

articletablecol4.on('draw', () => {
  KTMenu.createInstances();
});
const addArticleCol4 = async(data)=>{
  foundArticleCol4 = data
  let price =foundArticleCol4.price_few
        if(foundArticleCol4.price_few_discount){
          if(foundArticleCol4.target_few ==='all'){
            const currentDate = new Date();
            const discountExpirationDate = new Date(foundArticleCol4.discount_date_few)
            const startdiscountExpirationDate = new Date(foundArticle.discount_date_few_start)
            if(startdiscountExpirationDate<=currentDate &&currentDate <= discountExpirationDate){
              price=foundArticleCol4.price_few_discount
            }
          }
          if(foundArticleCol4.target_few ==='card'&&buyer.col4){
            const currentDate = new Date();
            const discountExpirationDate = new Date(foundArticleCol4.discount_date_few)
            const startdiscountExpirationDate = new Date(foundArticle.discount_date_few_start)
            if(startdiscountExpirationDate<=currentDate &&currentDate <= discountExpirationDate){
              price=foundArticleCol4.price_few_discount
            }
          }
        }
  try {
    let qty =document.getElementById('qty-col4').value
    const res = await fetch('/api/v1/sales/add-sale-pos', {
      method: 'POST',
      body: JSON.stringify({qty,total_price:parseFloat(price*qty).toFixed(2),price_few:price,discount:parseFloat((foundArticleCol4.price_few-price)*qty).toFixed(2),article:foundArticleCol4._id,barcode:foundArticleCol4.barcode,colon:'col_4',tvsh:foundArticleCol4.tvsh}),
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
     ColFourTable.search(document.getElementById('col_4_table_search').value).draw()     
    }
  } catch (err) {
    console.log(err)
  }
}