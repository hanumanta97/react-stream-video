import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo, fetchVideos } from "../features/videos/videoSlice";
import { Form, Row, Col, Button, Spinner, Alert } from "react-bootstrap";

const VideoUploadForm = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const uploadStatus = useSelector((state) => state.videos.uploadStatus);
  const uploadError = useSelector((state) => state.videos.uploadError);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    await dispatch(uploadVideo(selectedFile));
    dispatch(fetchVideos());
  };

  return (
    <Form className="p-4 shadow-lg">
      {uploadError && <Alert variant="danger">{uploadError}</Alert>}
      <Row className="align-items-center">
        <Col md={8}>
          <Form.Control type="file" accept="video/*" onChange={handleFileChange} />
        </Col>
        <Col md={4} className="text-md-end mt-2 mt-md-0">
          <Button variant="primary" onClick={handleUpload} disabled={uploadStatus === "loading"}>
            {uploadStatus === "loading" ? <Spinner animation="border" size="sm" /> : "Upload Video"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default VideoUploadForm;