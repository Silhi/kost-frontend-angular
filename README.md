## Kost Frontend (Angular)

This repository contains the frontend application for the Kost management system, developed using Angular.  
The application handles user interactions and communicates with the backend service through a RESTful API.

⚠️ **Important**  
The `main` branch only contains this README file.  
To access the actual source code and application features, you must switch to the `dev` branch after cloning the repository.

### How to Get the Source Code
The `dev` branch contains the full frontend implementation, including features for listing kos, adding and editing kos data, and viewing kos details.

```bash
git clone <repository-url>
cd <repository-folder>
git checkout dev
npm install
ng serve
```
Open the application in your browser:
http://localhost:4200

Features
- Display a list of kos
- Add and edit kos data
- View detailed information of a kos

Tech Stack
- Angular
- Bootstrap
- REST API (Spring Boot)

API Endpoint
Base URL:
http://localhost:8080/api
