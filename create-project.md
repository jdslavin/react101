# Create Project
## Make a new project
```
mkdir react101
cd react101 
```

Create a **package.json**

```
npm init -y
```

Install Webpack into dev dependencies
```
https://webpack.js.org/
npm i webpack webpack-cli -D
```

Create **src/index.js** in src directory
```
mkdir src
```

```
console.log('hello');
```

Replace scripts section in  **package.json** to use webpack for builds

File should look similar to this:
```diff
{
  "name": "react101",
  "version": "1.0.0",
  "description": "Search app using React",
  "main": "index.js",
  "scripts": {
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "start": "webpack --mode development",
+    "build": "webpack --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.5.0",
    "webpack-cli": "^2.0.13",
  }
}
```

To run build
``` 
npm run build
```

