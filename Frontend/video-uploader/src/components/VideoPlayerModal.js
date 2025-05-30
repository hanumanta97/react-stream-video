import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const VideoPlayerModal = ({ show, onHide, videoId }) => {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const fetchAndCacheVideo = async () => {
      if (!videoId) return;

      const cache = await caches.open("video-cache");
      const cachedResponse = await cache.match(`/video/${videoId}`);

      if (cachedResponse) {
        console.log("✅ Loaded from cache");
        const blob = await cachedResponse.blob();
        setVideoUrl(URL.createObjectURL(blob));
      } else {
        console.log("⬇️ Fetching and caching video");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/video/${videoId}`);
        const cloned = response.clone();
        cache.put(`/video/${videoId}`, cloned);
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      }
    };

    fetchAndCacheVideo();
  }, [videoId]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>🎥 Playing Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {videoUrl && (
          <video controls width="100%" autoPlay>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default VideoPlayerModal;
