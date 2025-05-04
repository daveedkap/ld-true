# LD TRUE

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

Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your-mongodb-uri
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=your-email@gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

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

### 1. Create a New Branch

```bash
git checkout -b your-feature-name
```

### 2. Make Your Changes

Keep changes clean and limited to the purpose of the branch.

### 3. Stage, Commit, and Push

```bash
git add .
git commit -m "✨ Add [your feature]"
git push origin your-feature-name
```

### 4. Create a Pull Request

Go to GitHub and open a PR against `main` with a clear description of your changes.

---

## ✅ Git Etiquette

- Keep PRs focused on one thing (avoid massive changes).
- Always pull the latest changes from `main` before starting a new branch.
- If stuck, create a draft PR and ask for help.

---

## 🛠️ Built With

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vercel](https://vercel.com/)

---

## 📫 Contact

Feel free to reach out via the [Contact](https://ld-true.vercel.app/contact) page or open an issue for questions and ideas.

---

