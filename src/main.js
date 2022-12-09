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
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id','id'+ category.id);
        const categoryTitleText = document.createTextNode(category.name)
        

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer);

    });
}


