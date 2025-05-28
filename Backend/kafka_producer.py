from kafka import KafkaProducer
import time

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: v  # no serialization
)

def send_video_chunks(video_data: bytes, chunk_size=512 * 1024):
    for i in range(0, len(video_data), chunk_size):
        chunk = video_data[i:i + chunk_size]
        # print(f"Sending chunk {i//chunk_size}")
        producer.send('video-stream', chunk)
        time.sleep(0.1)  # Let browser buffer
    producer.flush()

