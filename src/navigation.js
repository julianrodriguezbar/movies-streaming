searchFormBtn.addEventListener ('click', () => {
   
    location.hash ='#search='+searchFormInput.value;

})
trendingBtn.addEventListener ('click', () => location.hash ='#trends=')
arrowBtn.addEventListener ('click', () => {
    history.back();
    location.hash ='#home=';
})

window.addEventListener('DOMContentLoaded',navigator,false);
window.addEventListener('hashchange',navigator,false);




function navigator(){
    if (location.hash.startsWith('#trends')){
        trendsPage();
    } else if (location.hash.startsWith('#search=')){
        searchPage();
    }
    else if (location.hash.startsWith('#movie=')){
        detailsPage();
    }
    else if (location.hash.startsWith('#category=')){
        categoriesPage();
    } else {
        homePage();
    }

    location.hash
} 

function homePage(){
    console.log('HOME');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('header-arrow--white');
    arrowBtn.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');
    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    getTrendingMoviesPreview();
    getCategories();
    searchFormInput.value='';
}

function categoriesPage(){
    console.log('CATEGORY');
    window.scrollTo(0, 0);
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('header-arrow--white');
    arrowBtn.classList.remove('inactive');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    const [_, categoryData ] = location.hash.split('=');
    const [categoryId,categoryName] = categoryData.split('-');
    headerCategoryTitle.innerText=categoryName
    getMoviesByCategory(categoryId);
}

function detailsPage(){
    console.log('MOVIE')
    headerSection.classList.add('header-container--long');
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);
}

function searchPage(){
    console.log('SEARCH')
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('header-arrow--white');
    arrowBtn.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    const [_, query ] = location.hash.split('=');
    getMoviesBySearch(query);
}

function trendsPage(){
    console.log('TRENDS')
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('header-arrow--white');
    arrowBtn.classList.remove('inactive');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    headerCategoryTitle.innerHTML='Tendencias'
    getAllTrendingMovies();
}

