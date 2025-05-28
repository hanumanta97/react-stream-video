import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchVideos } from "./features/videos/videoSlice";
import VideoUploadForm from "./components/VideoUploadForm";
import VideoList from "./components/VideoList";
import VideoPlayerModal from "./components/VideoPlayerModal";

function App() {
  const dispatch = useDispatch();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  const openVideoModal = (id) => {
    setCurrentVideoId(id);
    setShowVideoModal(true);
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">🎬 Secure Video Uploader</h2>
      <VideoUploadForm />
      <h4 className="mt-5 mb-3">📁 Uploaded Videos</h4>
      <VideoList openVideoModal={openVideoModal} />
      <VideoPlayerModal show={showVideoModal} onHide={() => setShowVideoModal(false)} videoId={currentVideoId} />
    </Container>
  );
}

export default App;