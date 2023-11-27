$(document).ready(function () {
  // Initialize the DataTable
  let ColOneTable = $('#col_1_table').DataTable({
      paging: false,
      columnDefs: [
          { orderable: false, targets: 8 },
      ],
      columns: [
          { data: 'nr' },
          { data: 'barcode' },
          { data: 'article.name' },
          { data: 'price_few' },
          {
              data: null,
              className: 'text-700 text-center quantity-input-border',
              render: function (data, type, row) {
                  return ` <td class="text-gray-700 text-center quantity-input-border">
                      <input type="number" value="${data.qty}" min="1" id="${data._id}" contenteditable="true">
                  </td>`;
              },
          },
          { data: 'discount' },
          { data: 'tvsh' },
          {
              data: null,
              className: 'text-center pe-0',
              render: function (data, type, row) {
                  return ` <td class="text-center pe-0" ><span data-name="total_price">
                      ${data.total_price}
                  <span>
                  </td>`;
              },
          },
          {
              data: null,
              className: 'text-center pe-0',
              render: function (data, type, row) {
                  return ` <a id="${data._id}" data-bs-toggle="tooltip" aria-label="Delete" data-kt-delete-table-col-1="true"
                      data-bs-original-title="Delete">
                      <i id="${data._id}" class="fas fa-times text-danger fs-3 pt-1 "></i>
                  </a>`;
              },
          },
      ],
  });

  // Function to add a new row to the DataTable
  function addNewRowToTable(newRowData) {
      ColOneTable.row.add(newRowData).draw();
  }

  // Function to handle the success response from the API
  function handleAddSalePosSuccess(data) {
      if (data.status === 'success') {
          // Add the new sale POS data to the DataTable
          addNewRowToTable(data.salePosData);

          // Clear any error messages or input fields
          // Replace this part with your specific logic
      } else if (data.status === 'fail') {
          // Handle any error messages from the API
          // Replace this part with your specific logic
      }
  }

  // Example API request to add a sale POS
  $('#add-sale-pos').on('click', function () {
      // Replace this with your actual API call
      $.ajax({
          url: '/api/v1/sales/add-sale-pos',
          method: 'POST',
          data: {
              // Provide the necessary data for adding a sale POS
              // Example: qty, total_price, price_few, etc.
          },
          success: handleAddSalePosSuccess,
          error: function (error) {
              // Handle API request error
          },
      });
  });

  // Add input event listeners for quantity input in each row
  $('tbody tr', ColOneTable).each(function () {
      var qtyInput = $(this).find('input[type="number"]');

      qtyInput.on('input', function () {
          // Get the new quantity value from the input
          var newQty = parseInt(qtyInput.val()) || 0;

          // Calculate the new total_price for this row
          var row = ColOneTable.row($(this).closest('tr')).data();
          var newTotalPrice = (row.price_few * newQty).toFixed(2);
          
          // Update the total_price column in this row
          $(this).closest('tr').find('span[data-name="total_price"]').text(newTotalPrice);
      });
  });

  // Handle updating quantity on blur
  $('tbody input[type="number"]').on('blur', function () {
      var row = ColOneTable.row($(this).closest('tr')).data();
      var qtyInput = $(this);
      var newQty = parseInt(qtyInput.val()) || 0;

      // Send an AJAX request to update the quantity on the server
      // Replace this with your specific API call
      // Example:
      /*
      $.ajax({
          url: '/api/update-quantity',
          method: 'POST',
          data: {
              rowId: row._id,
              newQty: newQty
          },
          success: function (response) {
              // Handle success
          },
          error: function (error) {
              // Handle error
          }
      });
      */
  });

  // Initialize DataTable
  ColOneTable.draw();
});