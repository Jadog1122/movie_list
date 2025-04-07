## Step 1 : SetUp React Project
In terminal:
    
    npx create-react-app watchlist
    cd watchlist
    npm start

This will create a format for React.-> a folder named watchlist within the folder that we run the command. But, need to delete something useless.
- everything within public folder
- everything but app.js and app.css in src folder.

>Question about how to put in src or public?
</br>`public` hold static file: like image and favicon, and index.html. So never put .js file into public.

### We need to manually set up what we deleted before
- public/index.html
  - within <body> : make sure have one div with id="root", this is will the React app will mount
- src/index.js
  - this is the entry point for React. It rendered the App component into #root div using `ReactDOM`

### Design the component tree
    Appn
    ├── Header
    ├── SearchBar
    ├── MovieList (for search results)
    │    └── MovieCard
    ├── Watchlist
     └── MovieCard

## Step 2 Create Component in /src folder

inside component folder, we should have several parts
- header.js
- searchBar.js
- MovelList.js
- WatchList.js
- ...

so that we can render it in the App.js in `<>`

## Step 3 Put each components into App.js

after each components.js, we put import each one in the app.js
    
    return(
        <>
            <component1 />
            <component2 />
            ...
        </>
    );
> remember the the <></> before the `<components>`; and the `;` after the `return()`;


### GET API KEY


## Step 4: polish searchBar

**`useState`**: is React hook. it let your components remember and update a piece of data(Like value of text input)

`const SearchBar = ({ onSearch }) => { }`: `{ onSearch }` is the props that pass in from the parent APP.js

    function SearchBar({ onSearch }){
    const [query, setQuery] = useState('')//set the default state empty
    
    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    }
    
    return(
        <form onSubmit={handleSearch}>
            <input 
            type="text"
            placeholder="What movies are looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}//need explain what does e means/ what is e.target.value 
            />
            <button type="submit">Search</button>
        </form>
    );
    }
> what is `e` means?

`e` stands for events. it is an object automatically pass to your function when an event occurs. LIKE:
click or change; But we can named anything, `e` is just conventional

> e.target? e.target.value?

e.target is the DOM element that trigger the event. In this case, it would be `<input>`.
`e.target.value` get the current value of the input box. Each time we type, it give a new input. For example:
when we type hi, the e.target.value is h, hi.

>e.preventDefault()?

it stops the page from reloading. which is the default behaviour for browser forms.

> onSearch(query) => is the call from parent comopnent and give user input =>  `query`

## Step 5: fetch API
> how to decide what to use in the API string? 

 ans: look the documentation on how to use it. which specific parameters are we using...

 we can use Javascript inspect to check the format of API if we cant find in documentation.

    {Search: Array(10), totalResults: '7540', Response: 'True'}
    Response
    : 
    "True"
    Search
    : 
    (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    totalResults
    : 
    "7540"
    [[Prototype]]
    : 
    Object

### Each child in the list need to have a unique ID

    function MovieList({ movies }){
    return (
        <div>
            {movies.length === 0 ? (
                <p>NO MOVIES FOUND</p>
            ): (
                movies.map((movie) => (
                    <MovieCard movie={movie}/>
                ))
            )}
        </div>
    );
    }

Each item in .map() should have an unique `KEY`. and OMDBAPI give a perfect one => movie.imdbID
        
        <MovieCard key={movie.imdbID} movie={movie}/>

## Step 6: Logic through basic set up
In the handleBar, we first handle we should we do when user input something: movie names... Mainly we just assume we have a function that can process the movie name in the parent component app.js, and we handle the input value as query in this step.

Then, in the parent component app.js, we specify the function that handle the process movie name. We first integrate the user input(movie name) into API (later we can use multiple input to scale) with private API key. And get the data using async fetch data. Same time, handle the data(if data is empty, handle it)

Right now, after the above two steps. we now have data: which is the movie that user requested or empty warming.

Then we need to display this data:
</br>MovieList
    </br>-->MovieCard
</br>
`<MovieList />` is like a for loop, loop each movie in the data, as well as handle the situation when data is empty using ?comparision.</br>
`<MovieCard />` is what actually each display of movies should look like
and in each we pass value into it using the data we get in the first two steps. 

> remember the `{}` when we pass value in the`<MovieList values={value}>`

## Step 7: add more functionality
- ADD to personalized watch list => a button on each MovieCard add it to the list.
- Remove from the list => a button to remove it from the list
- WacthList component => a personalized list that show saved movies
- handle reload => the list persists after reloads
  
>When we are dealing with Watchlist components, we may thinking can we reuse the `MovieCard` component. 
> However, as we are adding a button in the MovieCard, if we use this in the WatchList. each stored Movie will still have a add to my list button which is not optimal case.
> Also we are interested in add a remove button in this case for watchlist component
> If there is a technique that we can dynamic render what we want in this compnent so that we can reuse it in different situations

**We use `&&` in the MovieCard component to handle conditional rendering!**

Basic Skeleton in the new feature:
- in MovieCard, we try to reuse in different situation: one for MovieList that display what we search for and one for WatchList that what we try to store.

        {onAdd && <button.....>ADD</button>} 
        {onRemove && <button>...}

- In MovieList we only add one parameter `onAdd` to meet the requiremnt for dynamic rendering.
- in WatchList same we only add onRemove
  
In this case, so we can have differnt <MovieCard /> that accept diffent scenarios with onAdd and onRemove. what we need to rememver is to handle different case in MovieCard with `&&`

## Question until here:
**1. How `npm start` works**
   1. we are using a script defined in `package.json`
      1. it start a developement server using Webpack Dev Server
      2. it compiles React code
      3. it serves it from memory, not disk
      4. it auto refreshes if you save any file
   
**2. How to customize PORT to run on?**
   1. Temporarilt change port when run
        
            PORT=5000 npm start
   2. Set it permanetly in `.env` file
      1. create a file called .env in your project root (same level as package.json)
      2. ADD `PORT=5001`
      3. Save and restart your sever
   3. We also can cstomize browser too in `.env`
      1. `BROWSER=edge`

## Step 7: Add `.env` file
: it stands for environment file. it is a simple text file where you define environment variables - little pieces of data that your app can read at runtime without hardcoding them into your code

LIKE: API ; PORT ; different settings in development vs. production(???); hiding sensitive info from GITHUB ....

**NOTE**:

ALL variable names must start with `REACT_APP_` to be available in your code!

    process.env.REACT_APP_OMDB_KEY

ADD .env into `.gitignore`!!

After Changed be sure to resteart the server in terminal!

## Step 8: Set up `localStorage` => will upgrade to backend database later after React refresh
: it let the app remember things after the page is refreshed
- It is a built-in browser API that lets you store key-value pairs as trings, and it persists evenafter the page reloads or the browser restarts
  
in the app.js, we already have

    const [saveMovies, setSaveMovies] = useState([]);

we will now watch saveMovies with `useEffect` and save it to localStorage;

    import{useEffect} from 'react'

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(savedMovies));
    }, [savedMovies])

