import React from 'react';
import axios from 'axios';
import Loading from './Loading';
import Error from './Error';
import Product from './Product';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productsDisplay: [],
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    this.fetchProductsDisplay();
  }

  fetchProductsDisplay() {
    this.setState({ loading: true, error: false });

    axios
      .get('/api/products')
      .then(response => {
        this.setState({
          productsDisplay: response.data,
          loading: false,
          error: false,
        });
      })
      .catch(error => {
        this.setState({
          productsDisplay: [],
          loading: false,
          error: true,
        });
      });
  }

  render() {
    const { productsDisplay, loading, error } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Error />;
    }

    return (
      <div className="mvls-container">
        <div className="mvls-product-list">
          {productsDisplay.map(p => (
            <Product key={p.id} productDisplay={p} />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
