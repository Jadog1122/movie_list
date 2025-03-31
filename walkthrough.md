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