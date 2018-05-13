import axios from 'axios'
import * as actionTypes from './actionTypes'

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  }
}

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')

  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart())

    const url = isSignup ?
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyACVVouXkd1pgVTaco1Nxd3PEgm29lFFxU'
      :
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyACVVouXkd1pgVTaco1Nxd3PEgm29lFFxU'

    axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true
    }).then(response => {
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)

      localStorage.setItem('token', response.data.idToken)
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('userId', response.data.localId)

      dispatch(authSuccess(response.data.idToken, response.data.localId))
      dispatch(checkAuthTimeout(response.data.expiresIn))
    }).catch(err => {
      dispatch(authFail(err.response.data.error))
    })
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')

    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))

      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else { 
        const userId = localStorage.getItem('userId')
        
        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}
