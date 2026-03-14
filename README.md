# Bharadhwaj K — Portfolio Website

A clean, dark-themed portfolio with separate pages for Home, Projects, and Contact. Built with HTML, CSS, JavaScript, Bootstrap 5, Tailwind CSS, Node.js, Express, and MySQL.

---

## 📁 Project Structure

```
portfolio/
├── index.html          ← Home page
├── projects.html       ← Projects page
├── contact.html        ← Contact page
├── css/
│   └── style.css       ← Custom styles + CSS variables
├── js/
│   └── main.js         ← DOM, animations, form handling
├── images/
│   ├── profile1.png    ← Comic art profile (hero)
│   ├── profile2.png    ← Photo profile (hero overlay)
│   ├── ending.png      ← CTA section background
│   └── background.png  ← Hero background
├── server/
│   └── server.js       ← Express + MySQL backend
├── package.json
├── .env.example        ← Copy to .env and fill values
└── README.md
```

---

## 🚀 Local Setup

### 1. Prerequisites
- Node.js v16+
- MySQL Server running locally
- npm

### 2. Database Setup
Open MySQL and run:
```sql
CREATE DATABASE IF NOT EXISTS userDetails;
USE userDetails;

-- The server auto-creates the contacts table on first run
-- But you can manually create it too:
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Install & Run
```bash
# Clone or unzip the project
cd portfolio

# Copy env file
cp .env.example .env
# Edit .env with your DB credentials

# Install dependencies
npm install

# Start server (development)
npm run dev

# Start server (production)
npm start
```

### 4. Open in browser
```
http://localhost:3000
```

---

## 🌐 Deployment

### Option A — Render.com (Free)
1. Push code to GitHub
2. Go to https://render.com → New Web Service
3. Connect your GitHub repo
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `node server/server.js`
5. Add Environment Variables from `.env.example`
6. Add a **MySQL Add-on** (PlanetScale / Railway / ClearDB)
7. Deploy ✅

### Option B — Railway.app (Easy)
1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Add a MySQL service
4. Set environment variables
5. Deploy ✅

### Option C — VPS (DigitalOcean / AWS EC2)
```bash
# Install Node & PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# Clone and setup
git clone your-repo
cd portfolio
cp .env.example .env
nano .env  # fill in production values
npm install

# Start with PM2 (auto-restart)
pm2 start server/server.js --name "portfolio"
pm2 startup
pm2 save

# Setup Nginx reverse proxy (optional, for port 80/443)
```

---

## 🔒 Security Features
- **Helmet.js** — Sets secure HTTP headers (XSS, CSRF, clickjacking protection)
- **Rate Limiting** — 100 req/15min general, 5 messages/hour on contact
- **Input Validation** — express-validator sanitizes all form inputs
- **SQL Injection** — Parameterized queries via mysql2
- **CORS** — Only allows requests from your domain
- **Content Security Policy** — Restricts external script/style sources

---

## 📝 Resume
Place your resume PDF at: `portfolio/resume.pdf`

The "Download Resume" button links to `/resume.pdf`.

---

## 🛠 Tech Stack
| Layer | Technology |
|-------|-----------|
| HTML | Semantic HTML5 |
| CSS | Custom CSS + Bootstrap 5 + Tailwind CSS |
| JavaScript | Vanilla DOM + ES6+ |
| Backend | Node.js + Express |
| Database | MySQL (mysql2 driver) |
| Security | Helmet, express-rate-limit, express-validator |
| Fonts | Google Fonts (Cinzel, DM Sans, JetBrains Mono) |
| Icons | Font Awesome 6 |

---

Built by **Bharadhwaj K** 🔥
