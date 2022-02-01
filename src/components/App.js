import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";

class App extends React.Component {

  state = {
    movies: [],

    searchState: ""
  };

  async componentDidMount(){
    const baseUrl = "http://localhost:3002/movies"
    const response = await fetch(baseUrl)
    console.log(response)
    const data = await response.json()
    console.log(data)
    this.setState({movies:data})

  }

  

  deleteMovie = async (movie) => {
    const baseUrl = `http://localhost:3002/movies/${movie.id}`
    await fetch(baseUrl, {
      method:"DELETE"
    })
    const newMovieList = this.state.movies.filter(m => m.id !== movie.id)
    // this.setState({
    //   movies: newMovieList
    // }) //Bu yontem onceki array bos ise kullanilir ama bizim ilk movies arrayimiz bos degil
    this.setState(() => ({
      movies: newMovieList
    }));
  }

  searchMovie = (event) => {
    this.setState({searchState:event.target.value})
  }

  render() {

    let searchedMovies = this.state.movies.filter((movie)=>{
      return movie.name.toLowerCase().indexOf(this.state.searchState.toLowerCase()) !== -1
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
