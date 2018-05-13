import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

const purchaseBurgerSuccess = (id, order) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    order: order
  }
}

const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  }
}

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (order) => {
  return (dispatch, getState) => {
    dispatch(purchaseBurgerStart())
    order['userId'] = getState().auth.userId

    axios.post('/orders.json?auth=' + getState().auth.token, order)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, order))
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error))
      });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = () => {
  return (dispatch, getState) => {
    dispatch(fetchOrdersStart())

    const queryParams = '?auth=' + getState().auth.token + '&orderBy="userId"&equalTo="' + getState().auth.userId + '"'
    axios.get('/orders.json' + queryParams)
      .then(response => {
        const orders = [];
        
        for (let key in response.data) {
          orders.push({
            ...response.data[key],
            id: key,
          });
        }
        
        dispatch(fetchOrdersSuccess(orders))
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error))
      });
  }
}