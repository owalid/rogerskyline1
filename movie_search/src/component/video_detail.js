import React from 'react';

const VideoDetail = ({title , description}) => {
    
    return(
        <div>
            <h1 className="font-40">{title}</h1>
            <p className="font-20">{description}</p>
        </div>
    )
}

export default VideoDetail;