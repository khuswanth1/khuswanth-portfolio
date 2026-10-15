# Portfolio Contact API — Backend Service

A lightweight, stateless Python & Django API service powering the contact form and uptime health monitoring for [Khuswanth Rao Jadav's Portfolio](https://khuswanthportfolio.vercel.app).

---

## 🚀 Overview & Key Features

- **Stateless & Database-Free**: No database or session storage required. Fast cold starts and minimal resource footprint.
- **Dual Email Delivery**:
  - **Primary**: SMTP (configured by default for Gmail via App Passwords on port 587 / 465).
  - **Failover / Fallback**: Automatic delivery failover to [Resend API](https://resend.com) if SMTP fails or hits quota.
- **Instant Webhook Notifications**: Asynchronous background thread pool dispatching formatted alerts to Discord or Slack channels upon message receipt.
- **Abuse & Bot Prevention**:
  - Fixed-window rate limiting per IP address and global daily submission caps (using Django's cache backend: in-memory `LocMemCache` or shared `Redis`).
  - Strict input sanitization and email header injection protection via `SingleLineField` control-character stripping.
  - Reverse proxy-aware client IP extraction (`TRUSTED_PROXY_COUNT`).
  - Email spoofing prevention (`From` is always verified owner; visitor is placed in `Reply-To`).
- **Production-Ready WSGI**:
  - Built-in support for **Waitress** on Windows.
  - Built-in support for **Gunicorn** on Linux / container deployments.
- **CORS Configured**: Restricts incoming requests to authorized frontend origins.

---

## 📁 Directory Structure

```text
server/
├── contact/                      # Contact application
│   ├── management/commands/     # Custom commands (e.g., runserver with PORT from .env)
│   ├── forms.py                  # Form validation & header injection sanitization
│   ├── ratelimit.py              # In-memory / Redis cache rate limiter & IP extraction
│   ├── services.py               # Email delivery (SMTP + Resend) and webhooks (Discord/Slack)
│   ├── tests.py                  # Automated test suite
│   ├── urls.py / views.py        # API views and response handlers
│   └── apps.py
├── portfolio_api/                # Django project configuration
│   ├── settings.py               # Environment-driven settings (.env)
│   ├── urls.py                   # Root URL routing & custom error handlers
│   └── wsgi.py                   # WSGI entry point (Gunicorn/Waitress)
├── manage.py                     # Django management script
├── requirements.txt              # Production and development dependencies
├── test_smtp.py                  # Diagnostic script to test SMTP authentication
├── test_ports.py                 # Diagnostic script to test connectivity to mail ports
├── .env.example                  # Template for environment variables
└── README.md                     # Documentation
```

---

## 🛠️ Tech Stack & Requirements

- **Python**: 3.10+
- **Django**: 5.2+
- **django-cors-headers**: 4.4+
- **python-dotenv**: 1.0+
- **Production Servers**:
  - `gunicorn` (Linux/macOS)
  - `waitress` (Windows)

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` in the `server/` root:

```bash
cp .env.example .env
```

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `5000` | Port for the server to listen on. |
| `NODE_ENV` / `APP_ENV` | No | `development` | Set to `production` in production (enforces `DEBUG=False`). |
| `DJANGO_DEBUG` | No | `True` in dev | Overrides debug mode (`True`/`False`). |
| `DJANGO_SECRET_KEY` | Production | Auto-generated in dev | Secret key for Django cryptographic signing. |
| `ALLOWED_HOSTS` | Production | `localhost, 127.0.0.1` | Comma-separated list of allowed host/domain names. |
| `ALLOWED_ORIGIN` | No | `http://localhost:3000` | Comma-separated allowed CORS origins (frontend URLs). |
| `TRUSTED_PROXY_COUNT`| No | `1` in prod / `0` in dev | Number of reverse proxies (e.g. Render, Railway, Nginx = 1). |
| `EMAIL_HOST` | No | `smtp.gmail.com` | SMTP host server. |
| `EMAIL_PORT` | No | `587` | SMTP port (`587` for STARTTLS, `465` for SSL). |
| `EMAIL_SECURE` | No | `false` | `true` for port 465 (SSL), `false` for port 587 (TLS). |
| `EMAIL_USER` | Yes (for SMTP) | — | Gmail / SMTP email username. |
| `EMAIL_PASS` | Yes (for SMTP) | — | 16-character Gmail App Password (no spaces). |
| `EMAIL_TO` | No | `EMAIL_USER` | Target recipient email address. |
| `EMAIL_FROM` | No | `EMAIL_USER` | Sender address shown in email envelope. |
| `RESEND_API_KEY` | Optional | — | Resend API key for automatic failover. |
| `RESEND_FROM` | Optional | — | Sender identity configured in Resend (e.g. `Portfolio <contact@yourdomain.com>`). |
| `WEBHOOK_URL` | Optional | — | HTTPS webhook URL (Discord, Slack, or custom endpoint). |
| `CONTACT_RATE_LIMIT` | Optional | `0` (disabled) | Max contact form submissions per IP per window. |
| `CONTACT_DAILY_LIMIT`| Optional | `0` (disabled) | Max global submissions per day across all visitors. |
| `CONTACT_RATE_WINDOW_SECONDS` | Optional | `900` (15m) | Rate limiting fixed-window in seconds. |
| `REDIS_URL` | Optional | — | Redis connection URL for shared multi-worker cache. |

> [!TIP]
> **Gmail Setup**: Generate an App Password under **Google Account → Security → 2-Step Verification → App passwords**. Set `EMAIL_SECURE=false` and `EMAIL_PORT=587`.

---

## 💻 Local Development Setup

### 1. Create and Activate Virtual Environment

**Windows (PowerShell):**
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

**Linux / macOS:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create `.env` using `.env.example` as a template and provide your email credentials or leave blank to test with terminal output:
- When `EMAIL_PASS` is not set in development, Django will automatically use the **Console Email Backend** (`django.core.mail.backends.console.EmailBackend`) and print emails directly to your terminal.

### 4. Start the Server

```bash
python manage.py runserver
```
The server will start on port `5000` (or the port defined by `PORT` in `.env`):
`http://127.0.0.1:5000/`

---

## 📡 API Endpoints

### 1. Root Information
- **URL**: `GET /`
- **Response**: `200 OK`
```json
{
  "name": "Khuswanth Rao Jadav — Portfolio API",
  "endpoints": ["POST /api/contact", "GET /api/health"]
}
```

---

### 2. Health Check
- **URL**: `GET /api/health`
- **Description**: Monitored by uptime checkers (e.g. UptimeRobot, Render health checks). Exempt from SSL redirection.
- **Response**: `200 OK`
```json
{
  "status": "ok",
  "uptime": 1240
}
```

---

### 3. Contact Form Submission
- **URL**: `POST /api/contact`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hi Khuswanth, I would like to discuss an opportunity."
}
```

#### Validation Rules:
- `name`: String, 2 to 80 characters, single line (no newline characters).
- `email`: Valid email address, max 254 characters (normalized to lowercase).
- `message`: String, minimum 10 characters (control characters stripped).

#### Responses:
- **Success (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Message sent! I'll get back to you soon."
  }
  ```
- **Validation Error (`422 Unprocessable Entity`)**:
  ```json
  {
    "success": false,
    "message": "Please fix the highlighted fields.",
    "error": "Please fix the highlighted fields.",
    "errors": [
      { "field": "email", "message": "Please enter a valid email." }
    ]
  }
  ```
- **Rate Limit Exceeded (`429 Too Many Requests`)**:
  Includes `Retry-After: <seconds>` response header.
  ```json
  {
    "success": false,
    "message": "Too many messages sent. Please try again later.",
    "error": "Too many messages sent. Please try again later."
  }
  ```
- **Delivery Failure (`502 Bad Gateway`)**:
  ```json
  {
    "success": false,
    "message": "Sorry, your message couldn't be sent right now. Please email me directly at contact@example.com.",
    "error": "Sorry, your message couldn't be sent right now. Please email me directly at contact@example.com."
  }
  ```

---

## 🧪 Testing & Diagnostics

### Run Automated Tests
The project includes automated tests validating form submissions, validation errors, and rate limits:
```bash
python manage.py test contact
```

### Test Network Ports
Verify whether your ISP or host allows outbound connections to Gmail SMTP ports:
```bash
python test_ports.py
```

### Test SMTP Authentication Directly
Verify your `.env` SMTP credentials with an end-to-end test email:
```bash
python test_smtp.py
```

---

## 🚢 Production Deployment

### Windows Server
Run via Waitress:
```bash
waitress-serve --listen=0.0.0.0:5000 portfolio_api.wsgi:application
```

### Linux (Render, Railway, DigitalOcean, VPS)
Run via Gunicorn:
```bash
gunicorn portfolio_api.wsgi:application --bind 0.0.0.0:${PORT:-5000} --workers 2 --timeout 30
```

### Deployment Checklist
1. Set `NODE_ENV=production`.
2. Generate and set `DJANGO_SECRET_KEY`.
3. Set `ALLOWED_HOSTS` to your production domain / Render host (e.g. `your-api.onrender.com`).
4. Set `ALLOWED_ORIGIN` to your frontend URL (e.g. `https://khuswanthportfolio.vercel.app`).
5. Ensure `TRUSTED_PROXY_COUNT=1` when deploying behind a reverse proxy (Render, Railway, Cloudflare).
6. Configure `EMAIL_USER` and `EMAIL_PASS`. Optionally set `RESEND_API_KEY` for fallback redundancy.
