import { useState, useEffect } from "react";
import YouTube from "react-youtube";

const YouTubePlayer = ({ videoId }) => {
  const [opts, setOpts] = useState({
    height: "400vh",
    width: "700vw",
    playerVars: {
      autoplay: 0,
    },
  });
  useEffect(() => {
    console.log(window.innerWidth);
    if (window.innerWidth >= 767) {
      setOpts({
        height: "400vh",
        width: "700vw",
        playerVars: {
          autoplay: 0,
        },
      });
    } else if (window.innerWidth < 767 && window.innerWidth > 530) {
      setOpts({
        height: "300vh",
        width: "500vw",
        playerVars: {
          autoplay: 0,
        },
      });
    } else if (window.innerWidth <= 530) {
      setOpts({
        height: "300vh",
        width: "350vw",
        playerVars: {
          autoplay: 0,
        },
      });
    }
  }, [window.innerWidth]);

  return <YouTube videoId={videoId} opts={opts} />;
};

export default YouTubePlayer;
