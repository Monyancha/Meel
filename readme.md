# MealDate - FE

this should be the latest stable version. still working….

#### Update Log

```
2019-02-25 13:54:00: network and authentication component for login
2019-02-24 00:32:00: add a static login page
2019-02-23 01:00:00: app created
```

## Quick Setup

#### 1, Node.js

```bash
# Check if you have `node.js` 
# ([download_link](https://nodejs.org/en/download/))
node --version
```

#### 2, Ionic & Angular

```bash
# This comes with all of the Ionic components 
# and Angular specific services and features.
# Good Luck
npm install -g ionic
npm install -g @angular/cli
npm install @ionic/angular@latest --save
```

#### 3, Cordova & Ionic Native

```bash
# First, download and `cd` to this project
# then run the following command
npm i -g cordova
ionic cordova plugin add cordova-plugin-advanced-http
npm install @ionic-native/http
```

## Emulation

#### 1, Run on iOS (mac ONLY)

```bash
# Make sure you have Cordava and Xcode installed.
npm install -g ios-sim
npm install -g ios-deploy

# Build & Run on simulator
ionic cordova emulate ios 
```

```bash
# Try this to fix if 'XCode not found'
xcode-select --install
sudo xcode-select --switch /Library/Developer/CommandLineTools
# Try this to fix if 'build failed'
ionic cordova emulate ios --buildFlag="-UseModernBuildSystem=0"
```

#### 2, Run on Web

```bash
# Run this if you are running the app for the first time to 
# install additional packages, could take a while(~400MB)...
npm install	

# Serve the app
# app should load automatically on your default web browser. 
ionic serve
```

