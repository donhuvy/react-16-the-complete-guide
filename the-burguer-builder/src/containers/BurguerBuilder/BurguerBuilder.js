import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

class BurguerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }
  
  componentDidMount () {
    axios.get('ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true })
      })
  }
  
  updatePurchaseState (ingredients) {
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0);
    
    this.setState({
      purchasable: sum > 0
    })
  }
  
  addIngredientHandler = (type) => {
    const newIngredients = {
      ...this.state.ingredients,
    }
    newIngredients[type] = this.state.ingredients[type] + 1;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    
    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchaseState(newIngredients);
  }
  
  removeIngredientHandler = (type) => {
    const ingredientCount = this.state.ingredients[type];
    
    if (ingredientCount <= 0) {
      return;
    }
    
    const newIngredients = {
      ...this.state.ingredients,
    }
    newIngredients[type] = ingredientCount - 1;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    
    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchaseState(newIngredients);
  }
  
  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }
  
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }
  
  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Max',
        address: {
          street: 'test street 1',
          zipCode: '12332',
          country: 'Germany',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    }
    
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({
          loading: false,
          purchasing: false,
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          purchasing: false,
        });
      });
  }
  
  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }
    
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    
    let orderSummary = null ;
    let burger = this.state.error ? <p>Ingredients cant be loaded!</p> : <Spinner />;
    
    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            price={this.state.totalPrice}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            ordered={this.purchaseHandler} />
        </Auxiliary>
      );
      
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
    }
    
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    
    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
          {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurguerBuilder, axios)