import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';


class App extends Component {

  // Render cycle: componentWillMount() -> render() -> componentDidMount();
  // Update cycle: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  // 컴포넌트 안에 state가 변경될 때 마다 render 발생
  // state 변경 시 직접 변경 X, setState로 변경해야 함

  state = {}

  componentDidMount() {
    this._getMovies();
  }

  _getMovies = async () => {              // async 안쓰면 awaie 작동 안함
    const movies = await this._callApi()  // callApi가 완료될 때까지 기다린 후 movies에 넣는다
    this.setState({
      movies    // movies : movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(tomato => tomato.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie) => {
      return <Movie key={movie.id}
                    title={movie.title}
                    poster={movie.medium_cover_image}
                    genres={movie.genres}
                    synopsis = {movie.synopsis}
                    torrents = {movie.torrents}
            />
    });

    return movies;
  }

  render() {
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {this.state.movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
