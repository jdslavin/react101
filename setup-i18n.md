# Add Internationalization support
```
https://github.com/yahoo/react-intl
```

``` 
yarn add react-intl 
```

Update **stories/index.stories.js** to add IntlProvider which supplies local info to the application

```diff 
import React from 'react';
import { storiesOf } from '@storybook/react';
+ import { IntlProvider } from 'react-intl';

import { Movies } from '../src/Movies';

storiesOf('Movies', module)
+  .addDecorator((getStory) => (
+    <IntlProvider locale="en">
+      { getStory() }
+    </IntlProvider>
+  ))
  .add('storybook', () => <Movies/>);

```

Update **src/Movies.js**
```diff 
import React from "react";
+ import { FormattedMessage } from 'react-intl';

export class Movies extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
+    const name = 'Jeff';

+    return (
+      <div>
+        <FormattedMessage
+          id="hello"
+          defaultMessage='Hello {name}!!'
+          values={{name: name}}/>
+      </div>);
-      return (<div>Hello Jeff!!</div>);
  }
}
```

[Proceed to Step 5 - Add Material UI support](setup-material-ui.md)
