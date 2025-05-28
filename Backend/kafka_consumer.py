from kafka import KafkaConsumer

def kafka_video_generator():
    consumer = KafkaConsumer(
        'video-stream',
        bootstrap_servers='localhost:9092',
        auto_offset_reset='earliest',
        enable_auto_commit=True,
        group_id='video-stream-consumer'
    )
    try:
        for message in consumer:
            yield message.value
    finally:
        consumer.close()
