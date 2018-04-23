# Add testing

## References
[Jest testing library](https://facebook.github.io/jest)

[Storyshots addon for storybook](https://github.com/storybooks/storybook/tree/master/addons/storyshots)

```
yarn add jest -D
yarn add @storybook/addon-storyshots -D
yarn add react-test-renderer -D
```

Add file **.storybook/Storyshots.test.js**
```
import initStoryshots from '@storybook/addon-storyshots';

initStoryshots();
```

Update scripts in **package.json**
```diff
"scripts": {
    "start": "webpack-dev-server --mode development --open --hot",
    "build": "webpack --mode production",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
+    "test": "jest --watchAll"
  },
```

Run tests
```
yarn test
```

Congratulations, you have created a functioning react applicaton
