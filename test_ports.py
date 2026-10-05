import smtplib
import socket

def check_port(host, port):
    try:
        with socket.create_connection((host, port), timeout=5):
            print(f"Port {port} is open")
            return True
    except Exception as e:
        print(f"Port {port} is closed/blocked: {e}")
        return False

check_port('smtp.gmail.com', 587)
check_port('smtp.gmail.com', 465)
