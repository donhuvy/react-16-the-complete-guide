import React from 'react'
import classes from './Cockpit.css'

const cockpit = (props) => {
  let btnClass = classes.Button;
  let assignedClasses = [];

  if (props.people.length <= 2) {
    assignedClasses.push(classes.red);
  }

  if (props.people.length <= 1) {
    assignedClasses.push(classes.bold);
  }

  if (props.showPeople) {
    btnClass = [classes.Button, classes.Red].join(' ');
  }

  return [
    <h1 key="header">{props.appTitle}</h1>,
    <p key="summary" className={assignedClasses.join(' ')}>the list is below</p>,
    <button
      key="toggle"
      className={btnClass}
      onClick={props.click}>Toggle People</button>,
    <button
      onClick={props.login}>
      Log in</button>
  ];
};

export default cockpit;
