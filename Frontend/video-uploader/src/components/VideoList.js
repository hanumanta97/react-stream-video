import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";

const VideoList = ({ openVideoModal }) => {
  const { videos, status, error } = useSelector((state) => state.videos);

  if (status === "loading") return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;

  return (
    <Row>
      {videos.map((video) => (
        <Col md={4} sm={6} xs={12} key={video.id} className="mb-4">
          <Card className="h-100 shadow">
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title className="text-truncate">{video.filename}</Card.Title>
              <Button variant="outline-primary" onClick={() => openVideoModal(video.id)}>
                ▶️ Play Video
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default VideoList;
