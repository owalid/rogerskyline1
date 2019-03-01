import React from 'react';

const VideoListItem = (props) => {
    const movie = props.movie;
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

        return(
            <li className="hover-img" onClick={handleOnClick} >
                <div className="col-md-10">
                <figure>
                    <img className="media-object img-rounded" height="300px" width="200px" src={`${IMG_BASE_URL}${movie.poster_path}`} alt={`${IMG_BASE_URL}${movie.poster_path}`}/>
                </figure>
                    <span>{movie.title}</span>
                </div>
            </li>
        )
        function handleOnClick(params) {
            props.callback(movie);
        }
}

export default VideoListItem;