# Progressive Web Apps @cmda-minor-web · 20-21

In this course I will convert the client side web application I made previously in the Web App From Scratch course into a server side rendered application. I will also add functionalities based on the Service Worker and turn the application into a Progressive Web App. Ultimately I am going to implement a series of optimisations to improve the performance of the application.

## Contents
| Table of contents |
|---|
| Learning goals |
| Project poster |
| Live demo |
| Installation 
| npm scripts/ tooling |
| npm packages |
| Week 1 Server side rendering |
| Week 2 Service worker |
| Week 3 Critical render path |
| About the API |
| License |

## :mortar_board: Learning goals

-   _You understand the difference between client side and server side rendering and you can apply server side rendering
    in your application_
-   _You understand how a Service Worker works and you can implement it in your application._
-   _You understand how the critical render path works and how you can optimize it for a better runtime and / or perceived performance._

[Rubric with learning goals](https://icthva.sharepoint.com/:x:/r/sites/FDMCI_EDU__CMD20_21_Minor_Web_5i7j73jt/_layouts/15/Doc.aspx?sourcedoc=%7B276F53A7-2531-4006-8AD2-08C9A82D3A11%7D&file=PWA%202021%20Rubric.xlsx&action=edit&mobileredirect=true&wdPreviousSession=92686bea-446f-40e3-9303-33fa3f832b82&wdOrigin=TEAMS-ELECTRON.teams.undefined)

<!-- Add a link to your live demo in Github Pages 🌐-->

## :flower_playing_cards: Project poster

![Project Poster](https://i.imgur.com/LZ7lU3m.png)

<br>

![Project Poster 2](https://i.imgur.com/irPslPz.png)

## :computer: Live demo

[Link to deployed Heroku app](https://star-wars-webapp.herokuapp.com/)

## :electric_plug: Installation

Go to the right directory:

```
cd yourDirectory
```

Clone repo:

```
git clone https://github.com/mbergevoet/progressive-web-apps-2021.git
```

Once cloned:

```
npm install
```

Once all dependencies are installed:

```
npm run dev
```

## :black_nib: npm scripts/ tooling
>The "scripts" property of your package.json file supports a number of built-in scripts and their preset life cycle events as well as arbitrary scripts. These all can be executed by running `npm run-script <stage>` or `npm run` for short.

[source](https://docs.npmjs.com/cli/v7/using-npm/scripts)

I have three scripts in total. <br>
The first one is for starting the appliaction when it is deployed but during development it's not used. <br>
The second one is just for the server to automaticly restart when changed are made and is used specificly in development (hence the name dev). <br>
And the third is a gulp script which minifies or 'cleans' the css file to make it take up less storage space.
```
npm start
```
```
npm run dev
```

```
npm run buildcss    
```

In my package.json it looks like this:
```js
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build:css": "gulp",
}
```

## :package: npm packages

**[compression](https://www.npmjs.com/package/compression) ![npm version](https://img.shields.io/npm/v/compression.svg)** <br>
Node.js compression middleware.

**[dotenv](https://www.npmjs.com/package/dotenv)** ![npm version](https://img.shields.io/npm/v/dotenv.svg?style=flat-square)<br>
Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`.

**[ejs](https://www.npmjs.com/package/ejs)** ![npm version](https://camo.githubusercontent.com/b87295b05c6caa5501d94643be07f827db9b217273312b133c870dcba76a91d3/68747470733a2f2f696d672e736869656c64732e696f2f7472617669732f6d64652f656a732f6d61737465722e7376673f7374796c653d666c6174)<br>
Embedded JavaScript templating.

**[express](https://www.npmjs.com/package/express)** ![npm version](https://img.shields.io/npm/v/express.svg)<br>
Fast, unopinionated, minimalist web framework for node.

**[nodemon](https://www.npmjs.com/package/nodemon)** ![npm version](https://camo.githubusercontent.com/7d7dcc8440368062ac5d89541a5fe154a375548ecb242badc7e01c4618566204/68747470733a2f2f62616467652e667572792e696f2f6a732f6e6f64656d6f6e2e737667)<br>
nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

**[node-fetch](https://www.npmjs.com/package/node-fetch)** ![npm version](https://flat.badgen.net/npm/v/node-fetch)<br>
This light-weight module brings `window.fetch` to Node.js.

**[gulp](https://www.npmjs.com/package/gulp)** ![npm version](https://img.shields.io/npm/v/gulp.svg)<br>
gulp is a toolkit that helps you automate painful or time-consuming tasks in your development workflow

**[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)** ![npm version](https://img.shields.io/npm/v/gulp-clean-css.svg?style=flat-square)<br>
gulp plugin to minify CSS

## :zap: Week 1 Server side rendering

As templating engine I used [EJS](https://ejs.co/). I already had experience with this engine form blok-tech in the second year. I've built templating architecture so that I can obiously load in data dynamicly without needing a separate page for each instance. 

## :wrench: Week 2 Service Worker

My service worker has three functionalities. the `install`, `activate` and `fetch`.

### Install

The first task the Service Worker will do is installing it self by opening a new cache. Then it goes through my array of assets I'd like it to cache and actually cache them.

### Activate

The second task Service worker will do is activate. In my case it will also check if the CACHE_NAME changed and if it did it will delete the old cache and replace it with the new version.

### Fetch

The last and third taks is fetch. For every GET request, it will clone the response and cache it. And if that fails (due to connection loss), it will go to a new offline route and serve an offline page which was previously cached in the install taks.

## :floppy_disk: Week 3 Critical render path

Before I knew what to improve about the performance of my application I tested the load times by disabeling my Service Worker and setting the network to slow 3G to discover what my bottlenecks were. My testing concluded the images I was using were way to large. And the custom font wasn't making it any faster either.

<!-- Image of lighthouse     -->

### Responsive Images

To improve the performance of the images on the detail page I decided to make them responsive images. For this to work you need two extra attributes for the `<img>` tag. srcset and sizes. In srcsset you define the possible sizes the image could have going from minimum to maximum. It's also needed to specify the image sizes with 'w'. And the sizes attribute works similar to media queries in css. You can specify the max-width or min-width of the screen for the images to change sizes. The html below shows how I implemented it. This ended up working fine but I went to another solution for my final product.

```html
<img srcset="/images/character-icon-320w.png 320w, /images/character-icon-480w.png 480w, 
/images/character-icon-640w.png 640w" 
sizes="(max-width: 480px) 320px, (max-width: 768px) 480px, (max-width: 1024px) 640px" 
src="/images/character-icon-640w.png" 
alt="placeholder character icon">
```

### SVG and webp images

Because with the responsive images I still use png images and I only reduce the pixel size it doesn't save that much compared to other methods. So that's why I turned to SVG and webp image types. The icons for the characters, starships and planets I had in Adobe Illustrator form so I could easily export them as SVG images which takes up way less space. The biggest of the three responsive sizes were roughly 53kB per image. The SVG version is only 2kB. So that was a very good optimisation to do. <br> 
The same goes for a background Image I had in the header of stars behind the Star Wars logo. I totaly forgot this image was really big in size and also in kB's without having to be so big. It was around 124kB before converting to a smaller size and image format. I converted it to a webp. Now it's only 24kB which ramped up the render time by a lot.

### Preload `<link rel="preload">`

And for the Star Wars logo and the star background to render even quicker I used the preload link tag. This makes it so that are already loaded and don't need to wait for the other content to render in first. I used it on the custom fonts was well as I found that they loaded in slower when in slow 3G. This made them render in a lot quicker obiously.

### Gulp

And last but not least I used Gulp for tooling but also for a little bit better performance. The css file wasn't that large to begin with but I made a gulp taks that will minify the css with a build script.

## :fax: About the API

For this course I'm using the [Star Wars API](https://swapi.dev/). This API is and open REST API which means you don't need a key to access it. But because it's free you only get 10.000 requests per day. That's still a lot of requests but there is a limit. <br>
Obiously the API returns JSON String data which I can use to inject it into a HTML page. <br>
Unfortunatly for me, the API hasn't been updated since 2014. Because of that the newer Star Wars movies aren't available so there isn't as much content. <br>
Down below I've written examples of possible endpoints and URL's. <br>

Base URL:

> https://swapi.dev/api/

Example requests:

> https://swapi.dev/api/films/

> https://swapi.dev/api/people/

> https://swapi.dev/api/planets/

> https://swapi.dev/api/species/

> https://swapi.dev/api/starships/

> https://swapi.dev/api/vehicles/

Example single request:

> https://swapi.dev/api/people/1/

Response example:

```js
{

    "name": "Luke Skywalker",
    "height": "172",
    "mass": "77",
    "hair_color": "blond",
    "skin_color": "fair",
    "eye_color": "blue",
    "birth_year": "19BBY",
    "gender": "male",
    "homeworld": "https://swapi.dev/api/planets/1/",
    "films": [
    	"https://swapi.dev/api/films/2/",
    	"https://swapi.dev/api/films/6/",
    	"https://swapi.dev/api/films/3/",
    	"https://swapi.dev/api/films/1/",
    	"https://swapi.dev/api/films/7/"
    ],
    "species": [
    	"https://swapi.dev/api/species/1/"
    ],
    "vehicles": [
    	"https://swapi.dev/api/vehicles/14/",
    	"https://swapi.dev/api/vehicles/30/"
    ],
    "starships": [
    	"https://swapi.dev/api/starships/12/",
    	"https://swapi.dev/api/starships/22/"
    ],
    "created": "2014-12-09T13:50:51.644000Z",
    "edited": "2014-12-20T21:17:56.891000Z",
    "url": "https://swapi.dev/api/people/1/"

}
```

Each catogory has specific attributes. Because that's a really long list I'll refer to the [documentation](https://swapi.dev/documentation) of the API.

## :bookmark_tabs: License

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

> This repository uses [MIT](https://github.com/mbergevoet/iCOV-redesign/blob/master/LICENSE) license. © Merlijn Bergevoet 2021

<!-- ☝️ replace this description with a description of your own work -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
