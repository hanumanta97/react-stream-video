from kafka import KafkaConsumer


def stream_video_from_kafka():
    consumer = KafkaConsumer(
        'video-stream',
        bootstrap_servers='localhost:9092',
        auto_offset_reset='earliest',
        enable_auto_commit=True,
        group_id='video-stream-consumer'
    )
    print("Streaming from Kafka...")
    try:
        for msg in consumer:
            # print(f"Sending chunk to client ({len(msg.value)} bytes)")
            yield msg.value
    finally:
        consumer.close()

