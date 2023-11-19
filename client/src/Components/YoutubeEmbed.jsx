import React from "react";

const YouTubeEmbed = ({videoId, width, height}) => {


  return (
    <div className="video-embed">
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded video"
      />
    </div>
  )
}

export default YouTubeEmbed;