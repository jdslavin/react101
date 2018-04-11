import React from 'react';
import { storiesOf } from '@storybook/react';
import { IntlProvider } from 'react-intl';

import  App from '../src/App';

storiesOf('App', module)
  .addDecorator((getStory) => (
    <IntlProvider locale="en">
      { getStory() }
    </IntlProvider>
  ))
  .add('storybook', () => <App/>);

