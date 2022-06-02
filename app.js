let movies = [
    {
        watched : false, 
        name: "Inception", 
        year : 2010, 
        country : "USA" , 
        description : "A thief who steals corporate secrets through the use of dream-sharing technology",
        actors : ["Leonardo DiCaprio","Joseph Gordon-Levitt","Elliot Page"]
    },
    {
        watched : false,
        name : "Avatar",
        year : 2009,
        country : "USA",
        description : "A paraplegic Marine dispatched to the moon Pandora on a unique mission.",
        actors : ["Sam Worthington","Zoe Saldana","Stephen Lang"]
    },
    {
        watched : false,
        name : "The Terminator",
        year : 1984,
        country : "USA",
        description : "A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg.",
        actors : ["Arnold Schwarzenegger","Linda Hamilton","Michael Biehn"]
    }]

function updateMoviesTable() {
    document.getElementById('movie-table').innerHTML= "";    
    movies.forEach(function(movie,index){
        let checkBoxWatched = movie.watched ? "checked" : "";
        let tableRowBgColor = movie.watched ? "bg-success" : "bg-danger";
        let watchedColumn = movie.watched ? "Da" : "Ne";
        document.getElementById('movie-table').innerHTML +=`
            <tr class="${tableRowBgColor} text-center">
                <td class="px-4"><input id="checkbox-${index}" class="form-check-input" type="checkbox" onclick="checkboxChangeWatchedStatus(this)" ${checkBoxWatched}></td>
                <td>${watchedColumn}</td>
                <td>${movie.name}</td>
                <td>${movie.year}</td>
                <td>${movie.country}</td>
                <td>${movie.description}</td>
                <td><ul class = "text-start" id = "ActorsList${index}"></ul></td>
            </tr>`;
        movie.actors.forEach(function(actor){
            document.getElementById(`ActorsList${index}`).innerHTML +=`
            <li>${actor}</li>`
        })
    })
}


function checkboxChangeWatchedStatus(event) {
    let objectIndex = event.id.split("-")[1];
    movies[objectIndex].watched = !movies[objectIndex].watched;
    updateMoviesTable();
}


function addMovieToMoviesArray(){
    let newMovie = {
        actors : []
    };

    newMovie.watched = false;
    newMovie.name = document.getElementById('name').value.trim();
    newMovie.year = document.getElementById('year').value;
    newMovie.country = document.getElementById('country').value.trim();
    newMovie.description = document.getElementById('description').value.trim();
    let tempActorsVar = document.getElementById('actors').value.split(",");
    tempActorsVar.forEach(function(actor){
        actor = actor.trim();
        if (actor != ""){
            newMovie.actors.push(actor);
        }
    })
    if (newMovie.name == "" ){
        document.getElementById('submitFeedback').innerHTML = `<p class="col-12 text-center text-danger"><b>Unestite ime filma</b></p>`;
        return;
    }
    if (newMovie.year < 1930 || newMovie.year > 2021 ){
        document.getElementById('submitFeedback').innerHTML = `<p class="col-12 text-center text-danger"><b>Godina filma mora biti unesena i iznositi izmedju 1930. i 2021.</b></p>`;
        return;
    }
    if (newMovie.actors.length == 0){
        document.getElementById('submitFeedback').innerHTML = `<p class="col-12 text-center text-danger"><b>Morate uneti bar jednog glumca/glumicu</b></p>`;
        return;
    }
    movies.push(newMovie);
    updateMoviesTable();
    document.getElementById('submitFeedback').innerHTML = `<p class="col-12 text-center text-success"><b>Film uspesno dodat!</b></p>`;
    document.getElementById('modalForm').reset();
    setTimeout(function(){
        document.getElementById('submitFeedback').innerHTML = "";
    }, 3000)
}

updateMoviesTable();