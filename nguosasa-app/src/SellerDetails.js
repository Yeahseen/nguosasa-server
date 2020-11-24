import React from 'react';
import axios from 'axios';
import Loading from './Loading';
import Error from './Error';

class SellerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerDetails: [0],
      loading: false,
      error: false,
    };
  }
  componentDidMount() {
    this.fetchSellerDetails();
  }
  fetchSellerDetails() {
    this.setState({ loading: true, error: false });

    const { sellerId } = this.props;
    const sellerDetailsPromise = axios.get(`/api/sellers/${sellerId}`);
    axios
      .all([sellerDetailsPromise])
      .then(
        axios.spread((sellerDetailsResponse) => {
          this.setState({
            sellerDetails: sellerDetailsResponse.data,
            loading: false,
            error: false,
          });
        })
      )
      .catch((error) => {
        this.setState({
          sellerDetails: [],
          loading: false,
          error: true,
        });
      });
  }
  render() {
    const { sellerDetails, loading, error } = this.state;
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <Error />;
    }

    const { name, phone, stallno } = sellerDetails[0];
    return (
      <div className="mvls-container">
        <div className="mvls-product-details-wrapper">
          <div className="mvls-product-details">
            <div className="mvls-product-details-info">
              <h2>
                <span>Details Of The Seller</span>
              </h2>
              <p>
                <span>Name: {name}</span>
              </p>
              <p>
                {' '}
                <span>Stall Number: {stallno}</span>
              </p>
              <p>
                <span>Phone Number: {phone}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SellerDetails;
