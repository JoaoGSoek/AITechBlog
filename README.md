# AI Tech Blog (Full Stack Challenge) 🚀

An automated web application that generates and publishes daily technology articles using Artificial Intelligence. Built and deployed as a Full-Stack Technical Challenge.

🔗 **Live Demo:** [http://3.144.174.127](http://3.144.174.127)

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + ShadCN/ui
- **Features:** Masonry Grid Layout, Markdown Rendering, Server Components.

### Backend
- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **AI:** Google Gemini API (via `@google/generative-ai`)
- **Automation:** `@nestjs/schedule` (Daily Cron Job)

### Infrastructure & DevOps
- **Cloud:** AWS EC2 (Free Tier)
- **Containerization:** Docker & Docker Compose
- **CI/CD:** AWS CodeBuild
- **Registry:** Amazon Elastic Container Registry (ECR)

---

## ⚙️ Architecture Overview

The system operates as a containerized microservices architecture:

1.  **Backend:** Runs a Cron Job (`0 0 * * *`) that prompts the AI for a tech topic, sanitizes the Markdown output, and persists it to Postgres. *It also includes a seed logic to populate the DB on startup if empty.*
2.  **Frontend:** Consumes the REST API via Server Side Fetching to render articles.
3.  **Deployment Flow:**
    - Git Push to `main` -> Triggers AWS CodeBuild.
    - CodeBuild builds Docker images -> Pushes to ECR.
    - EC2 pulls images and runs via `docker-compose`.

---

## 🚀 How to Run Locally

### Prerequisites
- Docker & Docker Compose
- Node.js (v18+)
- A Google Gemini API Key

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/JoaoGSoek/AITechBlog.git
    cd AITechBlog
    ```

2.  **Configure Environment:**
    Create a `.env` file or update `docker-compose.yml` with your credentials:
    ```env
    DATABASE_URL="postgresql://admin:admin@postgres:5432/blog_db?schema=public"
    GEMINI_API_KEY="YOUR_API_KEY"
    ```

3.  **Start with Docker Compose:**
    ```bash
    docker-compose up -d
    ```

4.  **Access:**
    - Frontend: `http://localhost:3001`
    - Backend API: `http://localhost:3000/articles`

---

## 📝 Technical Decisions

- **Monorepo Structure:** Chosen to keep frontend, backend, and infra configuration versioned together, simplifying the CI/CD pipeline.
- **Prisma ORM:** Selected for its strong type safety with TypeScript and reliable migration system across different environments (Alpine Linux support).
- **Prompt Engineering:** Implemented strict output rules and sanitization logic to ensure the AI returns clean Markdown without conversational fillers.
- **AWS CodeBuild:** Used to ensure production images are always built in a clean environment and automatically versioned in ECR.
