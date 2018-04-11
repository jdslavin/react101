import React from "react";
import { FormattedMessage } from 'react-intl';

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = 'Jeff';
    return (
      <div>
        <FormattedMessage
          id="hello"
          defaultMessage='Hello {name}!!'
          values={{name: name}}/>
      </div>);
  }
}