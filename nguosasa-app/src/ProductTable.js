import React from 'react';

function ProductTable({
  products,
  tableLoading,
  tableError,
  deleteSuccess,
  onEditProduct,
  onDeleteProduct,
}) {
  if (tableLoading) {
    return <p className="mvls-table-loading">Loading movies...</p>;
  }

  return (
    <div className="mvls-table">
      {deleteSuccess && (
        <p className="mvls-alert mvls-alert-success">
          Record deleted successfully.
        </p>
      )}
      {tableError && (
        <p className="mvls-alert-error">
          Sorry, a server error occurred. Please retry.
        </p>
      )}
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>PosterURL</th>
            <th>Description</th>
            <th>Seller</th>
            <th>Action</th>
          </tr>
        </thead>
        {products.length === 0 && (
          <tbody>
            <tr>
              <td colSpan="8" className="mvls-no-data">
                No data
              </td>
            </tr>
          </tbody>
        )}
        {products.length > 0 && (
          <tbody>
            {products.map((product, index) => {
              const {
                id,
                name,
                price,
                type,
                poster,
                description,
                sellers_id,
              } = product;

              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{price}</td>
                  <td>{type}</td>
                  <td>{poster}</td>
                  <td>{description}</td>
                  <td>{sellers_id}</td>
                  <td>
                    <span
                      className="mvls-table-link"
                      onClick={onEditProduct(product)}
                    >
                      Edit
                    </span>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <span
                      className="mvls-table-link"
                      onClick={onDeleteProduct(product, products)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default ProductTable;
