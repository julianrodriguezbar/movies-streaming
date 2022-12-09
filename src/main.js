const API_TRENDING=`https://api.themoviedb.org/3/trending/all/day?api_key=`
const API_CATEGORIES='https://api.themoviedb.org/3/genre/movie/list?api_key='
const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8'
    },
    params:{
        'api_key': API_KEY
    }
});
async function getTrendingMoviesPreview(){
    const {data} = await api ('trending/all/day');
    

    const movies = data.results;
    
    trendingMoviesPreviewList.innerHTML=''
    movies.forEach(movie => {

        
        const movieContainer= document.createElement ('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener ('click',()=> {
            location.hash='#movie='+ movie.id
        })
        const movieImg = document.createElement ('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt',movie.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300/'+movie.poster_path);

        movieContainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(movieContainer);

    });
}

async function getCategories(){
    const rest = await fetch (API_CATEGORIES + API_KEY);
    const data= await rest.json();

    const categories = data.genres;
    console.log(categories);

    categoriesPreviewList.innerHTML=''
    categories.forEach(category => {

        
        const categoryContainer= document.createElement ('div');
        categoryContainer.classList.add('category-container');
        const categoryTitle = document.createElement ('h3');
        categoryTitle.addEventListener('click',() => {
            location.hash='#category=' + category.id + '-' + category.name;
        })
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id','id'+ category.id);
        const categoryTitleText = document.createTextNode(category.name)
        

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer);

    });
}


async function getMoviesByCategory(id){
    const {data} = await api ('discover/movie?with_genres=',{
        params: {
            with_genres: id,
        }
    });
    

    const movies = data.results;
    
    genericSection.innerHTML=''
    movies.forEach(movie => {

        
        const movieContainer= document.createElement ('div');
        movieContainer.classList.add('movie-container');
        const movieImg = document.createElement ('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt',movie.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300/'+movie.poster_path);

        movieContainer.appendChild(movieImg);
        genericSection.appendChild(movieContainer);

    });
}

async function getMoviesBySearch(query){
    const {data} = await api ('search/movie',{
        params: {
            query,
        }
    });
    

    const movies = data.results;
    
    genericSection.innerHTML=''
    movies.forEach(movie => {

        
        const movieContainer= document.createElement ('div');
        movieContainer.classList.add('movie-container');
        const movieImg = document.createElement ('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt',movie.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300/'+movie.poster_path);

        movieContainer.appendChild(movieImg);
        genericSection.appendChild(movieContainer);
        searchFormInput.value = query

    });
}

async function getAllTrendingMovies(){
    const {data} = await api ('trending/movie/day');
    

    const movies = data.results;
    
    
    genericSection.innerHTML=''
    movies.forEach(movie => {

        
        const movieContainer= document.createElement ('div');
        movieContainer.classList.add('movie-container');
        const movieImg = document.createElement ('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt',movie.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300/'+movie.poster_path);

        movieContainer.appendChild(movieImg);
        genericSection.appendChild(movieContainer);
        

    });
}

async function getMovieById(id){
    const {data: movie} = await api ('movie/'+id);
    movieDetailTitle.textContent= movie.title;
    movieDetailDescription.textContent= movie.overview;
    movieDetailScore.textContent= movie.vote_average;
    movieDetailCategoriesList.innerHTML=''
    const movieGenres = movie.genres
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/'+ movie.poster_path;
    
    headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),url(${movieImgUrl})`
    movieGenres.forEach(category => {
     
        
        const categoryContainer= document.createElement ('div');
        categoryContainer.classList.add('category-container');
        const categoryTitle = document.createElement ('h3');
        categoryTitle.addEventListener('click',() => {
            location.hash='#category=' + category.id + '-' + category.name;
        })
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id','id'+ category.id);
        const categoryTitleText = document.createTextNode(category.name)
        

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        movieDetailCategoriesList.appendChild(categoryContainer);

    });

    getRelatedMoviesById (id);
}

async function getRelatedMoviesById (id){
    const {data} = await api ('movie/'+id + '/similar');
    const movies= data.results
    relatedMoviesContainer.innerHTML=''
   movies.forEach(movie => {
   
    const movieContainer= document.createElement ('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener ('click',()=> {
            location.hash='#movie='+ movie.id
        })
        const movieImg = document.createElement ('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt',movie.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300/'+movie.poster_path);

        movieContainer.appendChild(movieImg);
        relatedMoviesContainer.appendChild(movieContainer);
    });
}

