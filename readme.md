# MealDate

this is the latest front-end of our app 'MealDate' for Yale CPSC 539 Software Engineering.

#### Update Log

```
2019-04-08 03:55:00: add animations
2019-04-05 20:25:00: UI improvements
2019-03-24 20:08:00: add GoogleMaps!
2019-03-23 23:15:00: add invitation list page
2019-03-21 20:20:00: add recommendation page
2019-03-10 21:56:00: finish settings page
2019-03-09 23:48:00: FB login temporarily disabled
2019-03-09 22:53:00: allow facebook login
2019-03-09 17:28:00: bugs fix
2019-02-25 13:54:00: add login authentication
2019-02-24 00:32:00: add static login page
2019-02-23 01:00:00: app created
```

# Demo

![alt text](https://github.com/adamzjk/MealDateFrontEnd/blob/master/screenshots/demo.jpg "Demo")

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
ionic cordova prepare ios
```

## Build & Run

#### 1, iOS Emulation

```bash
# mac only, xcode required
# no need to add build&test params, I already include these in
# local script 'package.json.scripts'
npm run emulate-live
```

#### 2, Web Emulation

**WARNING:** this will not be supported in future due to the presence of native calls. 

```bash
# -l stands for live reload
# -w=c means run with chrome
ionic serve -l -w=c

# open original
http://localhost:8100
```

#### 3, iOS Device

```bash
# Firt Run this to compile
ionic cordova prepare ios

# 1, Open Xcode. Use File » Open and locate the app. Open the app platforms/ios directory
# 2, Plug in your iphone into your PC
# 3, Select Build » and select your device to run the app!	
```
