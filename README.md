# Progressive Web Apps @cmda-minor-web · 20-21

In this course I will convert the client side web application I made previously in the Web App From Scratch course into a server side rendered application. I will also add functionalities based on the Service Worker and turn the application into a Progressive Web App. Ultimately I am going to implement a series of optimisations to improve the performance of the application.

## :mortar_board: Learning goals

-   _You understand the difference between client side and server side rendering and you can apply server side rendering
    in your application_
-   _You understand how a Service Worker works and you can implement it in your application._
-   _You understand how the critical render path works and how you can optimize it for a better runtime and / or perceived performance._

[Rubric with learning goals](https://icthva.sharepoint.com/:x:/r/sites/FDMCI_EDU__CMD20_21_Minor_Web_5i7j73jt/_layouts/15/Doc.aspx?sourcedoc=%7B276F53A7-2531-4006-8AD2-08C9A82D3A11%7D&file=PWA%202021%20Rubric.xlsx&action=edit&mobileredirect=true&wdPreviousSession=92686bea-446f-40e3-9303-33fa3f832b82&wdOrigin=TEAMS-ELECTRON.teams.undefined)

<!-- Add a link to your live demo in Github Pages 🌐-->

## :flower_playing_cards: Project poster

![Project Poster](https://i.imgur.com/LZ7lU3m.png)

## :computer: Demo Link

[Link to live Demo](mbergevoet.github.io/progressive-web-apps-2021/)

## :fax: About the API

For this course I'm using the [Star Wars API](https://swapi.dev/). This API is and open REST API which means you don't need a key to access it. But because it's free you only get 10.000 requests per day. That's still a lot of requests but there is a limit. <br>
Obiously the API returns JSON String data which I can use to inject it into a HTML page. <br>
Unfortunatly for me, the API hasn't been updated since 2014. Because of that the newer Star Wars movies aren't available so there isn't as much content. <br>
<br>
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

## :electric_plug: Installation

Go to the right directory:

```
cd yourDirectory
```

Clone repo:

```
git clone https://github.com/mbergevoet/web-app-from-scratch-2021.git
```

Once cloned:

```
npm install
```

Once all dependencies are installed:

```
npm run dev
```

## :bookmark_tabs: License

> This repository uses [MIT](https://github.com/mbergevoet/iCOV-redesign/blob/master/LICENSE) license. © Merlijn Bergevoet 2021

<!-- ☝️ replace this description with a description of your own work -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
