const searchButton = document.querySelector('.search-btn');
searchButton.addEventListener('click', async function(){
    const inputKey = document.querySelector('.mov-key');
    const movies = await getMovie(inputKey.value);
    updateUI(movies);
});

//event binding
document.addEventListener('click', async function(e){
    if(e.target.classList.contains('modal-click')){ //ini cara bacanya jika e target nama classnya mengandung kata modalclick
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid);
        updateUIDetail(movieDetail);
    }
});


function getMovie(keyword){
    return fetch('http://www.omdbapi.com/?apikey=b6278314&s='+keyword)
            .then(response => response.json())
            .then(response => response.Search);
}

function updateUI(movies){
    let cards = '';
    movies.forEach(m => cards += showMov(m));
    const movContainer = document.querySelector('.movie-container');
    movContainer.innerHTML = cards;
}

function getMovieDetail(imdbid){
    return fetch('http://www.omdbapi.com/?apikey=b6278314&i=' + imdbid)
            .then(response => response.json())
            .then(m => m)
}

function updateUIDetail(m){
    const movieDetail = showDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}


function showMov(m){
    return `<div class="col-md-4 my-3">
                <div class="card" style="width: 18rem;">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-click" data-toggle="modal" data-target="#movDetailsModal" data-imdbid="${m.imdbID}">Show Detail</a>
                    </div>
                </div>
            </div>`;
}

function showDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                            <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong><br>${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}