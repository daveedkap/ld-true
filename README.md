# LD True

A modern, sustainable fashion storefront that curates and resells secondhand clothing across marketplaces like Grailed, eBay, Depop, and Mercari. Built with **Next.js**, **Tailwind CSS**, **Framer Motion**, **MongoDB**, and deployed with **Vercel**.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ld-true.git
cd ld-true
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a `.env.local` file in the root of the directory.

Contact [daveedkap](https://github.com/daveedkap) for credentials.

### 4. Run Locally

```bash
npm run dev
```

Then visit `http://localhost:3000`.

---

## 🧠 Project Structure

```
app/               # App routes (Next.js App Router)
components/        # Shared UI components
lib/               # Helpers: MongoDB, email, etc.
models/            # Mongoose schemas
public/            # Static assets
.env.local         # Environment variables (not committed)
```

---

## 👥 Contributing

We welcome contributions! Please follow the steps below to make a feature or bug fix:

### 1. Pull latest changes and create a new branch

```bash
git pull origin main # Pull latest changes from remote main branch
git pull origin staging # Pull latest changes from remote staging branch. The staging branch is where you will push your changes.
git checkout -b your-feature-name # Create your feature branch
```

### 2. Make Your Changes

Keep changes clean and limited to the purpose of the branch.

### 3. Test, Stage, Commit, and Push

```bash
npm run build && npm start # Build deployment for Vercel to make sure it's successful, and test in your localhost.
git diff # View all your local changes
git diff filename # View individual file's local changes
git add . # Add all your modified changes/files.
git add filename # Or add one file at a time
git commit -m "Add [your feature]" # "Save" your changes to your local repository.
git push origin your-feature-name # Push your local changes/commits to a remote branch for your feature.
```

### 4. Create a Pull Request

After pushing, you should be able to open a Pull Request (PR), and compare it to the remote staging branch. Make sure you compare to the remote staging branch and NOT the main branch. Only after further review will changes made in staging be merged into main.

## ✅ Git Etiquette

- Keep PRs focused on one thing (avoid massive changes).
- Always pull the latest changes from `main` and `staging` before starting a new branch.
- If stuck, create a draft PR and ask for help or reach out to [daveedkap](https://github.com/daveedkap).

---

## 🛠️ Built With

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vercel](https://vercel.com/)

---

## 📫 Contact

Feel free to reach out via the [Contact](https://ld-true.vercel.app/contact) page, [daveedkap](https://github.com/daveedkap), or open an issue for questions and ideas.

---

