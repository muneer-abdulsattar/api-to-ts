# API to TypeScript Interface Generator

A modern web application that converts API responses into TypeScript interfaces automatically. Test your APIs and generate type-safe TypeScript definitions with a beautiful, user-friendly interface.

## ✨ Features

- **Real-time API Testing**: Send HTTP requests (GET, POST, PUT, PATCH, DELETE) to any API endpoint
- **Automatic TypeScript Generation**: Converts JSON responses to TypeScript interfaces using `json-to-ts`
- **Monaco Editor Integration**: Code editor with syntax highlighting for JSON and TypeScript
- **Request History**: Stores and displays your last 10 API responses
- **Authorization Support**: Add Bearer tokens or custom authorization headers
- **Custom Headers**: Include custom headers in your API requests
- **Request Body Editor**: JSON editor for POST/PUT/PATCH requests
- **Copy to Clipboard**: Easy copying of generated TypeScript interfaces
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Local Storage**: Persists your data between browser sessions

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, or bun package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/muneer-abdulsattar/api-to-ts
cd api-to-ts
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Usage

### Basic API Testing

1. **Select HTTP Method**: Choose from GET, POST, PUT, PATCH, or DELETE
2. **Enter API Endpoint**: Input the full URL of your API endpoint
3. **Add Authorization** (optional): Include Bearer tokens or other auth headers
4. **Add Custom Headers** (optional): Include additional headers as JSON
5. **Add Request Body** (for POST/PUT/PATCH): Input JSON data in the Monaco editor
6. **Submit**: Click the Submit button to make the request

### Generated TypeScript Interfaces

After a successful API request, the application will:

- Display the generated TypeScript interface in the right panel
- Store the response in your local history (last 10 responses)
- Allow you to copy the interface to your clipboard

### Example

**API Response:**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "profile": {
    "age": 30,
    "city": "New York"
  }
}
```

**Generated TypeScript Interface:**

```typescript
interface RootObject {
  id: number
  name: string
  email: string
  profile: Profile
}

interface Profile {
  age: number
  city: string
}
```

## 🏗️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Code Editor**: Monaco Editor
- **HTTP Client**: Axios
- **JSON to TypeScript**: json-to-ts
- **State Management**: React hooks with local storage
- **Notifications**: Sonner

## 📁 Project Structure

```
src/
├── components/
│   └── ui/           # shadcn/ui components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
└── index.css        # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 UI Components

This project uses shadcn/ui components for a consistent and modern interface:

- Forms and inputs
- Buttons and navigation
- Cards and layouts
- Monaco code editor integration
- Toast notifications

## 💾 Data Persistence

The application uses browser localStorage to persist:

- Current form state (URL, headers, body, etc.)
- Last 10 API responses with timestamps
- User preferences and settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Made with ❤️ by [Muneer Abdul Sattar](https://www.linkedin.com/in/muneerabdulsattar)

---

**Note**: This tool is perfect for developers who work with APIs and need to quickly generate TypeScript interfaces for their frontend applications. It saves time and ensures type safety in your TypeScript projects.
