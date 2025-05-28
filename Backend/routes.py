from fastapi import APIRouter, UploadFile, File
from fastapi.responses import StreamingResponse
import io

from database import SessionLocal
from models import Video
from encryption import encrypt_data, decrypt_data

router = APIRouter()

@router.post("/upload/")
async def upload_video(file: UploadFile = File(...)):
    contents = await file.read()
    encrypted_contents = encrypt_data(contents)
    db = SessionLocal()
    video = Video(filename=file.filename, content_type=file.content_type, video_data=encrypted_contents)
    db.add(video)
    db.commit()
    db.refresh(video)
    db.close()
    return {"filename": file.filename}

@router.get("/videos/")
def list_videos():
    db = SessionLocal()
    videos = db.query(Video).all()
    db.close()
    return [{"id": v.id, "filename": v.filename} for v in videos]

#    WITHOUT KAFKA 

# @router.get("/video/{video_id}")
# def get_video(video_id: int):
#     db = SessionLocal()
#     video = db.query(Video).filter(Video.id == video_id).first()
#     db.close()
#     if video is None:
#         return {"error": "Not found"}

#     decrypted_video = decrypt_data(video.video_data)
#     return StreamingResponse(io.BytesIO(decrypted_video), media_type=video.content_type)


from fastapi import Request, HTTPException
from fastapi.responses import StreamingResponse, Response
from starlette.status import HTTP_206_PARTIAL_CONTENT

@router.get("/video/{video_id}")
def get_video(video_id: int, request: Request):
    db = SessionLocal()
    video = db.query(Video).filter(Video.id == video_id).first()
    db.close()

    if not video:
        raise HTTPException(status_code=404, detail="Video not found")

    video_data = decrypt_data(video.video_data)
    file_size = len(video_data)
    content_range = request.headers.get('range')

    def iter_file(start: int, end: int):
        yield video_data[start:end]

    if content_range:
        # Handle range requests
        units, range_spec = content_range.split('=')
        start_str, end_str = range_spec.split('-')
        start = int(start_str)
        end = int(end_str) if end_str else min(start + 1024 * 1024, file_size - 1)
        end = min(end, file_size - 1)

        headers = {
            'Content-Range': f'bytes {start}-{end}/{file_size}',
            'Accept-Ranges': 'bytes',
            'Content-Length': str(end - start + 1),
            'Content-Type': video.content_type,
        }
        return StreamingResponse(iter_file(start, end + 1), headers=headers, status_code=HTTP_206_PARTIAL_CONTENT)

    # No range header, return full content
    headers = {
        'Content-Length': str(file_size),
        'Accept-Ranges': 'bytes',
        'Content-Type': video.content_type,
    }
    return StreamingResponse(iter_file(0, file_size), headers=headers)
