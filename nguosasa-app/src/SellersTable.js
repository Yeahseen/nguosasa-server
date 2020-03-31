import React from 'react';

function SellersTable({
  sellers,
  tableLoading,
  tableError,
  deleteSuccess,
  onEditSeller,
  onDeleteSeller,
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
            <th>Phone</th>
            <th>Stallno</th>
          </tr>
        </thead>
        {sellers.length === 0 && (
          <tbody>
            <tr>
              <td colSpan="8" className="mvls-no-data">
                No data
              </td>
            </tr>
          </tbody>
        )}
        {sellers.length > 0 && (
          <tbody>
            {sellers.map((seller, index) => {
              const { id, name, phone, stallno, product_id } = seller;

              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{phone}</td>
                  <td>{stallno}</td>
                  <td>{product_id}</td>
                  <td>
                    <span
                      className="mvls-table-link"
                      onClick={onEditSeller(seller)}
                    >
                      Edit
                    </span>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <span
                      className="mvls-table-link"
                      onClick={onDeleteSeller(seller, sellers)}
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

export default SellersTable;
