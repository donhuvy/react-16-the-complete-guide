import React, { Component } from 'react'

export default (WrappedComponent, className) => {
  return class extends Component {
    render () {
      return <div className={className}><WrappedComponent {...this.props} /></div>
    }
  }
}
