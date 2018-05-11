import React, { Component } from 'react'
import { connect } from 'react-redux'

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import * as actions from '../../store/actions/index'

class BurguerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount () {
    this.props.onInitIngredients()
  }
  
  updatePurchaseState () {
    const sum = Object.values(this.props.ingredients).reduce((sum, el) => sum + el, 0);
    
    return sum > 0
  }
  
  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }
  
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }
  
  purchaseContinueHandler = () => {
    this.props.onPurchaseInit()
    this.props.history.push('/checkout')
  }
  
  render () {
    const disabledInfo = {
      ...this.props.ingredients
    }
    
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    
    let orderSummary = null ;
    let burger = this.props.error ? <p>Ingredients cant be loaded!</p> : <Spinner />;
    
    if (this.props.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            price={this.props.totalPrice}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState()}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            ordered={this.purchaseHandler} />
        </Auxiliary>
      );
      
      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
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

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: ingredientName => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios))