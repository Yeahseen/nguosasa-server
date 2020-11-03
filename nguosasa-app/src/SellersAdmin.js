import React from 'react';
import axios from 'axios';
import SellersForm from './SellersForm';
import SellersTable from './SellersTable';

class SellersAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      stallno: '',
      editing: false,
      formSubmitting: false,
      validationErrors: {},
      formSuccess: false,
      formError: false,
      sellers: [],
      tableLoading: false,
      tableError: false,
      deleteSuccess: false,
    };
    this.resetFormState = this.resetFormState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleCheckbox = this.handleToggleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditSeller = this.handleEditSeller.bind(this);
    this.handleDeleteSeller = this.handleDeleteSeller.bind(this);
  }
  componentDidMount() {
    this.fetchSellers();
  }
  fetchSellers() {
    this.setState({ tableLoading: true, tableError: false });
    axios
      .get('/api/sellers')
      .then((response) => {
        this.setState({
          sellers: response.data.map((data) => ({
            ...data,
            product: data.product_id,
          })),
          tableLoading: false,
          tableError: false,
        });
      })
      .catch((error) => {
        this.setState({
          sellers: [],
          tableLoading: false,
          tableError: true,
        });
      });
  }
  resetFormState() {
    this.setState({
      name: '',
      phone: '',
      stallno: '',
      editing: false,
      formSubmitting: false,
      validationErrors: {},
      formSuccess: false,
      formError: false,
      tableLoading: false,
      tableError: false,
      deleteSuccess: false,
    });
  }
  isValid() {
    const { validationErrors, isValid } = this.validateFormInput(this.state);
    if (!isValid) {
      this.setState({ validationErrors });
    }
    return isValid;
  }
  validateFormInput(data) {
    const validationErrors = {};
    const { name, phone, stallno } = data;

    if (!name) {
      validationErrors.name = 'This field is required';
    }
    if (!phone) {
      validationErrors.phone = 'This field is required';
    }
    if (!stallno) {
      validationErrors.stallno = 'This field is required';
    }
    return {
      validationErrors,
      isValid: Object.keys(validationErrors).length === 0,
    };
  }
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  }
  handleToggleCheckbox(e) {
    const checked = e.target.checked;
    const value = e.target.value;

    if (checked) {
      this.setState((prevState) => ({
        type: prevState.type.concat(value),
      }));
    } else {
      this.setState((prevState) => ({
        type: prevState.type.filter((type) => type !== value),
      }));
    }
  }
  handleSubmit(e) {
    e.preventDefault();

    const { editing, sellers, id, name, phone, stallno } = this.state;
    if (this.isValid()) {
      this.setState({
        validationErrors: {},
        formSubmitting: true,
        formSuccess: false,
        formError: false,
      });
      if (editing) {
        axios
          .put(`/api/sellers/${id}`, {
            name,
            phone,
            stallno,
          })
          .then((response) => {
            this.resetFormState();
            const index = sellers.findIndex((c) => c.id === id);
            this.setState({
              formSuccess: true,
              sellers: [
                ...sellers.slice(0, index),
                {
                  id,
                  name,
                  stallno,
                  phone,
                },
                ...sellers.slice(index + 1),
              ],
            });
          })
          .catch((error) => {
            this.setState({
              validationErrors: {},
              formSubmitting: false,
              formSuccess: false,
              formError: true,
            });
          });
      } else {
        // new record save
        axios
          .post('/api/sellers', {
            name,
            phone,
            stallno,
          })
          .then((response) => {
            this.resetFormState();
            this.setState({
              formSuccess: true,
              sellers: [
                ...sellers,
                {
                  id: response.data,
                  name,
                  phone,
                  stallno,
                },
              ],
            });
          })
          .catch((error) => {
            this.setState({
              validationErrors: {},
              formSubmitting: false,
              formError: true,
            });
          });
      }
    }
  }
  handleEditSeller(seller) {
    return () => {
      this.setState({
        ...seller,
        type: seller.type.split(','),
        editing: true,
      });
    };
  }
  handleDeleteSeller(seller, sellers) {
    return () => {
      const { id, name } = seller;

      // eslint-disable-next-line no-restricted-globals
      if (confirm(`Are you sure you want to delete ' ${name}'?`)) {
        axios
          .delete(`api/sellers/${id}`)
          .then((response) => {
            const index = sellers.findIndex((c) => c.id === id);
            this.setState({
              sellers: [
                ...sellers.slice(0, index),
                ...sellers.slice(index + 1),
              ],
              deleteSuccess: true,
              tableError: false,
            });
          })
          .catch((error) => {
            this.setState({
              deleteSuccess: false,
              tableError: true,
            });
          });
      }
    };
  }
  render() {
    const {
      name,
      phone,
      stallno,
      editing,
      formSubmitting,
      validationErrors,
      formSuccess,
      formError,
      sellers,
      tableLoading,
      tableError,
      deleteSuccess,
    } = this.state;
    return (
      <div className="mvls-movie-admin">
        <h1> Sellers</h1>
        <h3>{editing ? 'Edit Seller' : ' Add Seller'}</h3>
        <SellersForm
          name={name}
          phone={phone}
          stallno={stallno}
          formSubmitting={formSubmitting}
          validationErrors={validationErrors}
          formSuccess={formSuccess}
          formError={formError}
          handleChange={this.handleChange}
          handleToggleCheckbox={this.handleToggleCheckbox}
          resetFormState={this.resetFormState}
          handleSubmit={this.handleSubmit}
        />
        <SellersTable
          sellers={sellers}
          tableLoading={tableLoading}
          tableError={tableError}
          deleteSuccess={deleteSuccess}
          onEditSeller={this.handleEditSeller}
          onDeleteSeller={this.handleDeleteSeller}
        />
      </div>
    );
  }
}

export default SellersAdmin;
