import smtplib
from email.message import EmailMessage
import os

from dotenv import load_dotenv
load_dotenv(r"d:\Khiuswanth protfolio\server\.env")

email = os.environ.get("EMAIL_USER")
password = os.environ.get("EMAIL_PASS")
if password:
    password = password.replace(" ", "")

print(f"Trying to login to smtp.gmail.com with {email} and password length {len(password) if password else 0}")

try:
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.set_debuglevel(1)
        server.starttls()
        server.login(email, password)
        print("Login successful!")
        
        msg = EmailMessage()
        msg.set_content("Test email from portfolio")
        msg['Subject'] = 'Test Portfolio Contact'
        msg['From'] = f"Portfolio Contact <{email}>"
        msg['To'] = email
        
        server.send_message(msg)
        print("Test email sent!")
except Exception as e:
    print(f"SMTP Error: {e}")
