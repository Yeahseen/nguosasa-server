import React from 'react';
import axios from 'axios';
import Loading from './Loading';
import Error from './Error';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: [],
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
        axios.spread(productDetailsResponse => {
          this.setState({
            productDetails: productDetailsResponse.data,
            loading: false,
            error: false,
          });
        })
      )
      .catch(error => {
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

    if (productDetails.length !== 1) {
      return <Error message="Sorry, the item does not exist. Please retry." />;
    }

    const { name, Description, price, poster } = productDetails[0];

    return (
      <div className="mvls-container">
        <div className="mvls-item-details-wrapper">
          <div className="mvls-item-details">
            <img className="mvls-item-details-poster" src={poster} alt={name} />
            <div className="mvls-item-details-info">
              <h2>{name}</h2>
              <p>{Description}</p>

              <p>
                <span>price</span>: {price}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
