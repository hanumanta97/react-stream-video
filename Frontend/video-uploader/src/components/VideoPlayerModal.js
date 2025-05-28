import React from "react";
import { Modal } from "react-bootstrap";

const VideoPlayerModal = ({ show, onHide, videoId }) => {
    console.log(`${process.env.REACT_APP_API_URL}/video/${videoId}`);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>🎥 Playing Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {videoId && (
          <video controls width="100%" autoPlay>
            <source src={`${process.env.REACT_APP_API_URL}/video/${videoId}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default VideoPlayerModal;