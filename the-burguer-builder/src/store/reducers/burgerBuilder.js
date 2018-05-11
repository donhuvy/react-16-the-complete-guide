import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:
      const addedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
      const addedIngredients = updateObject(state.ingredients, addedIngredient)
      
      return updateObject(state, {
        ingredients: addedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      })
    case actionTypes.REMOVE_INGREDIENT:
      const removedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
      const removedIngredients = updateObject(state.ingredients, removedIngredient)
      
      return updateObject(state, {
        ingredients: removedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      })
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
      })
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true })
    default:
      return state
  }
}

export default reducer