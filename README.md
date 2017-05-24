# FE challenge

This is an implementation of the challenge using React.

# Running the app in dev

You need the following installed in your system:

- nodejs 6+ https://nodejs.org/en/download/
- yarn https://yarnpkg.com/lang/en/docs/install/

After cloning the repo:
```
$ cd ra-fe-challenge
$ yarn install
$ yarn start
```

Yarn start will run the webpack-dev-server and precompile all the necessary
files (ES6, JSX, sass, etc)

The app will be served at http://localhost:8080/ (or a higher port if that is in
use)

# Building the app

The build system uses webpack as build pipeline. You can build the app with:

```
$ yarn build
```

the dist output will be located under the `build` folder.


# Overview of the app

The notes below are to explain the layout of the project and the architecture.


## Layout

- src: contains all the source code. JSX and ES6 Code is transpiled to ES5
  in webpack using the babel.
  style is written using sass. entry point is styles.scss
  This folder also contains an index.html as a template to form the index.html
  entry point.
- src/components: holds all the custom React components
- public: static assets such as pics (only one in this case)
- root folder: config files mostly such as yarn.lock, package.json, elm-package.json, etc


## Frontend (React app)

This is very simple React app. The main App component is the root component of
the app. This root component is the one that holds all the state and passes
necessary pieces of state to child components.

Child components never modify the state directly but follow the best practice of
keeping the data flowing "downwards" (towards nested components) and only update
parent components in the case of a global state change via handlers.
