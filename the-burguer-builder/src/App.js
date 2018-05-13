import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import asyncComponent from './hoc/asyncComponent'

import Layout from './hoc/Layout/Layout'
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder'

import * as actions from './store/actions/index'

const AsyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})

const AsyncLogout = asyncComponent(() => {
  return import('./containers/Auth/Logout')
})

const AsyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const AsyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup()
  }

  render() {
    const routes = this.props.isAuthenticated
      ? (
        <Switch>
          <Route path="/checkout" component={AsyncCheckout} />
          <Route path="/orders" component={AsyncOrders} />
          <Route path="/logout" component={AsyncLogout} />
          <Route path="/auth" component={AsyncAuth} />
          <Route exact path="/" component={BurguerBuilder} />
          <Redirect to='/' />
        </Switch>
      ) : (
        <Switch>
          <Route path="/auth" component={AsyncAuth} />
          <Route exact path="/" component={BurguerBuilder} />
          <Redirect to='/' />
        </Switch>
      )

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
