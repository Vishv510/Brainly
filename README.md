# 🧠 SecondBrain – Organize. Store. Access.

<div align="center">

**Your digital knowledge vault for capturing ideas instantly and accessing them seamlessly**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[Live Demo](#) · [Report Bug](https://github.com/your-username/secondbrain/issues) · [Request Feature](https://github.com/your-username/secondbrain/issues)

</div>

---

## 📖 About The Project

**SecondBrain** is a powerful knowledge management system designed to help you capture ideas, organize resources, and access information effortlessly. Whether you're a content creator saving inspiration, a lifelong learner building your knowledge base, or a professional organizing research – SecondBrain keeps everything structured and within reach.

### ✨ Why SecondBrain?

- 🎯 **Capture Instantly** – Save links, videos, articles, and notes in seconds
- 🗂️ **Organize Smartly** – Categorize and tag content for easy retrieval
- 🔄 **Sync Everything** – Access your brain from anywhere, anytime
- 🤝 **Collaborate Effortlessly** – Share your knowledge vault with teammates
- 🎨 **Beautiful UI** – Clean, intuitive interface built with modern design principles

---

## 🎬 Demo

<div align="center">
  
### 🏠 Landing Page
*Capture ideas intantly, access knowledge seamlessly*

![Landing Page]
<img width="1850" height="942" alt="Screenshot 2025-10-29 182005" src="https://github.com/user-attachments/assets/0ca66346-9c40-4ddb-87e6-65f913f175d1" />
<img width="1886" height="947" alt="Screenshot 2025-10-29 181951" src="https://github.com/user-attachments/assets/52cc17b7-2579-483f-95c4-f770af190c82" />
<img width="1916" height="1077" alt="Screenshot 2025-10-29 181926" src="https://github.com/user-attachments/assets/6288036f-1ddd-4c09-a5c5-c79af1c651cd" />


### 📚 Content Dashboard
*All your saved content in one organized view*

![Dashboard]
<img width="1915" height="1077" alt="Screenshot 2025-10-29 181652" src="https://github.com/user-attachments/assets/82e6bb15-3d05-4655-9c1e-d40091a19ce0" />


### ➕ Add New Content
*Quick and intuitive content addition*

![Add Content]
<img width="1918" height="958" alt="Screenshot 2025-10-29 181753" src="https://github.com/user-attachments/assets/e31865ac-7736-49b0-b903-1639ef1b79ed" />


### 🔗 Share Your Brain
*Collaborate with peers and teammates*

![Share Brain]
<img width="1911" height="1040" alt="Screenshot 2025-10-29 181725" src="https://github.com/user-attachments/assets/e6626d3a-d2de-4f36-9fb2-2b958864ce5d" />

</div>

---

## 🚀 Key Features

<table>
<tr>
<td width="50%">

### 🔐 User Features
- ✅ Secure authentication & authorization
- ✅ Personal content library
- ✅ Content categorization with tags
- ✅ Search and filter functionality
- ✅ Edit and delete saved items
- ✅ YouTube video embedding

</td>
<td width="50%">

### 🌐 Collaboration Features
- ✅ Share entire collections via link
- ✅ Public/private content modes
- ✅ Read-only shared access
- ✅ Copy shareable links instantly
- ✅ Cross-platform accessibility

</td>
</tr>
</table>

---

## 🛠️ Built With

<div align="center">

| **Category** | **Technology** | **Purpose** |
|:------------:|:-------------:|:-----------:|
| **Frontend** | ![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black) | UI Framework |
| **Backend** | ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js&logoColor=white) | Runtime Environment |
| **Language** | ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) | Type-Safe Development |
| **Database** | ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) | NoSQL Database |
| **Styling** | ![Tailwind](https://img.shields.io/badge/-Tailwind-06B6D4?style=flat&logo=tailwind-css&logoColor=white) | Utility-First CSS |
| **Build Tool** | ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite&logoColor=white) | Fast Build Tool |

</div>

---

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 🔧 Setup Instructions

1. **Clone the repository**
```bash
   git clone https://github.com/your-username/secondbrain.git
   cd secondbrain
```

2. **Install dependencies**
```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
```

3. **Configure environment variables**
   
   Create `.env` files in both `client` and `server` directories:
   
   **`server/.env`**
```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
```
   
   **`client/.env`**
```env
   VITE_API_URL=http://localhost:5000
```

4. **Start the application**
```bash
   # Terminal 1 - Start backend
   cd server
   npm run dev

   # Terminal 2 - Start frontend
   cd client
   npm run dev
```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 📂 Project Structure
```
secondbrain/
│
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Helper functions
│   │   ├── types/            # TypeScript type definitions
│   │   └── App.tsx           # Main App component
│   ├── public/               # Static assets
│   └── package.json
│
├── server/                    # Backend Node.js application
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Custom middleware
│   │   ├── utils/            # Helper functions
│   │   └── server.ts         # Server entry point
│   └── package.json
│
├── assets/                    # Screenshots and media
└── README.md
```

---

## 🎯 Usage Examples

### Saving Content

1. Click **"Add Content"** button
2. Paste the URL you want to save
3. Add a title and optional description
4. Select content type (URL, Video, Article, etc.)
5. Click **"Add Content"** to save

### Sharing Your Brain

1. Navigate to your dashboard
2. Click **"Share Brain"** button
3. Toggle sharing to enable
4. Copy the generated share link
5. Share with teammates or friends

### Managing Content

- **Edit**: Click on any content card to edit details
- **Delete**: Click the delete button to remove content
- **Search**: Use the search bar to find specific items
- **Filter**: Organize by content type or tags

---

## 🗺️ Roadmap

- [x] User authentication
- [x] Content CRUD operations
- [x] Sharing functionality
- [ ] Content tagging system
- [ ] Advanced search and filters
- [ ] Browser extension
- [ ] Mobile application
- [ ] AI-powered content recommendations
- [ ] Team workspaces
- [ ] Export/Import functionality

See the [open issues](https://github.com/your-username/secondbrain/issues) for a full list of proposed features and known issues.

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

Project Link: [https://github.com/your-username/secondbrain](https://github.com/your-username/secondbrain)

---

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Node.js Documentation](https://nodejs.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

<div align="center">

**Built with ❤️ by [Your Name](https://github.com/your-username)**

⭐ Star this repo if you find it helpful!

</div>
