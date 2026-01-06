# NSBE Fullstack Web Application

A fullstack web application built with Django (backend) and React (frontend) for the National Society of Black Engineers (NSBE) McNeese chapter.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Docker Deployment](#docker-deployment)
- [Infrastructure](#infrastructure)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## Overview

This application provides a comprehensive platform for managing NSBE chapter activities, member information, events, and other organizational functions. 

## Tech Stack

### Backend
- **Framework**: Django 4.x
- **API**:  Django REST Framework
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Database**: SQLite (development), PostgreSQL (production)
- **Admin Interface**: Django Jazzmin
- **Server**: Gunicorn
- **Additional Libraries**:
  - django-cors-headers
  - django-address
  - django-environ
  - Pillow
  - whitenoise
  - django-prometheus

### Frontend
- **Framework**:  React 18.3.1
- **UI Libraries**: 
  - Material-UI (MUI) 6.x
  - Bootstrap 5.3.3
  - styled-components
- **Routing**: React Router DOM 6.x
- **HTTP Client**:  Axios
- **Forms**: React Hook Form
- **Additional Features**:
  - QR Code generation and scanning
  - Google Maps integration
  - Toast notifications
  - FontAwesome icons

### DevOps
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Infrastructure as Code**: Terraform
- **Web Server**: Nginx (frontend)

## Project Structure

```
nsbe/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/               # React source code
│   ├── Dockerfile         # Frontend Docker configuration
│   ├── nginx.conf         # Nginx configuration
│   └── package.json       # Frontend dependencies
│
├── server/                # Django backend application
│   ├── api/               # API endpoints
│   ├── core/              # Core Django settings
│   ├── Dockerfile         # Backend Docker configuration
│   ├── manage.py          # Django management script
│   ├── requirements.txt   # Python dependencies
│   └── run_admin.sh       # Admin setup script
│
├── infra/                 # Infrastructure configuration
│   ├── k8s/               # Kubernetes manifests
│   └── terraform/         # Terraform configurations
│
└── pyproject.toml         # Python project configuration
```

## Prerequisites

- Python 3.9 or higher
- Node.js 16 or higher
- npm or yarn
- Docker and Docker Compose (for containerized deployment)
- kubectl (for Kubernetes deployment)
- Terraform (for infrastructure provisioning)

## Installation

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser:
```bash
python manage.py createsuperuser
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

**Backend:**
```bash
cd server
python manage.py runserver
```
The API will be available at `http://localhost:8000`

**Frontend:**
```bash
cd client
npm start
```
The application will be available at `http://localhost:3000`

### Production Mode

**Backend:**
```bash
cd server
gunicorn core.wsgi:application --bind 0.0.0.0:8000
```

**Frontend:**
```bash
cd client
npm run build
# Serve the build directory with a web server
```

## Docker Deployment

### Build and Run with Docker

**Backend:**
```bash
cd server
docker build -t nsbe-backend .
docker run -p 8000:8000 nsbe-backend
```

**Frontend:**
```bash
cd client
docker build -t nsbe-frontend .
docker run -p 80:80 nsbe-frontend
```

### Using Docker Compose (if configured)

```bash
docker-compose up -d
```

## Infrastructure

The project includes infrastructure configurations for: 

- **Kubernetes**:  Deployment manifests in `infra/k8s/`
- **Terraform**: Infrastructure as Code configurations in `infra/terraform/`

Refer to the respective directories for deployment instructions.

## Development

### Code Formatting

**Backend:**
The project uses Black for Python code formatting:
```bash
black server/
```

**Frontend:**
The project uses Prettier for JavaScript/React formatting:
```bash
cd client
npm run format
npm run format:check  # Check formatting without modifying files
```

### Running Admin Interface

Execute the admin setup script:
```bash
cd server
./run_admin.sh
```

## API Documentation

The Django REST Framework provides a browsable API interface.  Access it at:
```
http://localhost:8000/api/
```

JWT authentication is implemented for secure API access.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure your code follows the project's formatting standards: 
- Run Black on Python code
- Run Prettier on JavaScript/React code
- Write meaningful commit messages
- Update documentation as needed

## License

This project is maintained by NSBE-McNeese. All rights reserved. 

## Contact

For questions or support, please contact the NSBE McNeese chapter.