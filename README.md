# ImageForge

ImageForge is a modern, high-performance image compression application built with **Next.js 16** and **Tailwind CSS v4**. It features a beautiful glassmorphism UI, smooth animations powered by **Framer Motion**, and secure client-side compression.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-cyan)

## ✨ Features

- **🚀 Client-Side Compression**: All processing happens in your browser. No images are ever uploaded to a server, ensuring 100% privacy.
- **🎨 Modern Glassmorphism UI**: A stunning, responsive interface with frosted glass effects and fluid animations.
- **⚡ Lightning Fast**: Built on Next.js for optimal performance and SEO.
- **🔄 Smart Compression**: Automatically balances quality and file size using intelligent algorithms.
- **📱 Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices.
- **🖱️ Drag & Drop**: Easy file upload interface.
- **📊 Real-time Stats**: See exact file size reduction and preview images before downloading.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.1](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Compression Logic**: [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression)
- **Language**: TypeScript

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/image-forge.git
    cd compress-image
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Run the development server**

    ```bash
    npm run dev
    ```

4.  **Open the app**

    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
compress-image/
├── app/
│   ├── components/       # Reusable UI components
│   │   ├── Button.tsx    # Custom animated button
│   │   ├── Compressor.tsx# Core compression logic UI
│   │   ├── Features.tsx  # Feature showcase section
│   │   ├── Footer.tsx    # App footer
│   │   ├── GlassCard.tsx # Glassmorphism container
│   │   └── Hero.tsx      # Landing page hero section
│   ├── services/
│   │   └── compressionservice.ts # Image processing logic
│   ├── globals.css       # Tailwind v4 configuration
│   ├── layout.tsx        # Root layout with fonts
│   ├── page.tsx          # Main application page
│   └── types.ts          # TypeScript definitions
├── public/               # Static assets
└── package.json          # Project dependencies
```

## 🔧 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm start`: Runs the built production application.
- `npm run lint`: Runs ESLint to check for code quality issues.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
