import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleCheck,
  faHeart,
  faCommentDots,
  faBookmark,
  faShare,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import "./FooterRight.css";

function FooterRight({
  likes,
  comments,
  saves,
  shares,
  profilePic,
  videoRef,
  videoUrl,
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [muted, setMuted] = useState(videoRef?.current?.muted || true); // Default to muted
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);
  const [sharePopupVisible, setSharePopupVisible] = useState(false);

  const handleShareClick = () => {
    setSharePopupVisible((prevVisible) => !prevVisible);
  };

  const handleCloseSharePopup = () => {
    setSharePopupVisible(false);
  };

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(null);
    }, 3000); // Change the delay time (in milliseconds) as needed
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleMuteToggle = () => {
    if (videoRef && videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const handleSaveClick = () => {
    setSaved((prevSaved) => !prevSaved);
    if (!saved && videoUrl) {
      navigator.clipboard
        .writeText(videoUrl)
        .then(() => {
          console.log("Video URL copied to clipboard:", videoUrl);
        })
        .catch((err) => {
          console.error("Failed to copy video URL:", err);
        });
    }
  };

  const parseLikesCount = (count) => {
    if (typeof count === "string") {
      if (count.endsWith("k")) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  const formatLikesCount = (count) => {
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count;
  };

  return (
    <div className="footer-right">
      <div className="sidebar-icon">
        {profilePic ? (
          <img
            src={profilePic}
            className="userprofile"
            alt="Profile"
            style={{ width: "45px", height: "45px", color: "#616161" }}
          />
        ) : null}
        <FontAwesomeIcon
          icon={userAddIcon}
          className="useradd"
          style={{ width: "15px", height: "15px", color: "#FF0000" }}
          onClick={handleUserAddClick}
        />
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faHeart}
          style={{
            width: "35px",
            height: "35px",
            color: liked ? "#FF0000" : "white",
          }}
          onClick={handleLikeClick}
        />
        <p>{formatLikesCount(parseLikesCount(likes)) + (liked ? 1 : 0)}</p>
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ width: "35px", height: "35px", color: "white" }}
        />
        <p>{comments}</p>
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faBookmark}
          style={{
            width: "35px",
            height: "35px",
            color: saved ? "#ffc107" : "white",
          }}
          onClick={handleSaveClick}
        />
        <p>{saved ? saves + 1 : saves}</p>
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faShare}
          style={{ width: "35px", height: "35px", color: "white" }}
          onClick={handleShareClick}
        />
        <p>{shares}</p>
      </div>  
      

      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={muted ? faVolumeMute : faVolumeUp}
          style={{ width: "35px", height: "35px", color: "white" }}
          onClick={handleMuteToggle}
        />
        <p>{muted ? "Muted" : "Unmuted"}</p>
      </div>

      <div className="sidebar-icon record">
        <img
          src="https://static.thenounproject.com/png/934821-200.png"
          alt="Record Icon"
        />
      </div>
      
      {sharePopupVisible && (  
        <div className="share-popup-overlay">
          <div className="share-popup">
            <button
              className="close-button"
              onClick={handleCloseSharePopup}
            >
            x
            </button>
            <h3>Share this video</h3>
          <div className="share-options">
            <button>Facebook</button>
            <button>Instagram</button>
            <button>Thread</button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FooterRight;
