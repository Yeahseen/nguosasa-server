import React from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import Loading from './Loading';
import Error from './Error';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: [0],
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    this.fetchProductDetails();
  }

  fetchProductDetails() {
    this.setState({ loading: true, error: false });

    const { productId } = this.props;
    const productDetailsPromise = axios.get(`/api/products/${productId}`);
    axios
      .all([productDetailsPromise])
      .then(
        axios.spread((productDetailsResponse) => {
          this.setState({
            productDetails: productDetailsResponse.data,
            loading: false,
            error: false,
          });
        })
      )
      .catch((error) => {
        this.setState({
          productDetails: [],
          loading: false,
          error: true,
        });
      });
  }
  render() {
    const { productDetails, loading, error } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Error />;
    }
    var {
      name,
      type,
      poster,
      description,
      price,
      sellers_id,
    } = productDetails[0];

    if (type === 'Retail') {
      type = 'Item is in Retail';
    } else if (type === 'Wholesale') {
      type = 'Item is in Wholesale';
    }
    if (type === 'Wholesale')
      return (
        <div className="mvls-container">
          <div className="mvls-product-details-wrapper">
            <div className="mvls-product-details">
              <img
                className="mvls-product-details-poster"
                src={poster}
                alt={name}
              />
              <div className="mvls-product-details-info">
                <h2>{name}</h2>
                <p>{description}</p>
                <p>Sold in Wholesale</p>
                <p>
                  <span>price Ksh : {price}</span>
                </p>
                <form action="/cart" method="post">
                  <input type="submit" value="Add To Cart"></input>
                </form>
                <link to={`/`} className>
                  Back To Products
                </link>
                <Link
                  to={`/SellerDetails/${sellers_id}`}
                  className="mvls-btn-retail"
                >
                  See Seller Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className="mvls-container">
          <div className="mvls-product-details-wrapper">
            <div className="mvls-product-details">
              <img
                className="mvls-product-details-poster"
                src={poster}
                alt={name}
              />
              <div className="mvls-product-details-info" type="button">
                <h2>{name}</h2>
                <p>{description}</p>
                <p>Sold in Retail </p>
                <p>
                  <span>price Ksh : {price}</span>
                </p>
                <Link
                  to={`/SellerDetails/${sellers_id}`}
                  className="mvls-btn-retail"
                >
                  See Seller Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default ProductDetails;
