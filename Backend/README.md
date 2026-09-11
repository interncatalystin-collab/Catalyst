# InternCatalyst Backend REST API

This folder contains the complete, modular Node.js REST API backend server for the InternCatalyst platform.

## Folder Structure

```
Backend/
├── index.js                     # Main server entry point & HTTP listener
├── config.js                    # Server PORT (5000) & CORS settings
├── database.js                  # In-memory database store (Jobs, Applications, Companies)
├── routes.js                    # Express-style HTTP route dispatcher
├── controllers/
│   ├── authController.js        # Student Get OTP & Employer/Admin password login
│   ├── internshipController.js  # Internship postings & listing management
│   └── applicationController.js # Student applications & Admin manual candidate selection/forwarding
└── README.md                    # Documentation manual
```

## How to Run

```bash
# Run backend server directly
node Backend/index.js

# Or run via npm script
npm run backend
```

## REST API Endpoints

- `GET /api/health` — Check server status
- `POST /api/auth/send-otp` — Dispatch student OTP
- `POST /api/auth/verify-otp` — Verify student OTP
- `POST /api/auth/login` — Employer & Admin login
- `GET /api/internships` — List approved internships
- `POST /api/internships` — Post new internship
- `GET /api/applications` — Get candidate applications audit queue
- `POST /api/applications` — Submit internship application
- `POST /api/applications/forward` — Admin select & forward candidate to employer
