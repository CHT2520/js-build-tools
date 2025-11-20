# NPM, JavaScript Build Tools and using a Front-End Framework
## If you are using Codespaces
- Open your existing codespace (The one we used in the first four weeks of the module) https://github.com/codespaces.
- In the terminal enter
```
git clone https://github.com/CHT2520-web-prog/js-build-tools
```
- This will copy the contents of this repository into your codespace.

## If you are using XAMPP
- Download this repository and unzip it. Move the folder into your htdocs directory on XAMPP.

## Completing the practical work

### Modular JavaScript

Previously when we looked at JavaScript, all our JavaScript was in a single file. When writing more complex applications we typically split the code into different 'modules', and then import the code when needed. To demonstrate this:-

- Create a new file in the _src_ folder. name this file _app.js_
- Add the following code in this file:

```javascript
function showMessage() {
  alert("This came from an imported module");
}
export default showMessage;
```

- This declares a simple function and then 'exports' it so it can be used by other files.
- Change the code in _main.js_ to the following:-

```javascript
import showMessage from "./app.js";
alert("Hello from JavaScript");
showMessage(); //calls the function from the imported module
```

- This uses an `import` statement to load the exported function.
- Refresh the page in a browser. You should get two `alert()` messages.
- Have a look in _index.html_
  - Note the `<script>` tag that loads the JavaScript. It has a `type` attribute of _module_ which tells the browser we are using modular JavaScript code.

## Installing and Using Packages

Often in our JavaScript we will want to use 3rd party code (libraries/frameworks). To do this we need to use NPM to download and install this code (a package).

- Open a new terminal/shell
- Using the terminal/shell navigate to the root of this project folder e.g. `cd js-build-tools`.
- Enter the following command

```
npm install --save color-name
```

- This will install the _color-name_ package.
- You should get some feedback saying it is downloading and installing
- If you look in the _node_modules_ folder you should find you have a _color-name_ folder where these files have been installed.
- Open _package.json_. This keeps tracks of the different packages we have installed. You should be able to see the _color-name_ package.

_color-name_ is a really simple package; it simply tells us the RGB value for common colour names.

- To use this package we need to import it
- Change _main.js_ to the following:

```javascript
import showMessage from "./app.js";
import colors from "color-name";
alert("Hello from JavaScript");
showMessage();
alert("lightblue has an RGB value of: " + colors.lightblue); // this line uses the color-name package
```

- We are now importing _color-name_ and then using it on the final line to tell us the RGB value for lightblue.

- If you try and run this example in a browser, it won't work.

By default browsers don't know where to find the packages we have installed into our project.

In order to use Node.js packages we need a build tool. A build tool will look through all the `import` statements, find the dependencies needed to run the app and build JavaScript files the browser can understand.

## Installing the Vite Build Tool

We will use Vite (https://vite.dev/) as the build tool.
Enter the following into the shell/terminal

```
npm install --save-dev vite
```
- Again you should get some feedback that Vite is being installed
- Open _package.json_. Notice that _color-name_ has been installed under _dependencies_ but Vite has been installed under _devDependencies_.
  - _devDependencies_ (development dependencies) is for packages that are needed during development e.g. to build the JavaScript file, but are never used by our app or run in the browser. We used the `--save-dev` flag during installation to specify Vite as a development dependency.



- We will get Vite to serve our web app.
- Enter the following into the shell/terminal.

```
npx vite
```

- You should get some feedback about Vite starting a server e.g. http://localhost:5137.
- Open the browser at this URL and the app should work. You should get three alert messages. The final one uses the _color-name_ package. We have successfully installed and used a Node.js package.

## Using React
React is a front-end library that makes it easier for us to build complex JavaScript web applications. However, web browsers don't understand React code, so we need to transpile (convert) it into plain JavaScript before using it in our apps. To do this we can use a build tool such as Vite.

- Stop the Vite server (q+enter)

The project already contains some React code. Have a look at the files _App.jsx_ and _main.jsx_. React files use a markup syntax called JSX. We use the _.jsx_ filename extension to specify these files contain JSX syntax.

- Change the `<script>` element in _index.html_ to point to _main.jsx_.

```html
<script type="module" src="/src/main.jsx"></script>
```

- Using the shell/terminal install the react library

```
npm install --save react react-dom
```

- Next, install the react plug-in for vite

```
npm install --save-dev @vitejs/plugin-react
```

- We also now need a config file for Vite so it knows to transpile React code.
  - Create a new file in the root of the project called _vite.config.js_
  - Enter the following into this file:-

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()]
});
```

- Then start the vite server again

```
npx vite
```

- You should find the app now works. Users can select a decade and the list of films updates.

### Test Your Understanding

- Have a look in _App.jsx_, try and make sense of the React code.
  - There a loads of really good resources online for learning React e.g. https://react.dev/ should give you an overview to get you started.
- How can you expand this example so that it also shows films from the 1990s
  - You will need to add a new JSON file in the data directory for films from the 1990s, just add a couple of films.
    - You will need to add an additional hyperlink in the `TabbedFilmNavigation` component.
- It would be nice if the year of the film was displayed next to the title of the film e.g. Winter's Bone (2010).
  - How can you modify the code in the `FilmLink` component to do this.

## What About Tailwind?

Previously we used NPM to install and run Tailwind. We can also run Tailwind using Vite. We will then have a single build process that handles both CSS and JavaScript related tasks for us.

- Stop the Vite server
- In the shell/terminal enter the following to install Tailwind

```
npm install tailwindcss @tailwindcss/vite
```

- Add the Tailwind plug-in to _vite.config.js_

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
]
});
```


- Add the Tailwind directives in the _src/css/index.css_ CSS file

```css
@tailwind base;
```

- Add some Tailwind classes in _index.html_ and/or the React components e.g.

```html
<body class="text-red-400"></body>
```

- Restart the Vite server

```
npx vite
```

- You should find that the web app is now styled using Tailwind. We can makes changes to the React code and add Tailwind classes and Vite will watch our files and re-build the app when changes are made.

## Generating a _dist_ Version

So far we have been using Vite for development. Once we are happy with our app and ready to publish it, we can create a _dist_ (distribution) version. The _dist_ version will feature minimised (no whitespaces, line breaks etc) CSS and JavaScript files that will work without the need for a build tool.

- In the terminal/shell enter

```
npx vite build
```

You should find that Vite generates a new version of your site in the _dist_ folder.

