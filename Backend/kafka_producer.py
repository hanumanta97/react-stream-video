from kafka import KafkaProducer

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    acks='all',
    linger_ms=10,
    batch_size=32 * 1024,
    value_serializer=lambda v: v
)

def send_video_chunks(video_data: bytes, chunk_size=512 * 1024):
    for i in range(0, len(video_data), chunk_size):
        chunk = video_data[i:i + chunk_size]
        producer.send('video-stream', chunk)
    producer.flush()
