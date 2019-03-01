import React from 'react';
import VideoListItem from '../component/video_list_item';

const VideoList = (props) => {
    const movieList = props.movieList;
        return(
            <div className="col-md-12">
                <ul>
                    {
                        movieList.map(movie =>{
                            return <VideoListItem key={movie.id} movie={movie} callback={receiveCallBack}/>
                        })
                    }
                </ul>
            </div>
        ); 

        function receiveCallBack(movie) {
            props.callback(movie)
        }
    }


export default VideoList;