# 🏥 IBD Tracker

A mobile app built with [Expo](https://expo.dev), [React Native](https://reactnative.dev), and [FastAPI](https://fastapi.tiangolo.com/) to help people with Inflammatory Bowel Disease (IBD) track symptoms, monitor trends, and export weekly reports to share with their healthcare providers.

---

## 🚀 Get Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ibd-tracker.git
cd ibd-tracker
```

### 2. Install dependencies

```bash
cd mobile
npm install
```

### 3. Start the Expo app

```bash
npx expo start
```

Open it in:

- [Expo Go](https://expo.dev/go)
- Android emulator
- iOS simulator

---

## 🤪 Backend Setup (FastAPI)

Ensure FastAPI and uvicorn are installed.

```bash
cd server
uvicorn main:app --reload
```

> Backend runs at `http://localhost:8000` (or your LAN IP if using device).

---

## ✨ Features

- ✅ Log daily symptoms (pain, nausea, fatigue, stress, etc.)
- 📊 View progress on a dynamic dashboard
- 💬 Community discussions: diet, coping, medication
- �� Friendly mascot responds to your log consistency
- 🗓️ Medication tracker with calendar check-ins
- 🗙️ Map of nearby IBD-friendly restaurants and clinics
- 📄 Export or preview weekly symptom report as a PDF

---

## 🛄 PDF Report

From the Profile screen, users can:
- **Preview** the current report
- **Export** and **share** the PDF
- Report updates every 7 logs

---

## 💠 Structure

```
/mobile       ← Frontend (Expo)
  /app
  /components
  /assets
/server       ← Backend (FastAPI)
  main.py
```

---

## 📸 Screenshots

_You can include screenshots of:_

- 📋 Log screen  
- 📊 Dashboard charts  
- 📄 PDF report preview  
- 💬 Community forums  
- 💊 Medication tracker  
- 🗙️ Clinic/restaurant map

---

## 👨‍💻 Authors

- **Fabrizio Falcon**  
- **Sam Kelemen**

Built with ❤️ during a hackathon focused on real-world impact for chronic illness management.

---

## 🧠 Learn More

- [Expo Docs](https://docs.expo.dev)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [react-native-calendars](https://github.com/wix/react-native-calendars)
- [FastAPI](https://fastapi.tiangolo.com)

---

## 📄 License

MIT © 2025
