import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Evaluations extends Component {
  render() {
    const { email, rating, text } = this.props;
    return (
      <div>
        <p data-testid="review-card-email">{email}</p>
        <p data-testid="review-card-rating">{rating}</p>
        <p data-testid="review-card-evaluation">{text}</p>
      </div>
    );
  }
}

Evaluations.propTypes = {
  // evaluations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  email: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Evaluations;
