import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

class ProductCard extends Component {
  render() {
    const { title, price, thumbnail, shipping } = this.props;
    const freeShipping = shipping === undefined ? false : shipping.free_shipping;
    return (
      <div data-testid="product" className="card-first-section">
        <CardMedia
          component="img"
          data-testid="product-detail-image"
          alt={ title }
          src={ thumbnail }
        />
        <CardContent>
          <div className="card-second-section">
            <Typography
              variant="h9"
              data-testid="product-detail-name"
            >
              { title }

            </Typography>
            <Typography
              variant="body2"
              data-testid="product-detail-price"
            >
              { price }

            </Typography>
            <CardActions>
              {
                freeShipping && <Button data-testid="free-shipping">FRETE GRÁTIS</Button>
              }
            </CardActions>
          </div>
        </CardContent>
      </div>
    );
  }
}
ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  shipping: PropTypes.shape({
    free_shipping: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ProductCard;
