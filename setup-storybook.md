# Setup Storybook
## Add Storybook to the application
``` 
https://storybook.js.org/
```

```
npm i -g @storybook/cli
getstorybook
yarn storybook
quit storybook with ^C
```

Create file **src/Movies.js** with the following contents

``` 
import React from "react";

export const Movies = () => {
  return <div>Hello React!</div>;
};
```

Modify **src/index.js** 
``` 
import React from "react";
import ReactDOM from "react-dom";

import {Movies} from './Movies';

ReactDOM.render(<Movies />, document.getElementById("index"));
```

Modify **stories/index.stories.js** 
<pre>
import React from 'react';
import { storiesOf } from '@storybook/react';

import { Movies } from '../src/Movies';

storiesOf('Movies', module)
  .add('storybook', () => <Movies/>);
</pre>

Run storybook again
``` 
yarn storybook
```

Modify Hello React! to Hello (your name) in **src/Movies.js** and watch storybook in browser
```
import React from "react";

export const Movies = () => {
  return <div>Hello Jeff!</div>;
};
```

## Turn app into a component
Update **src/Movies.js**

```
import React from "react";

export class Movies extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>Hello Jeff!!</div>);
  }
}
```
