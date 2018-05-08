import React, { Component } from 'react'

export default (WrappedComponent, className) => {
  const WithClass = class extends Component {
    render () {
      return (
        <div className={className}>
          <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
        </div>
      )
    }
  }

  return React.forwardRef((props, ref) => {
    return <WithClass {...props} forwardedRef={ref} />
  })
}
