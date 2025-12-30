# Pousada Villa & Mar - Frontend

React website for Pousada Villa & Mar showcasing rooms, amenities, and contact information.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

Output will be in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── App.tsx              # Main app component
├── components/          # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Rooms.tsx
│   ├── MonthlyRental.tsx
│   ├── Gallery.tsx
│   ├── Amenities.tsx
│   ├── Location.tsx
│   └── Footer.tsx
├── constants.tsx        # App constants (rooms, amenities, brand info)
├── types.ts            # TypeScript type definitions
├── index.css           # Global styles
├── index.tsx           # App entry point
└── public/             # Static assets
```

## Configuration

### Brand Information
Edit `constants.tsx` to update:
- Pousada name and contact info
- Room details
- Amenities
- Social media links

### Styling
The app uses Tailwind CSS with custom colors defined in `tailwind.config.js`:
- `villa-deep`: Deep teal for headers
- `villa-sea`: Ocean blue for accents
- `villa-gold`: Warm gold for highlights
- `villa-sand`: Neutral sand tones

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
Build the project and deploy the `dist/` folder to any static hosting service.

## Future Enhancements

- Integration with backend calendar API for real-time availability
- Online booking system
- Multi-language support
- Image optimization
