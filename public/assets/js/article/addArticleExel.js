document.getElementById('import-btn').addEventListener('click', () => {
   showLoadingSpinner();
 
   const formData = new FormData();
   const excelInput = document.getElementById('excel_import');
 
   if (excelInput.files.length === 0) {
     hideLoadingSpinner();
     showErrorAlert('Ju nuk keni importuar file exel');
     return;
   }
 
   const file = excelInput.files[0];
 
   // Additional client-side validation (file type and size)
   // if (!file.type.includes('excel')) {
   //   hideLoadingSpinner();
   //   showErrorAlert('File type is not supported. Please upload an Excel file.');
   //   return;
   // }
 
   if (file.size > 5000000) {
     hideLoadingSpinner();
     showErrorAlert('File size exceeds the limit (5 MB).');
     return;
   }
 
   formData.append('exel', file);
   addArticleExcel(formData);
 });
 
 const addArticleExcel = async (formData) => {
   const url = '/api/v1/article/add-articles-excel';
   try {
     const res = await fetch(url, {
       method: 'POST',
       body: formData,
     });
 
     const data = await res.json();
     hideLoadingSpinner();
 
     if (data.status === 'fail') {
       showErrorAlert(data.message);
     } else if (data.status === 'success') {
       showSuccessAlert(data.message);
       articletable.search(document.getElementById('article-table-search').value).draw()
     }
   } catch (err) {
     hideLoadingSpinner();
     showErrorAlert('An error occurred while processing your request. Please try again later.');
     console.error(err);
   }
 };
 