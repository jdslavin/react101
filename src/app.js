import React from "react";
import { FormattedMessage } from 'react-intl';
import Typography from 'material-ui/Typography';


export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = 'Jeff';
    return (
      <Typography variant='title'>
        <FormattedMessage
          id="hello"
          defaultMessage='Hello {name}!!'
          values={{name: name}}/>
      </Typography>);
  }
}