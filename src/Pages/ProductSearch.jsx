import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from '../Components/ProductCard';
import { saveCartItems, getCartItems } from '../services/localStorageAPI';
import logo from '../assets/logo.png';
import '../css/ProductSearch.css';

class ProductSearch extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      products: [],
      query: '',
      cartList: [],
    };
  }

  componentDidMount() {
    this.getCartListState();
    this.categoriesAPI();
  }

  getCartListState = () => {
    const cartList = getCartItems();
    this.setState({
      cartList,
    });
  };

  requireAPI = async () => {
    const { query } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(null, query);
    this.setState({
      products: results,
    });
  };

  inputChange = ({ target: { value } }) => {
    this.setState({
      query: value,
    });
  };

  categoriesAPI = async () => {
    const result = await getCategories();
    this.setState({
      categories: result,
    });
  };

  categoryId = async (event) => {
    const { target: { id } } = event;
    const response = await getProductsFromCategoryAndQuery(id);
    this.setState({
      products: response.results,
    });
  };

  addCartList = async (event) => {
    const { target } = event;
    const { products, cartList } = this.state;

    const result = products.find((product) => product.id === target.id);
    const index = cartList.findIndex((product) => product.id === target.id);
    const ERROR = -1;

    if (index !== ERROR) {
      cartList[index].amount += 1;
    } else {
      result.amount = 1;
      cartList.push(result);
    }

    saveCartItems(cartList);
    this.setState({ cartList });
  };

  render() {
    const {
      categories,
      query,
      products,
      cartList,
    } = this.state;
    return (
      <div className="product-search-container">
        {/*    <button
          type="button"
          data-testid="category"
          onClick={ () => console.log('chamou') }
        >
        category
        </button> */}
        <header className="header">
          <section>
            <input
              className="input-search"
              data-testid="query-input"
              value={ query }
              name={ query }
              type="text"
              onChange={ this.inputChange }
              placeholder="Digite o que você busca"
            />
            <button
              data-testid="query-button"
              type="button"
              onClick={ this.requireAPI }
            >
              Pesquisar
            </button>
          </section>
          <img src={ logo } alt="logo" />
          <section className="cart-icon">
            <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
            <div data-testid="shopping-cart-size">
              { cartList !== null
          && cartList.reduce((prev, curr) => (+prev) + (+curr.amount), 0) }
            </div>
          </section>
        </header>
        <main className="main-search">
          <aside className="aside-categories">
            {categories.map((category) => (
              <button
                className="categories-button"
                data-testid="category"
                id={ category.id }
                name={ category.id }
                type="button"
                key={ category.id }
                onClick={ this.categoryId }
              >
                {category.name}
              </button>
            ))}
          </aside>
          {
            products.length !== 0
              ? products.map((product) => (
                <div key={ product.id }>
                  <Link
                    data-testid="product-detail-link"
                    to={ `/details-card/${product.id}` }
                  >
                    <ProductCard
                      title={ product.title }
                      price={ product.price }
                      thumbnail={ product.thumbnail }
                      shipping={ product.shipping }
                    />
                  </Link>
                  <button
                    id={ product.id }
                    type="button"
                    data-testid="product-add-to-cart"
                    onClick={ this.addCartList }
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              ))
              : (
                <div className="search-command">
                  <p data-testid="home-initial-message" className="command">
                    Digite algum termo de pesquisa ou escolha uma categoria.
                  </p>
                  <p className="product-not-found">
                    Nenhum produto foi encontrado
                  </p>
                </div>
              )
          }
        </main>
      </div>
    );
  }
}

export default ProductSearch;
