
# AdvaJobs

## Overview  
AdvaJobs is a modern job advertisement platform that connects job seekers and employers. Built using a microservices architecture, it provides features such as user and company account management, secure login, job postings, and application handling.  

## Features  
- **User Microservice:** Login, registration, profile updates, account verification, and OTP resend.  
- **Company Microservice:** Company registration, profile management, verification, and OTP resend.  
- **Job Microservice:** Job posting, deletion, and application management.  

## Technologies  
- **Frontend:** React (Vite.js)  
- **Backend:** Java Spring Boot  
- **API Architecture:** RESTful APIs  
- **Database:** MySQL  
- **Other Tools:** ORM  

## Getting Started  
### Prerequisites  
1. **Node.js** and npm for frontend  
2. **Java 17+** and Spring Boot CLI for backend  
3. **Docker** (optional for containerization)  

### Installation  
1. Clone the repository:  
   ```bash
   git clone https://github.com/pasiths/AdvaJobs.git
   ```  
2. Navigate to the frontend directory and install dependencies:  
   ```bash
   cd client
   npm install
   ```  
3. Run the backend services:  
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```  

## Project Structure  
- **Frontend:** React project using Vite.js.  
- **Backend:** Three Java Spring Boot microservices – User, Company, and Job.  

## Branching Strategy  
- `main`: Production-ready code.  
- `dev`: Development branch.  
- Feature branches: `user`, `company`, `job`, etc.  

## Contribution Guidelines  
1. Fork the repository.  
2. Create a new branch:  
   ```bash
   git checkout -b feature/branch-name
   ```  
3. Commit changes:  
   ```bash
   git commit -m "Description of changes"
   ```  
4. Push to your branch and create a Pull Request.  

## Team  

- [Pasith Senevirathna](https://github.com/pasiths) 
- [Supun Chamuditha](https://github.com/supunchamuditha)
- [Anuttara Nirmani](https://github.com/AnuNirmani)  
- [Chamudi Jayasinghe](https://github.com/cocsm/test-marge.git)  
- [Srimal Tharupathi](https://github.com/srimalonlinez)

## License  
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.  
