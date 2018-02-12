import React, { PureComponent } from 'react'
import Person from './Person'

class People extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[People.js] inside constructor', props);
  }

  componentWillMount() {
    console.log('[People.js] componentWillMount()');
  }

  componentDidMount() {
    console.log('[People.js] componentDidMount()');
  }

  componentWillReceiveProps(nextProps) {
    console.log('[UPDATE People.js] componentWillReceiveProps()', nextProps);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE People.js] shouldComponentUpdate()', nextProps, nextState);
  //
  //   return nextProps.people !== this.props.people ||
  //     nextProps.changed !== this.props.changed ||
  //     nextProps.clicked !== this.props.clicked;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE People.js] componentWillUpdate()', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE People.js] componentDidUpdate()');
  }

  render() {
    console.log('[People.js] render');

    return this.props.people.map((person, index) => {
      return <Person
                name={person.name}
                age={person.age}
                key={person.id}
                position={index}
                click={() => this.props.clicked(index)}
                changed={(event) => this.props.changed(event, person.id)} />
    });
  }
}

export default People;