- Everytime, `savedMovies` changes, this runs
- it stores the whole list in localStorage under the key 'watchlist'
- we use `JSON.stringify` to turn the array into a string (because localStorage only accept storing strings)

> What does `useEffect` does?
>
>let you perform side efects in function components - like data fetching, DOM updates and logging or saving to localStorage
it runs after the component renders, and can be trigger again **if a dependency changes**

> what we means after i means "Do this after finishes rendering."

This part in our code tells that: "HEY everytime the dependency which is `[savedMovies]` changes, i need to run this function again which is the function saves your updated watchlist to localStorage."

Without dependency, it would run on every render, even if nothing changed.

## Continuation: Set a Clean UP Button for localStorage
- we can do by two way:
  - `.removeItem('...')`
  - `.clear()`

We here to add a button to remove the list.

    <button onClick={handleClearWatchList}>Clear WatchList</button>

    const handleClearWatchList = () => {
        setSavedMovies([]);
        localStorage.removeItem('watchlist');
    }

## Introduction to Tailwind(polish UI)

- first step: we need to install Tailwind in create react app
  
        npm install -D tailwindcss postcss autoprefixer
        npx tailwindcss init -p
- we need to import it first in the index.js
import 'bootstrap/dist/css/bootstrap.min.css';

lets dive into what does those command means:
- `-D`: this is a dev-only tool. Donot include this in production code.
- `tailwind`: this is framework itself, give u all the utility classes like bg-blue-500
- `postcss`: A CSS processor - transforms ur Tailwind classes into real CSS the browser understands
- `autoprefixer`: Adds browser-specific prefixes like -webkit- so your style works on all browsers
- `npx`: runs a command from a package without installing it globally
- tailwindcss init: generate something.js leys you custyomize your theme(font, color, breakpoitns)
- `-p`: so tailwind works with postcss automatically

**NOTE**: We will be using it once we switch into Vite

## Introduction to Bootstrap -> easier to set up in CRA

        npm install bootstrap react-bootstrap

Bootstrap is a front end css framework that give you pre-built styles and components like buttons, card, grid, modals, navbars - all using simple class names
- consistent design
- read to use components
- a powerful grid system for layout
`React-Bootstrap`: import components like `<button />` `<Card />` `...`

### layout system -> grid

`Container`: give your page a center-aligned layout
Bootstrap uses a 12-column grid system

        <Container>
            <Row>
                <Col md={4}>1/3</Col>
                <Col md={8}>2/3</Col>
            </Row>
        <Container>

`md={4}` means "on medium screens, take up 4 of 12 columns"

`m-2`: add margin (all sides)
`mt-3`: Adds top margin
`p-2`: add padding
`ms-2`: Add left margin(start)

### Next higher step:

`xs={12}`: means full width on mobile => adapt to mobile screen size.
`flex-column`: Stack my children vertically
`justify-content-between`: put space between the top and bottom child so that they go to the edge;
Even if the card height varies, the button will always stick to the bottom inside the card. And if we set the height the same, then the buttom will align horizontally.