javascript-seed-project
=======================

This repo has a bunch of **orphan** git branches containing flavours of JavaScript-based seed projects.

## `create-react-app`

https://github.com/dashed/javascript-seed-project/tree/create-react-app

Batteries:

- [create-react-app](https://github.com/facebook/create-react-app)
- [flow](https://flow.org/)
- [prettier](https://github.com/prettier/prettier)
- [react-app-rewired](https://github.com/timarney/react-app-rewired)
- [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver)

Using this seed:

```sh
git clone --depth=1 --branch=create-react-app git@github.com:dashed/javascript-seed-project.git

# optional step
cd javascript-seed-project
rm -rf .git
```

## `react-webpack`

https://github.com/dashed/javascript-seed-project/tree/react-webpack

Batteries:

- webpack
- babel
- react
- redux
- eslint

Using this seed:

```sh
git clone --depth=1 --branch=react-webpack git@github.com:dashed/javascript-seed-project.git

# optional step
cd javascript-seed-project
rm -rf .git
```

## `legacy`

https://github.com/dashed/javascript-seed-project/tree/legacy

The original contents of `javascript-seed-project` project.

**NOTE:** As of May 2017, this seed is not maintained anymore.

Using this seed:

```sh
git clone --depth=1 --branch=legacy git@github.com:dashed/javascript-seed-project.git

# optional step
cd javascript-seed-project
rm -rf .git
```

## Adding a new seed.

Pull request for orphan branches is not possible: https://github.com/isaacs/github/issues/701

License
=======

Public domain.
