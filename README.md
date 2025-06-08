# REMWaste Skip Hire Application

> **Hey there! Welcome to our modern skip hire booking system!**

Ever struggled with clunky, outdated skip hire websites? Yeah, we've been there too. That's why we built this - a clean, modern, and actually enjoyable way to book skip hire services. Built with love using React, TypeScript, and Node.js.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey.svg)](https://sqlite.org/)

---

## What's This All About?

So, what makes this skip hire app special? Well, we've thrown out the old playbook and created something that actually makes sense:

- **Beautiful Design** - Finally, a skip hire site that doesn't look like it's from 2005!
- **Lightning Fast** - No more waiting around. Find your skip and book it in seconds
- **Smart Filtering** - Filter by price, size, or let us suggest the perfect skip for your job
- **Works Everywhere** - Whether you're on your phone during lunch break or at your desktop
- **Transparent Pricing** - No nasty surprises. See exactly what you'll pay upfront
- **Eco-Friendly** - Because we care about the planet (and you should too!)
- **Modern Tech** - Built with the latest tools for a smooth experience

---

## What's Under the Hood?

Don't worry, you don't need to be a tech wizard to use this, but if you're curious:

### The Frontend (What You See)
- **React 18** - The latest and greatest for building user interfaces
- **TypeScript** - JavaScript's smarter cousin that catches bugs before they happen
- **CSS Modules** - Keeps our styling organized and pretty
- **Axios** - Handles all the behind-the-scenes data fetching

### The Backend (The Brain)
- **Node.js & Express** - The engine that powers everything
- **SQLite3** - A simple but powerful database for all our skip data
- **CORS** - Makes sure everything plays nicely together

### Developer Tools (For the Nerds)
- **Create React App** - Gets us up and running quickly
- **ESLint** - Keeps our code clean and consistent
- **Concurrently** - Runs everything at once like magic

---

## How Everything's Organized

Think of this like the blueprint of a house - here's where everything lives:

```
skip-selector-redesign/
├── public/                         # Static files (like your favicon)
│   ├── index.html                     # The main HTML template
│   └── images/                     # Pictures and graphics
├── server/                         # Backend magic happens here
│   ├── server.js                      # Main server file
│   ├── database.js                    # Database connections and queries
│   ├── db-manager.js                  # Database helper functions
│   ├── skips.db                       # Our SQLite database file
│   └── add-skip-example.js            # Example for adding new skips
├── src/                            # Frontend React app
│   ├── api/
│   │   └── skips.ts                   # Functions to talk to our backend
│   ├── components/
│   │   └── SkipCard.tsx               # Individual skip card component
│   ├── pages/
│   │   └── SkipSelection.tsx          # Main page where the magic happens
│   ├── styles/
│   │   ├── main.css                   # Global styles
│   │   ├── SkipSelection.module.css   # Styles for the main page
│   │   └── SkipCard.module.css        # Styles for skip cards
│   ├── types/
│   │   └── skip.ts                    # TypeScript definitions
│   ├── App.tsx                        # Root component
│   └── index.tsx                      # App entry point
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── WASTE_MANAGEMENT_THEME_UPDATE.md # Theme documentation
└── README.md                       # You're reading it right now!
```

---

## Let's Get This Thing Running!

Alright, ready to see this baby in action? Let's walk through it step by step.

### What You'll Need First

Don't panic! These are pretty standard tools that most developers have:

- **Node.js** (v16 or newer) - [Grab it here](https://nodejs.org/) - it's free!
- **npm** (comes with Node.js) - This handles all our dependencies
- **Git** - [Get it here](https://git-scm.com/) - for cloning the project

### Let's Do This!

#### Step 1: Get the Code
```bash
# Clone this repository to your computer
git clone https://github.com/fawaznasser/REMwaste.git
cd REMwaste
```

**Or try it instantly on CodeSandbox:**
👉 **[Open in CodeSandbox](https://codesandbox.io/s/github/fawaznasser/REMwaste)** 👈

#### Step 2: Install the Dependencies
```bash
# This might take a minute - perfect time for a coffee!
npm install
```

#### Step 3: Fire It Up!

**The Easy Way (Recommended):**
```bash
# This starts both the frontend and backend together
npm run dev
```

**The Manual Way (If you like more control):**

Open two terminal windows:

*Terminal 1 - Backend:*
```bash
npm run server
# Your API will be running on http://localhost:3001
```

*Terminal 2 - Frontend:*
```bash
npm start
# Your React app will be running on http://localhost:3000
```

#### Step 4: See the Magic!
- **Main App:** http://localhost:3000 ← This is where you'll book skips
- **API:** http://localhost:3001/api/skips ← This is where the data comes from

---

## About the Design

### Why It Looks the Way It Does

We didn't just pick random colors! Every design choice has a purpose:

- **Green Colors** - Because we're all about sustainability and the environment
- **Orange Accents** - Safety first! This is construction industry standard
- **Dark Grays** - Professional, industrial look that builds trust
- **Subtle Animations** - Just enough flair without being annoying

### The User Experience Philosophy
- **Keep it simple** - If your grandma can't figure it out, we've failed
- **Show, don't tell** - Visual information beats walls of text
- **Mobile first** - Because most people browse on their phones
- **Fast and responsive** - Nobody has time to wait for slow websites

---

## What Can You Actually Do With This?

### For Users (The Fun Stuff!)
- **Browse Skips** - See all available skip sizes with real photos
- **Get Real Prices** - Transparent pricing with VAT included
- **Smart Search** - Filter by budget, size, or project type
- **Easy Booking** - Simple, step-by-step booking process
- **Mobile Friendly** - Book a skip while waiting for the bus

### For Developers (The Geeky Stuff!)
- **RESTful API** - Clean endpoints for all your data needs
- **SQLite Database** - Simple but powerful data storage
- **TypeScript** - Catch bugs before your users do
- **Modular CSS** - Organized styling that doesn't clash
- **Real Analytics** - See what skips are most popular

### The Cool Features You Might Miss
- **Smart Recommendations** - We'll suggest the best skip for your job
- **Price Comparison** - See which size gives you the best bang for your buck
- **Eco Info** - Learn about our recycling rates and environmental impact
- **Delivery Info** - Know exactly when your skip will arrive

---

## The Technical Bits (API Stuff)

If you're a developer or just curious about how the backend works:

### What Our API Can Do

| What You Want | How to Get It | What You Get Back |
|---------------|---------------|-------------------|
| All skips | `GET /api/skips` | Every skip we have available |
| Local skips | `GET /api/skips/location?postcode=NR32` | Skips in your area |
| Health check | `GET /api/health` | "Yes, we're alive!" |

### Sample Response (What the Data Looks Like)
```json
{
  "id": 1,
  "size": 6,
  "price_before_vat": 180,
  "vat": 20,
  "hire_period_days": 14,
  "allowed_on_road": true,
  "allows_heavy_waste": false,
  "location": "Norfolk NR32",
  "created_at": "2025-06-08T10:00:00Z"
}
```

Pretty straightforward, right?

---

## Works on Everything

### We've Tested On...
- **Your Phone** (320px+) - Perfect for browsing during your commute
- **Your Tablet** (768px+) - Great for comparing options on the couch
- **Your Laptop** (1024px+) - Full feature experience
- **Your Big Monitor** (1440px+) - All the space you need

### Performance Tricks We Use
- **Smooth Animations** - But we tone them down on slower devices
- **Smart Loading** - Only load what you need, when you need it
- **Touch-Friendly** - Big buttons that are easy to tap
- **Fast Images** - Optimized so you're not waiting around

---

## Developer Commands Cheat Sheet

Here are the commands you'll actually use:

| Command | What It Does | When You'd Use It |
|---------|--------------|-------------------|
| `npm start` | Starts the React app | Daily development |
| `npm run server` | Starts just the backend | Testing API changes |
| `npm run dev` | Starts everything | Most of the time |
| `npm run build` | Creates production version | Deploying to live site |
| `npm test` | Runs tests | When you want to be sure |

### Environment Setup (Optional But Helpful)

Create a `.env` file if you want to customize things:
```env
# Want to use different ports?
PORT=3001
NODE_ENV=development

# Database somewhere else?
DB_PATH=./server/skips.db

# Different frontend URL?
CORS_ORIGIN=http://localhost:3000
```

### Going Live (Production Build)
```bash
# Build the production version
npm run build

# Test it locally before deploying
npx serve -s build -l 3000
```

---

## Database Stuff (Don't Worry, It's Simple!)

### Our Database Design

We keep it simple with SQLite. Here's what a skip looks like in our database:

```sql
CREATE TABLE skips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  size INTEGER NOT NULL,
  price_before_vat DECIMAL(10,2) NOT NULL,
  vat DECIMAL(5,2) DEFAULT 20.0,
  hire_period_days INTEGER DEFAULT 14,
  allowed_on_road BOOLEAN DEFAULT 0,
  allows_heavy_waste BOOLEAN DEFAULT 0,
  location TEXT DEFAULT 'Norfolk NR32',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Useful Database Commands (For Windows)
```powershell
# See what's in the database (if you have SQLite installed)
sqlite3 server/skips.db ".tables"
sqlite3 server/skips.db "SELECT * FROM skips;"

# Start fresh (will recreate with sample data)
Remove-Item server/skips.db
npm run server
```

---

## Making It Your Own

### Want to Change the Colors?

The theme lives in these files:
- `src/styles/SkipSelection.module.css` - Main colors and animations
- `src/styles/SkipCard.module.css` - Individual skip card styling  
- `src/styles/main.css` - Overall app styling

### Our Color Palette (Feel free to steal it!)
```css
/* The colors that make it look professional */
--primary-dark: #2c3e50;      /* Dark professional base */
--primary-steel: #34495e;     /* Steel blue accent */
--primary-green: #27ae60;     /* Environmental green */
--primary-orange: #f39c12;    /* Construction orange */
--primary-safety: #e67e22;    /* Safety orange */

/* Backgrounds and text */
--bg-light: #f8f9fa;          /* Light, clean backgrounds */
--bg-warm: #fff3cd;           /* Warm card backgrounds */
```

### Adding New Skips to the Database
```javascript
// Check out add-skip-example.js for the full example
const newSkip = {
  size: 8,
  price_before_vat: 220,
  vat: 20,
  hire_period_days: 14,
  allowed_on_road: true,
  allows_heavy_waste: false,
  location: 'Norfolk NR32'
};
```

---

## When Things Go Wrong (Troubleshooting)

Don't panic! These things happen to everyone:

### "Port already in use" Error
```powershell
# Kill whatever's using the port
npx kill-port 3000
npx kill-port 3001

# Or just use a different port
$env:PORT=3002; npm start
```

### Database Won't Connect
```powershell
# Check if the database file exists
Get-ChildItem server/skips.db

# Start over with a fresh database
Remove-Item server/skips.db
npm run server
```

### "Module not found" Errors
```powershell
# The classic "turn it off and on again"
Remove-Item -Recurse node_modules, package-lock.json
npm install
```

### TypeScript Being Annoying
```powershell
# Check what TypeScript is complaining about
npx tsc --noEmit

# Clear the cache
Remove-Item -Recurse node_modules/.cache
```

### Still Stuck?
- Check the browser console for error messages
- Look at the Network tab to see if API calls are failing
- Make sure both frontend and backend are running
- Try refreshing the page (seriously, sometimes it works!)

---

## Want to Contribute?

That's awesome! Here's how:

### The Process
1. **Fork** this repo (there's a button for that)
2. **Create** a branch with a descriptive name (`git checkout -b my-amazing-feature`)
3. **Make** your changes (and test them!)
4. **Commit** with a clear message (`git commit -m 'Add amazing feature that does X'`)
5. **Push** it up (`git push origin my-amazing-feature`)
6. **Open** a Pull Request and tell us what you built!

### What We Look For
- **Clean Code** - If it's hard to read, it's hard to maintain
- **Comments** - Help future developers (including yourself) understand your thinking
- **Testing** - Does it work? How do we know?
- **Documentation** - Update the README if you add new features

### Running Tests
```bash
# Run the test suite
npm test

# See how much of the code is covered by tests
npm test -- --coverage
```

---

## Legal Stuff

This project is open source under the **MIT License**. Basically, you can do whatever you want with it, just don't blame us if something breaks!

---

## About REMWaste

We're not just about moving waste around - we're about doing it responsibly:

- **Skip Hire That Makes Sense** - From tiny 2-yard skips to massive 40-yarders
- **Actually Green** - We recycle up to 95% of what goes in our skips  
- **Reliable as Clockwork** - When we say we'll be there, we'll be there
- **Paperwork Sorted** - We handle all the permit stuff so you don't have to

### Get in Touch
- **Phone:** Give us a ring for a chat about your project
- **Email:** Drop us a line anytime
- **Coverage:** Norfolk NR32 and everywhere around it

---

## Thanks To...

- **The React Team** - For making frontend development actually enjoyable
- **The TypeScript Team** - For saving us from ourselves
- **Create React App** - For handling all the boring config stuff
- **SQLite** - For being a database that just works
- **Everyone in the Waste Management Industry** - For inspiring us to build something better
- **You!** - For reading this far down the README

---

## Want to Learn More?

Here are some great resources if you want to dive deeper:

- [React Docs](https://reactjs.org/docs/) - The official React documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Everything TypeScript
- [SQLite Docs](https://sqlite.org/docs.html) - Database documentation
- [Express.js Guide](https://expressjs.com/en/guide/) - Backend framework docs
- [CSS Modules](https://github.com/css-modules/css-modules) - How our styling works

---

**Built with care and lots of coffee for better waste management** | **REMWaste Skip Hire v1.0.0**

*Last updated: June 8, 2025 - and yes, we actually keep this up to date!*