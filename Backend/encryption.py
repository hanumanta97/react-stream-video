from cryptography.fernet import Fernet

# ⚠️ Replace with secure key management for production
ENCRYPTION_KEY = b"vNdE1lmXTU1A8k8yolOxlFPD8CnIQn7N4H4InjZETUo="
fernet = Fernet(ENCRYPTION_KEY)

def encrypt_data(data: bytes) -> bytes:
    return fernet.encrypt(data)

def decrypt_data(data: bytes) -> bytes:
    return fernet.decrypt(data)
