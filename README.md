# The Super App

## Description

The application is a personalized entertainment dashboard where users can register, select their preferred categories, and view information such as weather, news, movie recommendations, notes, and a countdown timer. The application is built to provide a good user experience.

## Features

- User registration
- Category selection
- Weather information
- Latest news
- Movie recommendations
- Notes section
- Countdown timer
- Responsive design

## Technologies Used

- Next.js 15
- React
- JavaScript
- Tailwind CSS
- Zustand

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install dependencies

Using pnpm (Recommended):

```bash
pnpm install
```

Or using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add the required API keys.

```env
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
NEXT_PUBLIC_MOVIE_API_KEY=your_movie_api_key
```

### 4. Start the development server

Using pnpm:

```bash
pnpm dev
```

Or using npm:

```bash
npm run dev
```

Or using Yarn:

```bash
yarn dev
```

Open your browser and visit:

```
http://localhost:3000
```

## Build for Production

Using pnpm:

```bash
pnpm build
pnpm start
```

Using npm:

```bash
npm run build
npm start
```

Using Yarn:

```bash
yarn build
yarn start
```

## Live Demo

https://the-super-app-lemon.vercel.app/sign-up

## Author

Syed vali
