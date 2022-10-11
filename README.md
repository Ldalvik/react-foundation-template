# React on Foundation

This is a React template that has built-in libraries like Foundation SCSS, foundation-css (React library) router-dom, react-toastify, motion-ui and more.

# How to use

### Clone this repo onto your local device
```git clone https://github.com/Ldalvik/react-foundation-template.git```

### Install all libraries in package.json
Run ```npm install``` in the directory that contains package.json

This template is a react-app and contains the following libraries:

```@testing-library/jest-dom ^5.16.5```
    
```@testing-library/react ^13.4.0```
 
```@testing-library/user-event ^13.5.0```
 
```foundation-sites ^6.7.5```
 
```motion-ui ^2.0.4```
 
```react ^18.2.0```
 
```react-dom ^18.2.0```
 
```react-foundation ^0.9.7```
 
```react-router-dom ^6.4.1```
 
```react-scripts 5.0.1```
 
```react-toastify ^9.0.8```
 
```sass ^1.55.0```
 
```web-vitals ^2.1.4```

### Index.js setup
The ```index.js``` file is already configured with the installed library css files, with the ```index.css``` at the bottom to make sure your custom styles are never overwritten.

### App.js setup
Basic routers and switches for easy configuration, with a default unknown page.

### Modify Foundation Sass CSS
Contains default ```_settings.scss``` file to adjust components as needed.

Also contains ```app.scss``` with all foundation imports, including ```motion-ui```.

### Run jest test files
Create test files in the tests directory and keep your code error free with jest and react testing libs.

