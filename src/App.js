import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";
import video1 from "./videos/video1.mp4";
import video2 from "./videos/video2.mp4";
import video3 from "./videos/video3.mp4";
import video4 from "./videos/video4.mp4";
import { use } from "react";

// This array holds information about different videos
const videoUrls = [
  {
    url: video1,
    profilePic: "https://i.pravatar.cc/100?img=5",
    username: "csjackie",
    description: "Lol nvm #compsci #chatgpt #ai #openai #techtok",
    song: "Original sound - Famed Flames",
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: video2,
    profilePic: "https://i.pravatar.cc/100?img=1",
    username: "dailydotdev",
    description:
      "Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes",
    song: "tarawarolin wants you to know this isnt my sound - Chaplain J Rob",
    likes: "13.4K",
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: video3,
    profilePic: "https://i.pravatar.cc/100?img=3",
    username: "wojciechtrefon",
    description:
      "#programming #softwareengineer #vscode #programmerhumor #programmingmemes",
    song: "help so many people are using my sound - Ezra",
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: video4,
    profilePic: "https://i.pravatar.cc/100?img=2",
    username: "faruktutkus",
    description:
      "Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ",
    song: "orijinal ses - Computer Science",
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];
function App() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const dragStartY = useRef(null);
  const isDragging = useRef(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.play();
        } else {
          const videoElement = entry.target;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    return () => {
      observer.disconnect();
    };
  }, [videos]);

  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  const handleMouseDown = (event) => {
    dragStartY.current = event.clientY;
    isDragging.current = true;
  };

  const handleMouseMove = (event) => {
    if (!isDragging.current || dragStartY.current === null) return;

    const dragDistance = event.clientY - dragStartY.current;

    if (dragDistance > 50 && currentVideoIndex > 0) {
      // Dragged down, go to the previous video
      setCurrentVideoIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      isDragging.current = false; // Reset dragging state
    } else if (dragDistance < -50 && currentVideoIndex < videos.length - 1) {
      // Dragged up, go to the next video
      setCurrentVideoIndex((prevIndex) => Math.min(prevIndex + 1, videos.length - 1));
      isDragging.current = false; // Reset dragging state
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false; // Reset dragging state
    dragStartY.current = null;
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      setShowDetails(true);
    } else if (event.key === "Escape") {
      setShowDetails(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (videoRefs.current[currentVideoIndex]) {
      videoRefs.current[currentVideoIndex].scrollIntoView({ behavior: "smooth" });
    }
  }, [currentVideoIndex]);

  return (
    <div
      className="app"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Reset dragging if mouse leaves window
    >
      <div className="container">
        <TopNavbar className="top-navbar" />
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            saves={video.saves}
            comments={video.comments}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)}
            autoplay={index === currentVideoIndex}
          />
        ))}
        <BottomNavbar className="bottom-navbar" />
      </div>
      {showDetails && (
        <div className="user-details-overlay">
          <div className="details-content">
            <img src={videos[currentVideoIndex].profilePic} alt="Profile" />
            <h2>@{videos[currentVideoIndex].username}</h2>
            <p>{videos[currentVideoIndex].description}</p>
            <p>{videos[currentVideoIndex].song}</p>
            <button onClick={() => setShowDetails(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;