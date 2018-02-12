import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

class BurguerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
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
    alert('you continue!');
  }
  
  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }
    
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    
    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        </Modal>
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
  }
}

export default BurguerBuilder