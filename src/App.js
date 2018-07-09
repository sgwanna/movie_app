import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';
import InfiniteScroll from 'react-infinite-scroll-component';

class App extends Component {

  // Render cycle: componentWillMount() -> render() -> componentDidMount();
  // Update cycle: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  // 컴포넌트 안에 state가 변경될 때 마다 render 발생
  // state 변경 시 직접 변경 X, setState로 변경해야 함

  state = {
    movies: new Array(),
    page: 0,
    sortby: 'download_count'
  }

  componentDidMount() {
    this._getMovies('download_count', 1);
  }

  _getMovies = async (sortby, page) => {              // async 안쓰면 awaie 작동 안함
    const movies = await this._callApi(sortby, page)  // callApi가 완료될 때까지 기다린 후 movies에 넣는다
    this.setState({
      movies: this.state.movies.concat(movies),    // movies : movies
      page: page,
      sortby: sortby
    })
  }

  _callApi = (sortby ,page) => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by='+sortby+'&page='+page)
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

  _renderBtn = () => {
    return (
        <div className="Buttons">
          <button onClick={() => this._sort('rating')}>평점 순</button>
          <button onClick={() => this._sort('download_count')}>다운로드 순</button>
          <button onClick={() => this._sort('title')}>이름 순</button>
          <button onClick={() => this._sort('like_count')}>좋아요 순</button>
        </div>
    )
  }

  _sort(sortby) {
    this.setState ({
      movies: new Array(),
      sortby: sortby,
      page: 1
    })
    this._getMovies(sortby, 1);
  }

  _fetchMoreData = () => {
   console.log("more data!");
   this._getMovies(this.state.sortby, this.state.page+1);
  };

  render() {
    const {movies} = this.state;
    return (
      <InfiniteScroll
          dataLength={movies.length}
          next={this._fetchMoreData}
          hasMore={true}
          loader={<h4 className="InfiniteScrollText">Loading...</h4>}
        >
        <div className={movies.length>0 ? "App" : "App--loading"}>
          {movies.length>0 ? this._renderBtn() : ''}
          {movies.length>0 ? this._renderMovies() : ''}
        </div>

      </InfiniteScroll>
    );
  }
}



export default App;
