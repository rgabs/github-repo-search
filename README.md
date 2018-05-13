## Github repo search

Github Repo search app for web, native Android and iOS

> Boilerplate URL: https://github.com/callstack/universal-react-app

### Installation

Simply clone the repo and run `yarn` in root project directory.

### Getting started

#### Web

```bash
yarn run test-update
```

And head to http://localhost:3000/

> *NOTE:* Github login will work only on port 3000 since github redirects to http://localhost:3000/ on successful authentication.

#### Native

At the beginning you need to start `haul` with:

```bash
yarn run haul
```

Now you can proceed with running your app.
To run iOS version:

```bash
yarn run ios
```

and for Android similar:

```bash
yarn run android
```

> *NOTE:* You need XCode and Android SDK + emulator to run the native side.

#### Testing

```bash
yarn run test
```
For running the tests in watch mode


```bash
yarn run test
```
For updating/creating test snapshots


### Screenshots

<div style="text-align:center" id='qr-code'>
<img src="/screenshots/1.png" width='30%' style="display:inline-block;" hspace="20">
<img src="/screenshots/2.png" width='30%' style="display:inline-block;" hspace="20">
<br />
<img src="/screenshots/3.png" width='25%' style="display:inline-block;" hspace="20">
<img src="/screenshots/4.png" width='25%' style="display:inline-block;" hspace="20">
<br />
<img src="/screenshots/5.png" width='25%' style="display:inline-block;" hspace="20">
<img src="/screenshots/6.png" width='25%' style="display:inline-block;" hspace="20">
<img src="/screenshots/7.png" width='25%' style="display:inline-block;" hspace="20">
</div>

### Features

* Search for public Github repos by repo name.
* Sort functionality in each header.
* Caching of previously searched repos.
* Github login integration. The user's repos will be highlighted.
* Pagination/Sorting/Flexible rows on the UI.
* Shared Logic of the app between Native Mobile and web.

### TODO

* Write unit test cases for the codebase
* Persist app state when we login to Github on the web app.
