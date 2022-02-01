import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";

class App extends React.Component {

  state = {
    movies: [],

    searchState: ""
  };


  //https://www.themoviedb.org/u/AnilYuksel/lists Buradan liste olusturup gelistirilebilir. 
  //Gercek Apiden Uzerinden Calistik

  async componentDidMount(){
    const baseUrl = `https://api.themoviedb.org/3/list/8190580?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    const response = await fetch(baseUrl)
    console.log(response)
    const data = await response.json()
    console.log(data.items)
    this.setState({movies:data.items})

  }

  deleteMovie = async (movie) => {
    const baseUrl = `https://api.themoviedb.org/3/list/8190580/remove_item?media_id=${movie.id}&session_id=${process.env.REACT_APP_SESSION_ID}&api_key=${process.env.REACT_APP_API_KEY}`
    await fetch(baseUrl, {
      method:"POST"
    })
    const newMovieList = this.state.movies.filter(m => m.id !== movie.id)
    this.setState(() => ({
      movies: newMovieList
    }));
  }

  searchMovie = (event) => {
    this.setState({searchState:event.target.value})
  }

  render() {

    let searchedMovies = this.state.movies.filter((movie)=>{
      return movie.title.toLowerCase().indexOf(this.state.searchState.toLowerCase()) !== -1
    })

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <SearchBar searchMovieProp={this.searchMovie} />
            </div>
          </div>
          <MovieList
            movies={searchedMovies}
            deleteMovieProp={this.deleteMovie}
          />
        </div>
      </div>
    )
  }

}

export default App;
