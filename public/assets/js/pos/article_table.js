let articletable;
let articleId;
let articleBarcode;
let articleTvsh;
let articlePrice;
let foundArticle;



let articles = [];

const getArticles = async (nr) => {
  const res = await fetch(`/api/v1/sales/get-articles-pos?page=${nr}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  articles.push(...data.data);
};

getArticles(1);
getArticles(2);
getArticles(3);
getArticles(4);
getArticles(5);
getArticles(6);



articletable = $('#article_table').DataTable({
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
          <a id="${data._id}" <i id="${data._id}" class="fas fa-plus-circle fs-2x text-primary ms-auto" onclick='addArticle(${JSON.stringify(data)})'
          style="cursor: pointer;"></i>
          </a>
        </td>`;
      },
    },
  ],
  
});

function updateDataTable(newData) {
  articletable.clear(); // Clear the existing data in the DataTable
  articletable.rows.add(newData).draw(); // Add and redraw the table with new data
}

updateDataTable(articles);

const search_input1 = document.getElementById('article-table-search');
search_input1.addEventListener('keyup', (e) => {
  articletable.search(e.target.value).draw();
});

articletable.on('draw', () => {
  KTMenu.createInstances();
});
const addArticle = async(data)=>{
  foundArticle=data
  let price =foundArticle.price_few
        if(foundArticle.price_few_discount){
          if(foundArticle.target_few ==='all'){
            const currentDate = new Date();
            const discountExpirationDate = new Date(foundArticle.discount_date_few)
            const startdiscountExpirationDate = new Date(foundArticle.discount_date_few_start)
            if(startdiscountExpirationDate<=currentDate &&currentDate <= discountExpirationDate){
              price=foundArticle.price_few_discount
            }
          }
          if(foundArticle.target_few ==='card'&&buyer.col1){
            const currentDate = new Date();
            const discountExpirationDate = new Date(foundArticle.discount_date_few)
            const startdiscountExpirationDate = new Date(foundArticle.discount_date_few_start)
            if(startdiscountExpirationDate<=currentDate &&currentDate <= discountExpirationDate){
              price=foundArticle.price_few_discount
            }
          }
        }
  try {
    let qty =document.getElementById('qty-col1').value
    const res = await fetch('/api/v1/sales/add-sale-pos', {
      method: 'POST',
      body: JSON.stringify({qty,total_price:parseFloat(price*qty).toFixed(2),price_few:price,discount:parseFloat((foundArticle.price_few-price)*qty).toFixed(2),article:foundArticle._id,barcode:foundArticle.barcode,colon:'col_1',tvsh:foundArticle.tvsh}),
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
     ColOneTable.search(document.getElementById('col_1_table_search').value).draw()     
    }
  } catch (err) {
    console.log(err)
  }
}