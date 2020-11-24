import React from 'react';

function SellersForm({
  name,
  stallno,
  phone,
  formSubmitting,
  validationErrors,
  formSuccess,
  formError,
  handleChange,
  resetFormState,
  handleSubmit,
}) {
  const disabled = !name || !stallno || !phone;

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
          <label htmlFor="name">
            <h3>Name</h3>
          </label>
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
            {validationErrors.name && (
              <span className="mvls-form-input-error">
                {validationErrors.name}
              </span>
            )}
          </div>
        </div>
        <div className="mvls-form-col">
          <label htmlFor="phone">
            <h3>Phone</h3>
          </label>
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
          <label htmlFor="stallno">
            <h3>Stallno</h3>
          </label>
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
