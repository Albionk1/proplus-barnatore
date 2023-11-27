const searchInputCol1 = document.getElementById('search-user-list-col1');
const searchInputCol2 = document.getElementById('search-user-list-col2');
const searchInputCol3 = document.getElementById('search-user-list-col3');
const searchInputCol4 = document.getElementById('search-user-list-col4');
const searchInputCol5 = document.getElementById('search-user-list-col5');
let updatedCol1=0
let updatedCol2=0
let updatedCol3=0
let updatedCol4=0
let updatedCol5=0


var buyer={col1:'',col2:'',col3:'',col4:'',col5:''}
// Function to fetch user data
var debounceTimeout = null;
const fetchUsers = async (searchQuery) => {
  try {
    const response = await fetch(`/api/v1/sales/find-loyalty-card-users?search=${searchQuery}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Function to show user list
const showUserList = (users,list,search,col) => {
  // Clear previous search results
  list.innerHTML = '';
  // Show user list
  list.style.display = 'block';

  // Add user items to list
  users.forEach((user) => {
    const li = document.createElement('li');
    li.textContent = user.name +' '+user.phone_number;
    li.addEventListener('click', () => {
      buyer[col]=user._id
      search.value = user.name +' '+user.phone_number;
      list.style.display = 'none';
      updatePrices()
    });
    list.appendChild(li);
  });
};

// Function to hide user list
const hideUserList = (list) => {
    list.style.display = 'none';
};
const hideUserListAll = () => {
   const lists = document.getElementsByClassName('user-list')
   for(let i =0;i<lists.length;i++){
    lists[i].style.display = 'none';
   }
};

// Event listener for search input
searchInputCol1.addEventListener('input', async () => {
  const searchQuery = searchInputCol1.value;
  if (searchQuery.length > 0) {
   clearTimeout(debounceTimeout,searchInputCol1.closest('ul'),searchInputCol1); 
   debounceTimeout = setTimeout(async() => {
      const users = await fetchUsers(searchQuery);
      const colId=searchInputCol1.id.split('-')[3]
      showUserList(users,document.getElementById(`user-list-`+colId),searchInputCol1,colId)
    }, 100);
  } else {
    const colId=searchInputCol1.id.split('-')[3]
    hideUserList(document.getElementById(`user-list-`+colId));
  }
});

searchInputCol2.addEventListener('input', async () => {
    const searchQuery = searchInputCol2.value;
    if (searchQuery.length > 0) {
     clearTimeout(debounceTimeout,searchInputCol2.closest('ul'),searchInputCol2); 
     debounceTimeout = setTimeout(async() => {
        const users = await fetchUsers(searchQuery);
        const colId=searchInputCol2.id.split('-')[3]
        showUserList(users,document.getElementById(`user-list-`+colId),searchInputCol2,colId)
      }, 100);
    } else {
      const colId=searchInputCol2.id.split('-')[3]
      hideUserList(document.getElementById(`user-list-`+colId));
    }
  });
  searchInputCol3.addEventListener('input', async () => {
    const searchQuery = searchInputCol3.value;
    if (searchQuery.length > 0) {
     clearTimeout(debounceTimeout,searchInputCol3.closest('ul'),searchInputCol3); 
     debounceTimeout = setTimeout(async() => {
        const users = await fetchUsers(searchQuery);
        const colId=searchInputCol3.id.split('-')[3]
        showUserList(users,document.getElementById(`user-list-`+colId),searchInputCol3,colId)
      }, 100);
    } else {
      const colId=searchInputCol3.id.split('-')[3]
      hideUserList(document.getElementById(`user-list-`+colId));
    }
  });
  searchInputCol4.addEventListener('input', async () => {
    const searchQuery = searchInputCol4.value;
    if (searchQuery.length > 0) {
     clearTimeout(debounceTimeout,searchInputCol4.closest('ul'),searchInputCol4); 
     debounceTimeout = setTimeout(async() => {
        const users = await fetchUsers(searchQuery);
        const colId=searchInputCol4.id.split('-')[3]
        showUserList(users,document.getElementById(`user-list-`+colId),searchInputCol4,colId)
      }, 100);
    } else {
      const colId=searchInputCol4.id.split('-')[3]
      hideUserList(document.getElementById(`user-list-`+colId));
    }
  });
  searchInputCol5.addEventListener('input', async () => {
    const searchQuery = searchInputCol5.value;
    if (searchQuery.length > 0) {
     clearTimeout(debounceTimeout,searchInputCol5.closest('ul'),searchInputCol5); 
     debounceTimeout = setTimeout(async() => {
        const users = await fetchUsers(searchQuery);
        const colId=searchInputCol5.id.split('-')[3]
        showUserList(users,document.getElementById(`user-list-`+colId),searchInputCol5,colId)
      }, 100);
    } else {
      const colId=searchInputCol5.id.split('-')[3]
      hideUserList(document.getElementById(`user-list-`+colId));
    }
  });
// Event listener for clicks outside of search bar and user list
document.addEventListener('click', (event) => {
  if (!event.target.closest('.search-container')) {
    hideUserListAll();
  }
});
deleteListUser=(list,search)=>{
    list.innerHTML = '';
    search.value=''
}

const updatePrices = async()=>{
  if(colon ==='col_1'&& parseInt(document.getElementById('colon_1_article').value )===0 &&updatedCol1===1) {return}
  if(colon ==='col_2'&& parseInt(document.getElementById('colon_2_article').value )===0&&updatedCol2===1) {return} 
  if(colon ==='col_3'&& parseInt(document.getElementById('colon_3_article').value )===0&&updatedCol3===1) {return}
  if(colon ==='col_4'&& parseInt(document.getElementById('colon_4_article').value )===0&&updatedCol4===1) {return} 
  if(colon ==='col_5'&& parseInt(document.getElementById('colon_5_article').value )===0&&updatedCol5===1) {return }
  const res = await fetch('/api/v1/sales/update-article-prices', {
    method: 'POST',
    body: JSON.stringify({colon}),
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await res.json()
if(data.status ==='success'){
  if(colon ==='col_1') {return ColOneTable.draw(),updatedCol1=1} 
  if(colon ==='col_2') {return  ColTwoTable.draw(),updatedCol2=1} 
  if(colon ==='col_3') {return ColThreeTable.draw(),updatedCol3=1}
  if(colon ==='col_4') {return ColFourTable.draw(),updatedCol4=1} 
  if(colon ==='col_5') {return ColFiveTable.draw(),updatedCol5=1}
}
  

}