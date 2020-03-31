import React from 'react';

function SellersForm({
  name,
  phone,
  stallno,
  product,
  formSubmitting,
  validationErrors,
  formSuccess,
  formError,
  handleChange,
  resetFormState,
  handleSubmit,
}) {
  const disabled =
    !name ||
    !phone ||
    !stallno ||
    (Array.isArray(product) && product.length === 0);

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
          <label htmlFor="phone">Phone</label>
          <div className="mvls-form-input-group">
            <input
              type="number"
              name="phone"
              className={validationErrors.phone ? 'has-error' : ''}
              autoComplete="off"
              value={phone}
              onChange={handleChange}
              disabled={formSubmitting}
            />
            {validationErrors.phone && (
              <span className="mvls-form-input-error">
                {validationErrors.phone}
              </span>
            )}
          </div>
        </div>

        <div className="mvls-form-col">
          <label htmlFor="stallno">Stallno</label>
          <div className="mvls-form-input-group">
            <input
              type="text"
              name="stallno"
              className={validationErrors.stallno ? 'has-error' : ''}
              autoComplete="off"
              value={stallno}
              onChange={handleChange}
              disabled={formSubmitting}
            />
            {validationErrors.stallno && (
              <span className="mvls-form-input-error">
                {validationErrors.stallno}
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

export default SellersForm;
