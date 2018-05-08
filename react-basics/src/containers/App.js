import React, { PureComponent } from 'react';
import classes from './App.css';
import Cockpit from '../components/Cockpit/Cockpit';
import People from '../components/People/People';
import withClass from '../hoc/withClass'

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[App.js] inside constructor', props);
  }

  componentWillMount() {
    console.log('[App.js] component will mount');
  }

  componentDidMount() {
    console.log('[App.js] component did mount');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] shouldComponentUpdate()', nextProps, nextState);
  //
  //   return nextState.people !== this.state.people ||
  //     nextState.showPeople !== this.state.showPeople;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] componentWillUpdate()',
      nextProps,
      nextState);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('[UPDATE App.js] getDerivedStateFromProps',
      nextProps,
      prevState);

    return prevState;
  }

  getSnapshotBeforeUpdate() {
    console.log('[UPDATE App.js] getSnapshotBeforeUpdate');
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] componentDidUpdate()');
  }

  state = {
    people: [
      {id: 'ddsda', name: 'max', age: 28},
      {id: 'frgfv', name: 'manu', age: 29},
      {id: 'bcvbg', name: 'st', age: 26}
    ],
    showPeople: false,
    toggleClickedCounter: 0,
    authenticated: false,
  }

  togglePeopleHandler = () => {
    this.setState((prevState, props) => {
      return {
        showPeople: !prevState.showPeople,
        toggleClickedCounter: prevState.toggleClickedCounter + 1,
      }
    });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.people.findIndex(person => {
      return person.id === id
    });

    const person = {
      ...this.state.people[personIndex],
      name: event.target.value,
    };

    const people = [...this.state.people];
    people[personIndex] = person;

    this.setState({
      people: people
    });
  }

  deletePersonHandler = (index) => {
    const people = [...this.state.people];
    people.splice(index, 1);
    this.setState({
      people: people
    });
  }

  loginHandler = () => {
    this.setState({authenticated: true})
  }

  render() {
    console.log('[App.js] render');
    let people = null;

    if (this.state.showPeople) {
      people = (
        <People people={this.state.people}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} />
      );
    }

    return (
      <div>
        <button onClick={() => {this.setState({showPeople: true})}}>Show people</button>
        <Cockpit
          appTitle={this.props.title}
          people={this.state.people}
          showPeople={this.state.showPeople}
          click={this.togglePeopleHandler}
          login={this.loginHandler} />
        <p>button clicked {this.state.toggleClickedCounter} times</p>
        <AuthContext.Provider value={this.state.authenticated}>
          {people}
        </AuthContext.Provider>
      </div>
    );
  }
}

export default withClass(App, classes.App);
