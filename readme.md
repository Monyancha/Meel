# MealDate

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
npm install -g ionic 
npm install -g @angular/cli
npm install @ionic/angular@latest --save
```

#### 3, Cordova(iOS Native Support)

```bash
# First, download and `cd` to this project
# then run the following command
npm i -g cordova
npm install -g ios-sim
npm install -g ios-deploy
npm install @ionic-native/http --save
ionic cordova plugin add cordova-plugin-advanced-http
ionic cordova prepare ios
```

## Build & Run

#### 1, iOS Emulation

```bash
# Build & Run on simulator
ionic cordova emulate ios 
```

```bash
# ERROR: 'XCode not found'
xcode-select --install
sudo xcode-select --switch /Library/Developer/CommandLineTools
# ERROR 'Build failed'
ionic cordova emulate ios --buildFlag="-UseModernBuildSystem=0"
```

#### 2, Web Emulation

Make sure to add `-l` when runing with `ionic serve`

```bash
# app should load automatically on your default web browser. 
ionic serve -l
```

#### 3, Real iPhone

```bash
1, open Xcode. Use File » Open and locate the app. Open the app's platforms/ios directory
2, Plug in your iphone into your PC
3, Select Buikd » and select your device to run the app!	
```

## Examples

|                            Login                             |                             Main                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![](https://github.com/adamzjk/MealDateFrontEnd/blob/master/screenshots/login.png) | ![](https://github.com/adamzjk/MealDateFrontEnd/blob/master/screenshots/main.png) |

