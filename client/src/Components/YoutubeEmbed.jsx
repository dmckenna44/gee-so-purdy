import React from "react";

const YouTubeEmbed = ({videoId, width, height}) => {


  return (
    <div className="video-embed">
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}?rel=0&iv_load_policy=3`}
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded video"
      />
    </div>
  )
}

export default YouTubeEmbed;