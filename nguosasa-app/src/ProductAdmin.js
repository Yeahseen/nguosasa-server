import React from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';

class ProductAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      description: '',
      seller: '',
      type: '',
      poster: '',
      editing: false,
      formSubmitting: false,
      validationErrors: {},
      formSuccess: false,
      formError: false,
      products: [],
      tableLoading: false,
      tableError: false,
      deleteSuccess: false,
    };
    this.resetFormState = this.resetFormState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleCheckbox = this.handleToggleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditProduct = this.handleEditProduct.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
  }
  componentDidMount() {
    this.fetchProducts();
  }
  fetchProducts() {
    this.setState({ tableLoading: true, tableError: false });
    axios
      .get('/api/products')
      .then((response) => {
        this.setState({
          products: response.data.map((data) => ({
            ...data,
            seller: data.seller_id,
          })),
          tableLoading: false,
          tableError: false,
        });
      })
      .catch((error) => {
        this.setState({
          products: [],
          tableLoading: false,
          tableError: true,
        });
      });
  }
  resetFormState() {
    this.setState({
      name: '',
      price: '',
      description: '',
      type: '',
      seller: '',
      poster: '',
      editing: false,
      formSubmitting: false,
      validationErrors: {},
      formSuccess: false,
      formError: false,
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
    const { name, price, description, type, seller, poster } = data;

    if (!name) {
      validationErrors.name = 'This field is required';
    }
    if (!price) {
      validationErrors.price = 'This field is required';
    }
    if (!description) {
      validationErrors.description = 'This field is required';
    }
    if (!seller) {
      validationErrors.seller = 'This field is required';
    }
    if (Array.isArray(type) && type.length === 0) {
      validationErrors.type = 'This field is required';
    }
    if (!poster) {
      validationErrors.poster = 'This field is required';
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

    const {
      editing,
      products,
      id,
      name,
      price,
      type,
      poster,
      description,
      seller_id,
      seller,
    } = this.state;
    if (this.isValid()) {
      this.setState({
        validationErrors: {},
        formSubmitting: true,
        formSuccess: false,
        formError: false,
      });

      if (editing) {
        axios
          .put(`/api/products/${id}`, {
            name,
            price,
            description,
            type,
            seller_id,
            poster,
          })
          .then((response) => {
            this.resetFormState();
            const index = products.findIndex((c) => c.id === id);
            this.setState({
              formSuccess: true,
              products: [
                ...products.slice(0, index),
                {
                  id,
                  name,
                  description,
                  type,
                  poster,
                  seller_id,
                },
                ...products.slice(index + 1),
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
        // new product save
        axios
          .post('/api/products', {
            name,
            price,
            description,
            type,
            poster,
            sellers_id: seller,
          })
          .then((response) => {
            this.resetFormState();
            this.setState({
              formSuccess: true,
              products: [
                ...products,
                {
                  id: response.data,
                  name,
                  poster,
                  description,
                  type,
                  price,
                  seller,
                },
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
      }
    }
  }
  handleEditProduct(product) {
    return () => {
      this.setState({
        ...product,
        type: product.type.split(','),
        editing: true,
      });
    };
  }
  handleDeleteProduct(product, products) {
    return () => {
      const { id, name } = product;

      // eslint-disable-next-line no-restricted-globals
      if (confirm(`Are you sure you want to delete '${name}'?`)) {
        axios
          .delete(`api/products/${id}`)
          .then((response) => {
            const index = products.findIndex((c) => c.id === id);
            this.setState({
              products: [
                ...products.slice(0, index),
                ...products.slice(index + 1),
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
      price,
      poster,
      description,
      type,
      seller,
      editing,
      formSubmitting,
      validationErrors,
      formSuccess,
      formError,
      products,
      tableLoading,
      tableError,
      deleteSuccess,
    } = this.state;

    return (
      <div className="mvls-movie-admin">
        <h1>Products</h1>
        <h3>{editing ? 'Edit Product' : 'Add Product'}</h3>
        <ProductForm
          name={name}
          price={price}
          type={type}
          poster={poster}
          description={description}
          seller={seller}
          formSubmitting={formSubmitting}
          validationErrors={validationErrors}
          formSuccess={formSuccess}
          formError={formError}
          handleChange={this.handleChange}
          handleToggleCheckbox={this.handleToggleCheckbox}
          resetFormState={this.resetFormState}
          handleSubmit={this.handleSubmit}
        />
        <ProductTable
          products={products}
          tableLoading={tableLoading}
          tableError={tableError}
          deleteSuccess={deleteSuccess}
          onEditProduct={this.handleEditProduct}
          onDeleteProduct={this.handleDeleteProduct}
        />
      </div>
    );
  }
}

export default ProductAdmin;
