# ✈️ AirStatus - Flight Tracking Application

AirStatus is a comprehensive flight tracking application that provides real-time flight information, status updates, and monitoring capabilities. Built with Next.js 15 and powered by the AviationStack API, it offers users an intuitive way to track flights worldwide.

## 🌟 Features

- **Real-time Flight Tracking**: Get up-to-date flight status and timing information
- **Smart Search**: Search by flight number, airline, route, or airport code
- **Interactive Features**: 
  - Track flights with live updates
  - Set custom alerts for status changes
  - View detailed flight information
- **Multi-page Navigation**: Home, Search, About, and Contact pages
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Aviation-themed UI**: Beautiful background graphics and professional design

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun
- AviationStack API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd airstatus
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_AVIATIONSTACK_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Configuration

### AviationStack API Setup

1. Sign up for a free account at [AviationStack](https://aviationstack.com/)
2. Get your API key from the dashboard
3. Add the key to your `.env` file as shown above
4. The free tier includes 1,000 requests per month

### Supported Search Formats

- **Flight Numbers**: `AA123`, `UA1234`, `BA456`
- **Airport Codes**: `JFK`, `LAX`, `LHR` (departure airport)
- **Routes**: `JFK to LAX`, `NYC-LA`
- **Airlines**: `American Airlines`, `United`

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Home page
│   ├── search/page.tsx    # Search functionality
│   ├── about/page.tsx     # About page
│   └── contact/page.tsx   # Contact page
├── components/
│   ├── common/
│   │   └── Header/page.tsx # Navigation header
│   ├── Search/page.tsx    # Search component
│   └── Status/page.tsx    # Flight status display
public/
├── airstatus-logo.svg     # Application logo
└── hero-background.svg    # Aviation background
```

## 🎨 Key Components

### Header Component
- Logo and navigation links
- Responsive design with hover effects
- Consistent across all pages

### Search Component
- Multi-format flight search
- Loading states and error handling
- Real-time API integration

### Status Component
- Flight information display
- Interactive modals for tracking, alerts, and details
- Status color coding and time formatting

## 🌐 API Integration

The application integrates with the AviationStack API to provide:

- Real-time flight status
- Departure and arrival information
- Airline and aircraft details
- Schedule and delay information
- Live flight tracking data

### API Response Handling

```typescript
interface FlightDataAPI {
  flight_date: string;
  flight_status: string;
  departure: { /* departure info */ };
  arrival: { /* arrival info */ };
  airline: { /* airline info */ };
  flight: { /* flight info */ };
  aircraft: any;
  live: any;
}
```

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npm run type-check   # TypeScript type checking
```

## 🔄 Interactive Features

### Track Flight Modal
- Real-time flight position updates
- Estimated arrival times
- Flight path information

### Set Alert Modal
- Custom notification preferences
- Status change alerts
- Departure/arrival notifications

### View Details Modal
- Comprehensive flight information
- Aircraft details
- Historical data

## 📱 Responsive Design

- **Mobile-first approach**
- **Flexible grid layouts**
- **Touch-friendly interactions**
- **Optimized performance**

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- AWS
- Docker

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.5
- **React**: 19.1.0
- **TypeScript**: Latest
- **Styling**: Tailwind CSS 4
- **API**: AviationStack REST API
- **Icons**: Heroicons (SVG)
- **Deployment**: Vercel-ready

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

- **Email**: support@airstatus.com
- **Documentation**: Check the `/about` page in the application
- **Issues**: Create an issue in this repository

## 🙏 Acknowledgments

- **AviationStack** for providing reliable flight data API
- **Next.js team** for the excellent framework
- **Vercel** for seamless deployment platform
- **Tailwind CSS** for the utility-first CSS framework

---

Built with ❤️ for aviation enthusiasts and travelers worldwide.
