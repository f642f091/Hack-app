# 🏥 IBD Tracker

A mobile + web app built with [Expo](https://expo.dev), [React Native](https://reactnative.dev), [Styled Components](https://styled-components.com), and [FastAPI](https://fastapi.tiangolo.com/) to help people with Inflammatory Bowel Disease (IBD) track symptoms, monitor trends, engage in community discussions, and share weekly reports with healthcare providers.

---

## 🚀 Get Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ibd-tracker.git
cd ibd-tracker
```

### 2. Install mobile dependencies

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

## 🌐 Website (Cluster Insights Dashboard)

The `website/` folder contains a React dashboard that visualizes medication usage patterns among IBD patients based on unsupervised clustering.

### Tech Stack:
- React + Styled Components
- Hardcoded clusters generated from a real CSV dataset
- Fully responsive layout for cluster exploration

To run:

```bash
cd website
npm install
npm run dev
```

---

## 🧠 Clustering + ML Features

We used unsupervised learning to group patients into clusters based on medication profiles. This helps identify treatment trends and variations across subpopulations.

### Algorithms Used:

- **K-Means Clustering** on medication usage vectors
- **Feature Engineering** on symptom logs
- **TSNE** or **PCA** for dimensionality reduction (optional)

### Future ML Plans:

- ✅ Match new users to clusters based on current meds
- 📪 Predict flare-ups from symptom patterns
- 📈 Optimize treatment suggestions using reinforcement learning

---

## ✨ Features

- ✅ Log daily symptoms (pain, nausea, fatigue, stress, etc.)
- 📊 View progress on a dynamic dashboard
- 💬 Community discussions: diet, coping, medication
- 🐣 Friendly mascot responds to your log consistency
- 🗓️ Medication tracker with calendar check-ins
- 🗘️ Map of nearby IBD-friendly restaurants and clinics
- 📄 Export or preview weekly symptom report as a PDF
- 📚 Explore clusters of patient profiles via the dashboard

---

## 🎢 PDF Report

From the Profile screen, users can:
- **Preview** the current report
- **Export** and **share** the PDF
- Report updates every 7 logs

---

## 🔠 Structure

```
/mobile       ← Frontend (Expo/React Native)
/website      ← Cluster insights dashboard (React)
/server       ← Backend (FastAPI)
```

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
- [Styled Components](https://styled-components.com)
- [FastAPI](https://fastapi.tiangolo.com)

---

## 📄 License

MIT © 2025

