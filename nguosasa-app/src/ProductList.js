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
      .then((response) => {
        this.setState({
          productsDisplay: response.data,
          loading: false,
          error: false,
        });
      })
      .catch((error) => {
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
          {productsDisplay.map((p) => (
            <Product key={p.id} productDisplay={p} />
          ))}
        </div>
        <footer class="main-footer">
          <div className="section-header">CART</div>
          <div className="cart-row">
            <span className="cart-item cart-header cart-column">ITEM</span>
            <span className="cart-price cart-header cart-column">PRICE</span>
            <span className="cart-quantity cart-header cart-column">
              QUANTITY
            </span>
          </div>

          <div className="cart-items"></div>

          <div className="cart-total">
            <strong className="cart-total-title">Total</strong>
            <span className="cart-total-price">ksh 0</span>
          </div>
          <button className="btn btn-primary btn-purchase" type="button">
            PURCHASE
          </button>
        </footer>
        <div class="mapouter">
          <div class="gmap_canvas">
            <iframe
              width="900"
              height="400"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=Olympic%20Shopping%20Center%2C%20Sergeant%20Kahande%20St%2C%20Nairobi%20City&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameborder="5"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
