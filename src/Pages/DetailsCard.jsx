import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReplyIcon from '@mui/icons-material/Reply';
import { IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { getProductById } from '../services/api';
import ProductCard from '../Components/ProductCard';
import { saveCartItems, getCartItems } from '../services/localStorageAPI';
import EvaluationsForm from '../Components/EvaluationsForm';
import '../css/DetailsCard.css';
import logo from '../assets/logo.png';

class DetailsCard extends Component {
  state = {
    product: [],
    cartList: [],
  };

  async componentDidMount() {
    await this.getProduct();
    await this.getCartListState();
  }

  getCartListState = async () => {
    const cartList = getCartItems();
    this.setState({
      cartList,
    });
  };

  getProduct = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const response = await getProductById(id);
    this.setState({
      product: response,
    });
  };

  addCartList = (event) => {
    const { target } = event;
    const { product, cartList } = this.state;

    const index = cartList.findIndex((produc) => produc.id === target.id);
    const ERROR = -1;

    if (index !== ERROR) {
      cartList[index].amount += 1;
    } else {
      product.amount = 1;
      cartList.push(product);
    }

    saveCartItems(cartList);
    this.getCartListState();
  };

  render() {
    const { product, cartList } = this.state;
    const {
      history,
      match: {
        params: { id },
      },
    } = this.props;
    return (
      <main className="details-container">
        <header className="details-header">
          <IconButton
            type="button"
            onClick={ () => history.push('/') }
          >
            <ReplyIcon />
            {' '}
            Voltar
          </IconButton>
          <img src={ logo } alt="logo" />
          <div className="details-cart-button">
            <IconButton
              type="button"
              onClick={ () => history.push('/cart') }
              data-testid="shopping-cart-button"
            >
              Carrinho de compras
              {' '}
              <AddShoppingCartIcon />
            </IconButton>
            <div data-testid="shopping-cart-size">
              { cartList !== null
          && cartList.reduce((prev, curr) => (+prev) + (+curr.amount), 0) }
            </div>
          </div>
        </header>
        <section className="details-content">
          <div className="details-card">
            {product && (
              <Card
                sx={ { maxWidth: 180 } }
                key={ product.id }
                className="card"
              >
                <ProductCard
                  title={ product.title }
                  price={ product.price }
                  thumbnail={ product.thumbnail }
                  shipping={ product.shipping }
                />
                <IconButton
                  id={ product.id }
                  type="button"
                  data-testid="product-detail-add-to-cart"
                  onClick={ this.addCartList }
                >
                  <AddShoppingCartIcon />
                  {' '}
                  Adicionar ao Carrinho
                </IconButton>
              </Card>
            )}
          </div>
          <div>
            <EvaluationsForm prodId={ id } />
          </div>
        </section>
      </main>
    );
  }
}

DetailsCard.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default DetailsCard;
