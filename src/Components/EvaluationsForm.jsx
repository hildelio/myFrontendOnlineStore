import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Evaluations from './Evaluations';

class EvaluationsForm extends Component {
  state = {
    email: '',
    details: '',
    rating: [false, false, false, false, false],
    ratingValue: 0,
    valid: true,
    evaluations: [],
  };

  count = Array.from({ length: 5 }, (element, index) => index);

  componentDidMount() {
    this.loadevaluations();
  }

  loadevaluations = () => {
    // const { match: { params: { id } } } = this.props;
    // console.log(id);

    const { prodId } = this.props;
    let evaluations = localStorage.getItem(prodId);
    if (evaluations !== null) {
      evaluations = JSON.parse(evaluations);
      this.setState({
        evaluations,
      });
    }
  };

  onCheckboxChange = ({ target }) => {
    let { name } = target;
    name = (+name); // transforma em número

    const { rating } = this.state;
    for (let i = name; i >= 0; i -= 1) {
      rating[i] = true;
    }
    for (let i = rating.length - 1; i > name; i -= 1) {
      rating[i] = false;
    }

    this.setState({
      rating,
      ratingValue: name + 1,
    });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  checkbox = (index) => {
    const { rating } = this.state;
    return (
      <input
        type="checkbox"
        name={ index }
        data-testid={ `${index + 1}-rating` }
        id="checkboxs"
        checked={ rating[index] }
        onChange={ this.onCheckboxChange }
      />
    );
  };

  checkInputs = () => {
    const { email, details, ratingValue, evaluations } = this.state;
    const { prodId } = this.props;
    // regex de teste de email
    const re = /\S+@\S+\.\S+/;
    const result = re.test(email);

    if (email.length > 0 && ratingValue > 0 && result === true) {
      evaluations.push({ email, text: details, rating: ratingValue });
      this.setState({
        email: '',
        details: '',
        rating: [false, false, false, false, false],
        ratingValue: 0,
        valid: true,
        evaluations,
      });
      localStorage.setItem(prodId, JSON.stringify(evaluations));
    } else {
      this.setState({
        valid: false,
      });
    }
  };

  render() {
    const { email, details, valid, evaluations } = this.state;
    return (
      <form>
        <fieldset>
          <legend>Formulário de Avaliação</legend>
          <label htmlFor="input-email">
            Email
            <input
              required
              name="email"
              value={ email }
              type="email"
              id="input-email"
              data-testid="product-detail-email"
              onChange={ this.onInputChange }
            />
          </label>
          { this.count.map((num, key) => (<div key={ key }>{ this.checkbox(num) }</div>))}
          <br />
          <br />
          <label htmlFor="product-details">
            <textarea
              type="text"
              name="details"
              id="product-details"
              value={ details }
              placeholder="Escreva algo sobre o produto"
              data-testid="product-detail-evaluation"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.checkInputs }
          >
            Avaliar
          </button>
          {!valid && (<p data-testid="error-msg">Campos inválidos</p>) }
        </fieldset>
        <fieldset>
          { evaluations.map((evaluation, index) => (
            <fieldset key={ index }>
              <Evaluations
                email={ evaluation.email }
                rating={ evaluation.rating }
                text={ evaluation.text }
              />
            </fieldset>
          ))}
        </fieldset>
      </form>
    );
  }
}

EvaluationsForm.propTypes = {
  prodId: PropTypes.string.isRequired,
};

export default EvaluationsForm;
