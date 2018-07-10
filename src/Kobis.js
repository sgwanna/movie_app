import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';
import InfiniteScroll from 'react-infinite-scroll-component';

class Kobis extends Component {

  // Render cycle: componentWillMount() -> render() -> componentDidMount();
  // Update cycle: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  // 컴포넌트 안에 state가 변경될 때 마다 render 발생
  // state 변경 시 직접 변경 X, setState로 변경해야 함

  state = {
    movies: new Array()
  }
  componentWillMount() {

  }
  componentDidMount() {
    this._getMovies();
  }

  _getMovies = async () => {              // async 안쓰면 awaie 작동 안함
    const movies = await this._callApi()  // callApi가 완료될 때까지 기다린 후 movies에 넣는다
    console.log(movies);
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=c18b65e7c11260713da5250227e93fa2&targetDt=20180709')
    .then(tomato => tomato.json())
    .then(json => json.boxOfficeResult.dailyBoxOfficeList)
    .catch(err => console.log(err))
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie) => {
        if(movie !== undefined) {
            return (
              <div>
                {movie.rank} : {movie.movieNm}
              </div>
            )
          } else {
            return null;
          }
    });

    return movies;
  }

  render() {
    const {movies} = this.state;
    return (
      <div className="App">
        {this._renderMovies()}
      </div>
    );
  }
}

export default Kobis;
