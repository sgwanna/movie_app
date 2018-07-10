import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';
import InfiniteScroll from 'react-infinite-scroll-component';

class Yifi extends Component {

  // Render cycle: componentWillMount() -> render() -> componentDidMount();
  // Update cycle: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  // 컴포넌트 안에 state가 변경될 때 마다 render 발생
  // state 변경 시 직접 변경 X, setState로 변경해야 함

  state = {
    movies: new Array(),
    page: 0,
    sortby: 'download_count',
    mode: 'sort',
    title: null
  }
  componentWillMount() {

  }
  componentDidMount() {
    this._getMovies('download_count', 1);
  }

  _getMovies = async (sortby, page) => {              // async 안쓰면 awaie 작동 안함
    const movies = await this._callApi(sortby, page)  // callApi가 완료될 때까지 기다린 후 movies에 넣는다
    this.setState({
      movies: movies!==undefined ? this.state.movies.concat(movies) : this.state.movies,    // movies : movies
      page: page,
      sortby: sortby
    })
    document.getElementById('TotalCountArea').style.display='none';
  }

  _getMoviesByTitle = async (title, page) => {              // async 안쓰면 awaie 작동 안함
    const movies_data = await this._callApiByTitle(title, page)  // callApi가 완료될 때까지 기다린 후 movies에 넣는다
    const movies = movies_data.movies;
    const movie_count = movies_data.movie_count;

    this.setState({
      movies: movies!==undefined ? this.state.movies.concat(movies) : this.state.movies,    // movies : movies
      page: page,
      title: title
    })
    document.getElementById('totalCount').innerHTML = movie_count;
    document.getElementById('TotalCountArea').style.display='block';
  }

  _callApi = (sortby ,page) => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by='+sortby+'&page='+page)
    .then(tomato => tomato.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }
  _callApiByTitle = (title ,page) => {
    return fetch('https://yts.am/api/v2/list_movies.json?query_term='+title+'&page='+page)
    .then(tomato => tomato.json())
    .then(json => json.data)
    .catch(err => console.log(err))
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie) => {
        if(movie !== undefined) {
            return <Movie key={movie.id}
                          title={movie.title}
                          poster={movie.medium_cover_image}
                          genres={movie.genres}
                          synopsis = {movie.synopsis}
                          torrents = {movie.torrents}
                  />
          } else {
            return null;
          }
    });

    return movies;
  }

  _renderBtn = () => {
    return (
        <div className="Header">
          <div className="Buttons">
            <button onClick={() => this._sort('rating')}>평점 순</button>
            <button onClick={() => this._sort('download_count')}>다운로드 순</button>
            <button onClick={() => this._sort('title')}>이름 순</button>
            <button onClick={() => this._sort('like_count')}>좋아요 순</button>
          </div>
          <div className="Search">
            <input type="text" id="keyword"/>
            <button onClick={() => this._searchData()}>Search</button>
          </div>
          <div id="TotalCountArea" className="hide">
            Total: <span id="totalCount"></span>
          </div>
        </div>
    )
  }

  _sort(sortby) {
    this.setState ({
      movies: new Array(),
      sortby: sortby,
      page: 1,
      mode: 'sort'
    })
    this._getMovies(sortby, 1);
  }

  _fetchMoreData = async () => {
    this.state.mode == 'sort' ?
      this._getMovies(this.state.sortby, this.state.page+1)
    : this._getMoviesByTitle(this.state.title, this.state.page+1)
  }

  _searchData = () => {
    let keyword = document.getElementById('keyword').value;

    this.setState({
      movies: new Array(),
      title: keyword,
      page: 1,
      mode: 'search'
    })

    this._getMoviesByTitle(keyword, 1);
  }

  render() {
    const {movies} = this.state;

    if(movies.length > 0) {
      return (
        <InfiniteScroll
            dataLength={movies.length}
            next={this._fetchMoreData}
            hasMore={true}
            loader={<h4 id="InfiniteScrollText" className="InfiniteScrollText">Loading...</h4>}
            endMessage={
              <p style={{textAlign: 'center'}}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
          <div className="App">
            {this._renderBtn()}
            {movies.length>0 ? this._renderMovies() : ''}
          </div>

        </InfiniteScroll>
      );
    } else {
      return (
        <div className="App--loading">
          {this._renderBtn()}
          <div className="NoData">No Data</div>
        </div>
      );
    }
  }
}



export default Yifi;
