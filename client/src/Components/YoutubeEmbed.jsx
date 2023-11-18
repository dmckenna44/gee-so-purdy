import React from "react";

const YouTubeEmbed = ({embedId}) => {


  return (
    <div className="video-embed">
      <iframe
        width="400"
        height="400" 
        src={embedId} 
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded video"
      />
    </div>
  )
}

export default YouTubeEmbed;