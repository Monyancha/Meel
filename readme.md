# YaleMealDate - FrontEnd

this should be the latest stable version. still working….

## Quick Setup -  for unix/mac ONLY

### 1, Intall Node.js

Check if you have `node.js` ([download_link](https://nodejs.org/en/download/)).

```bash
node --version
```

### 2, Ionic CLI && Angular && ionic@angular

This comes with all of the Ionic components and Angular specific services and features.

```bash
npm install -g ionic
npm install -g @angular/cli
npm install @ionic/angular@latest --save
```

### 3, iOS Support (optional & mac users ONLY)

Make sure you have Xcode(version 8.0 above) installed.

```bash
npm install -g ios-sim
npm install -g ios-deploy
```

## Run on Web

pull this repo, and `cd` to it

```bash
# Run this if you are running the app for the first time to 
# install additional packages, can take a while
npm install	

# Serve the app
ionic serve
```

The app should load automatically on your default browser. 