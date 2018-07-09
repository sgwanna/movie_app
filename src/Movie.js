import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import './Movie.css';
/*
class Movie extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
  }

  render() {
//    console.log(this.props);
    return (
      <div>
        <MoviePoster poster={this.props.poster}/>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}
*/
function Movie({title, poster, genres, synopsis, torrents}) {
  return (
    <div className="Movie">
      <div className="Movie_Columns">
        <MoviePoster poster={poster} alt={title}/>
      </div>
      <div className="Movie_Columns">
          <h1>{title}</h1>
          <div className="Movie_Genres">
            {genres.map((genre,index) => <MovieGenre genre={genre} key={index}/>)}
          </div>
          <div className="Movie_Synopsis">
            <LinesEllipsis
              text={synopsis}
              maxLine='4'
              ellipsis=' ...'
              trimRight
              basedOn='letters'
            />
          </div>
          <div className="Movie_Torrents">
            {torrents.map((torrent,index) => <MovieTorrent torrent={torrent} index={index+1} key={index}/>)}
          </div>
      </div>
    </div>
  )
}

function MovieTorrent({torrent, index}) {
  return (
    <div className="Movie_Torrent">
      <span className="Torrent_Index">
          <a href={torrent.url}>Torrent #{index}</a>
      </span>
    </div>
  )
}

function MovieGenre({genre}){
  return (
    <span className="Movie_Genre">{genre} </span>
  )
}


/*
class MoviePoster extends Component {
  static propTypes = {
    poster: PropTypes.string.isRequired
  }

  render() {
    return(
      <img src={this.props.poster}/>
    );
  }
}
*/
// stateless functional component
function MoviePoster({poster, alt}) {
  return(
    <img src={poster} alt={alt} title={alt} className="Movie_Poster"/>
  );
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  synopsis: PropTypes.string.isRequired
}
MovieGenre.propTypes = {
  genre: PropTypes.string.isRequired
}
MoviePoster.propsTypes = {
  poster: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}

export default Movie;
