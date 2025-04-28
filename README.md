# Student Results Portal

A full-stack web application for searching and viewing student examination results.

## Features

- Search for students by name with live suggestions
- View detailed student information including:
  - Personal details (index number, NIC)
  - Academic performance (Z-score, ranks)
  - Subject-wise grades
- Responsive design for desktop and mobile
- PostgreSQL database with efficient indexing

## Tech Stack

- **Backend**: Node.js with Express
- **Frontend**: React with Tailwind CSS
- **Database**: PostgreSQL
- **Build Tools**: Vite

## Local Development Setup

### Prerequisites

- Node.js (v16+)
- PostgreSQL (v13+)
- npm or yarn

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd student-results-portal
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory based on the `.env.example` file:

   ```bash
   cp server/.env.example .env
   ```

   Update the values in the `.env` file with your own configuration.

4. **Set up the PostgreSQL database**

   ```bash
   # Create the database
   createdb student_results

   # Apply the schema
   npm run db:push
   ```

5. **Import the data**

   First, make sure the `data/allresults.jsonl` file is in place, then run:

   ```bash
   node server/import.js
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

   The application should now be running at http://localhost:5000

## Ubuntu VPS Deployment Guide

### Server Setup

1. **Update and install required packages**

   ```bash
   sudo apt update
   sudo apt upgrade -y
   sudo apt install -y nodejs npm postgresql nginx certbot python3-certbot-nginx
   ```

2. **Configure PostgreSQL**

   ```bash
   # Create a database user
   sudo -u postgres createuser -P student_app
   
   # Create the database
   sudo -u postgres createdb -O student_app student_results
   
   # Edit PostgreSQL configuration to allow password authentication
   sudo nano /etc/postgresql/*/main/pg_hba.conf
   
   # Add/modify this line:
   # host    all             student_app      0.0.0.0/0               md5
   
   # Restart PostgreSQL
   sudo systemctl restart postgresql
   ```

3. **Clone and set up the application**

   ```bash
   cd /var/www
   sudo mkdir student-results
   sudo chown $USER:$USER student-results
   git clone <repository-url> student-results
   cd student-results
   npm install
   
   # Create .env file
   cp server/.env.example .env
   # Edit .env with production values
   nano .env
   
   # Import data
   node server/import.js
   
   # Build frontend
   npm run build
   ```

4. **Create a systemd service**

   ```bash
   sudo nano /etc/systemd/system/student-results.service
   ```

   Add the following:

   ```
   [Unit]
   Description=Student Results Portal
   After=network.target
   
   [Service]
   Type=simple
   User=www-data
   WorkingDirectory=/var/www/student-results
   ExecStart=/usr/bin/node dist/index.js
   Restart=on-failure
   Environment=NODE_ENV=production
   Environment=PORT=5000
   # Add other environment variables here
   
   [Install]
   WantedBy=multi-user.target
   ```

   Enable and start the service:

   ```bash
   sudo systemctl enable student-results
   sudo systemctl start student-results
   ```

5. **Configure Nginx**

   ```bash
   sudo cp /var/www/student-results/nginx.conf /etc/nginx/sites-available/student-results
   sudo ln -s /etc/nginx/sites-available/student-results /etc/nginx/sites-enabled/
   
   # Edit the config to match your domain
   sudo nano /etc/nginx/sites-available/student-results
   
   # Test and reload Nginx
   sudo nginx -t
   sudo systemctl reload nginx
   ```

6. **Set up SSL with Let's Encrypt**

   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

## Maintenance and Monitoring

- **Check application logs**:
  ```bash
  sudo journalctl -u student-results.service
  ```

- **Update the application**:
  ```bash
  cd /var/www/student-results
  git pull
  npm install
  npm run build
  sudo systemctl restart student-results
  ```

## Environment Variables

| Variable     | Description                           | Example                                         |
|--------------|---------------------------------------|-------------------------------------------------|
| DATABASE_URL | PostgreSQL connection string          | postgres://user:pass@localhost:5432/student_results |
| PGUSER       | PostgreSQL username                   | postgres                                        |
| PGPASSWORD   | PostgreSQL password                   | your_password                                   |
| PGHOST       | PostgreSQL host                       | localhost                                       |
| PGPORT       | PostgreSQL port                       | 5432                                            |
| PGDATABASE   | PostgreSQL database name              | student_results                                 |
| PORT         | Application port                      | 5000                                            |
| NODE_ENV     | Node environment                      | production                                      |
