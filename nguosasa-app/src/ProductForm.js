import React from 'react';

function ProductForm({
  name,
  price,
  type,
  description,
  poster,
  seller,
  formSubmitting,
  validationErrors,
  formSuccess,
  formError,
  handleChange,
  handleToggleCheckbox,
  resetFormState,
  handleSubmit,
}) {
  const disabled =
    !name ||
    !price ||
    !type ||
    !description ||
    !poster ||
    (Array.isArray(seller) && seller.length === 0);

  return (
    <form className="mvls-form" onSubmit={handleSubmit}>
      {formSuccess && (
        <p className="mvls-alert mvls-alert-success">
          Form submitted successfully.
        </p>
      )}
      {formError && (
        <p className="mvls-alert mvls-alert-error">
          Sorry, error submitting form. Please retry.
        </p>
      )}
      <div className="mvls-form-row">
        <div className="mvls-form-col">
          <label htmlFor="title">Name</label>
          <div className="mvls-form-input-group">
            <input
              type="text"
              name="name"
              className={validationErrors.name ? 'has-error' : ''}
              autoComplete="off"
              value={name}
              onChange={handleChange}
              disabled={formSubmitting}
            />
            {validationErrors.title && (
              <span className="mvls-form-input-error">
                {validationErrors.name}
              </span>
            )}
          </div>
        </div>
        <div className="mvls-form-col">
          <label htmlFor="releaseYear">Price</label>
          <div className="mvls-form-input-group">
            <input
              type="number"
              name="price"
              className={validationErrors.price ? 'has-error' : ''}
              autoComplete="off"
              value={price}
              onChange={handleChange}
              disabled={formSubmitting}
            />
            {validationErrors.price && (
              <span className="mvls-form-input-error">
                {validationErrors.price}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mvls-form-row">
        <div className="mvls-form-col">
          <label htmlFor="seller">Seller</label>
          <div className="mvls-form-input-group">
            <input
              type="text"
              name="seller"
              className={validationErrors.seller ? 'has-error' : ''}
              autoComplete="off"
              value={seller}
              onChange={handleChange}
              disabled={formSubmitting}
            />
            {validationErrors.seller && (
              <span className="mvls-form-input-error">
                {validationErrors.seller}
              </span>
            )}
          </div>
        </div>
        <div className="mvls-form-col">
          <label htmlFor="posterUrl">Poster</label>
          <div className="mvls-form-input-group">
            <input
              type="text"
              name="poster"
              className={validationErrors.poster ? 'has-error' : ''}
              autoComplete="off"
              value={poster}
              onChange={handleChange}
              disabled={formSubmitting}
            />
            {validationErrors.poster && (
              <span className="mvls-form-input-error">
                {validationErrors.poster}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mvls-form-row">
        <div className="mvls-form-col">
          <label htmlFor="description">Description</label>
          <div className="mvls-form-input-group">
            <textarea
              name="description"
              className={validationErrors.description ? 'has-error' : ''}
              autoComplete="off"
              rows={5}
              value={description}
              onChange={handleChange}
              disabled={formSubmitting}
            />
            {validationErrors.description && (
              <span className="mvls-form-input-error">
                {validationErrors.description}
              </span>
            )}
          </div>
        </div>
        <div className="mvls-form-col">
          <label>Type</label>
          <div className="mvls-form-input-group">
            <div className="mvls-checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="genres"
                  value="Wholesale"
                  checked={type.includes('Wholesale')}
                  onChange={handleToggleCheckbox}
                />
                &nbsp;Wholesale
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genres"
                  value="Retail"
                  checked={type.includes('Retail')}
                  onChange={handleToggleCheckbox}
                />
                &nbsp;Retail
              </label>
            </div>
            {validationErrors.type && (
              <span className="mvls-form-input-error">
                {validationErrors.type}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        className="mvls-btn mvls-btn-form"
        type="submit"
        disabled={disabled || formSubmitting}
      >
        Submit
      </button>
      <button
        className="mvls-btn mvls-btn-form"
        type="reset"
        onClick={resetFormState}
        disabled={formSubmitting}
      >
        Reset
      </button>
    </form>
  );
}

export default ProductForm;
