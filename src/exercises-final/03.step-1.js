// Flexible Compound Components with context (step 1)
// This is just here to help you see the iteration from the first step to the last

import React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()

class Toggle extends React.Component {
  static On = ({children}) => (
    <ToggleContext.Consumers>
      {({on}) => (on ? children : null)}
    </ToggleContext.Consumers>
  )
  static Off = ({children}) => (
    <ToggleContext.Consumers>
      {({on}) => (on ? null : children)}
    </ToggleContext.Consumers>
  )
  static Button = props => (
    <ToggleContext.Consumers>
      {({on, toggle}) => (
        <Switch on={on} onClick={toggle} {...props} />
      )}
    </ToggleContext.Consumers>
  )
  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  render() {
    return (
      <ToggleContext.Provider
        value={{on: this.state.on, toggle: this.toggle}}
      >
        {this.props.children}
      </ToggleContext.Provider>
    )
  }
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <div>
        <Toggle.Button />
      </div>
    </Toggle>
  )
}
Usage.title = 'Flexible Compound Components'

export {Toggle, Usage as default}