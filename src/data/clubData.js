// Authentic and rich data for Kongu Engineering College - Mobile Application Club (MADC)

export const KEC_INFO = {
  collegeName: "Kongu Engineering College",
  tagline: "Autonomous • Affiliated to Anna University",
  accreditation: "Accredited by NAAC with 'A++' Grade • NBA Accredited",
  location: "Perundurai, Erode - 638060, Tamil Nadu, India",
  clubName: "Mobile Application Club",
  clubAcronym: "MADC",
  clubMotto: "Innovate • Code • Deploy • Transform",
  established: "2018",
  contactEmail: "madc@kongu.edu",
  instagram: "https://instagram.com/madc_kec",
  github: "https://github.com/madc-kec",
  linkedin: "https://linkedin.com/company/madc-kec"
};

export const CLUB_STATS = [
  { label: "Active Student Members", value: "1,250+", icon: "users" },
  { label: "Apps Deployed", value: "48+", icon: "smartphone" },
  { label: "Hackathons Won", value: "22+", icon: "trophy" },
  { label: "Hands-on Workshops", value: "38+", icon: "code" },
  { label: "Average App Rating", value: "4.9 ★", icon: "star" }
];

export const DOMAINS = [
  {
    id: "android",
    name: "Android Native Core",
    icon: "android",
    badge: "Most Popular",
    color: "#3ddc84",
    techs: ["Kotlin", "Jetpack Compose", "Coroutines", "Room DB", "Material 3"],
    description: "Architecting high-performance, robust Android experiences leveraging contemporary Kotlin coroutines, declarative Jetpack Compose UI, and cutting-edge architecture components.",
    focus: "Modern Android Architecture (MVVM/MVI), Background WorkManager, Bluetooth LE & Sensors integration."
  },
  {
    id: "ios",
    name: "iOS & Apple Ecosystem",
    icon: "apple",
    badge: "Enterprise Grade",
    color: "#38bdf8",
    techs: ["Swift", "SwiftUI", "Combine", "CoreML", "WidgetKit"],
    description: "Designing silky smooth iOS applications strictly adhering to Apple's Human Interface Guidelines. From micro-interactions to on-device neural engine inferences.",
    focus: "Declarative SwiftUI, App Clips, Apple Watch companions, TestFlight distribution."
  },
  {
    id: "flutter",
    name: "Cross-Platform Engines",
    icon: "layers",
    badge: "High Velocity",
    color: "#02569B",
    techs: ["Flutter", "Dart", "React Native", "Expo", "Riverpod"],
    description: "Building production-ready, beautiful native compilation applications for both Android and iOS from a unified, maintainable codebase.",
    focus: "State management at scale, custom Skia/Impeller animations, native platform channels."
  },
  {
    id: "uiux",
    name: "Mobile UI/UX & Design Systems",
    icon: "palette",
    badge: "Creative Lab",
    color: "#f43f5e",
    techs: ["Figma", "Framer", "Design Tokens", "Micro-Animations", "Accessibility"],
    description: "Crafting intuitive user journeys, high-fidelity prototypes, design system component libraries, and WCAG accessibility standards.",
    focus: "Wireframing, interactive prototyping, user heuristics, and hand-off to mobile engineers."
  },
  {
    id: "ai-cloud",
    name: "Mobile AI & Cloud Backend",
    icon: "cloud",
    badge: "Future Tech",
    color: "#a855f7",
    techs: ["Firebase", "Supabase", "TensorFlow Lite", "MediaPipe", "REST/GraphQL"],
    description: "Connecting edge mobile devices with serverless clouds, real-time WebSockets, on-device computer vision models, and offline-first database synchronizations.",
    focus: "Edge AI inference, encrypted authentication, push notification pipelines, real-time telemetry."
  }
];

export const STUDENT_PROJECTS = [
  {
    id: "kec-campus-connect",
    title: "Kongu Campus Connect",
    category: "Campus Utility",
    rating: "4.9",
    downloads: "8,500+",
    platforms: ["Android", "iOS", "Web"],
    tagline: "The all-in-one digital life companion for Kongu Engineering College students and staff.",
    description: "Real-time campus bus GPS tracking, daily mess & canteen menus, hostel gate pass digital approvals, exam hall allocation maps, and internal attendance calculators.",
    stack: ["Flutter", "Firebase", "Node.js", "Leaflet Maps"],
    features: [
      "Live college bus route tracking with ETA",
      "Digital Hostel Outing & Gate Pass with dynamic QR",
      "Daily mess menu votes & feedback",
      "Instant college notifications & circulars"
    ],
    github: "https://github.com/madc-kec/campus-connect",
    badge: "Campus Favorite"
  },
  {
    id: "mediquick",
    title: "MediQuick Emergency",
    category: "HealthTech & Safety",
    rating: "4.9",
    downloads: "3,200+",
    platforms: ["Android"],
    tagline: "Zero-latency emergency SOS beacon and blood donor network for Erode district.",
    description: "Developed by MADC members during the Smart India Hackathon. Connects rural primary health centers with blood donors using offline mesh networking.",
    stack: ["Kotlin", "Jetpack Compose", "Nearby Connections API", "Supabase"],
    features: [
      "SOS broadcast without active cellular internet",
      "Geo-fenced verified blood donor notification",
      "Offline first-aid voice assisted instructions",
      "Direct ambulance dispatch hotline"
    ],
    github: "https://github.com/madc-kec/mediquick",
    badge: "Hackathon Winner"
  },
  {
    id: "skillsync-kec",
    title: "SkillSync KEC",
    category: "Peer Learning & Mentorship",
    rating: "4.8",
    downloads: "2,100+",
    platforms: ["Android", "iOS"],
    tagline: "Connect student developers across departments for hackathon team building.",
    description: "Matches students with complementary skills: pairs backend specialists with mobile designers, algorithmic coders with cloud architects.",
    stack: ["React Native", "Expo", "FastAPI", "PostgreSQL"],
    features: [
      "Skill-based match algorithm with GitHub profile analysis",
      "Hackathon team recruiting boards",
      "Peer review code snippets",
      "In-app encrypted real-time chat"
    ],
    github: "https://github.com/madc-kec/skillsync",
    badge: "Trending"
  },
  {
    id: "nutritrack-ai",
    title: "NutriTrack Edge AI",
    category: "Artificial Intelligence",
    rating: "4.7",
    downloads: "1,800+",
    platforms: ["iOS", "Android"],
    tagline: "Instant dietary calorie and nutritional breakdown using on-device vision.",
    description: "Takes a photo of traditional South Indian meals (dosa, idli, meals) and computes accurate macro-nutrient metrics entirely offline on device.",
    stack: ["SwiftUI", "CoreML", "Flutter", "TFLite Model"],
    features: [
      "100% offline inference on phone NPU",
      "Calorie estimation tailored for Indian cuisine",
      "Glycemic index alerts for health-conscious users",
      "Daily hydration & nutrient target tracking"
    ],
    github: "https://github.com/madc-kec/nutritrack-ai",
    badge: "AI Powered"
  }
];

export const UPCOMING_EVENTS = [
  {
    id: "appthon-2026",
    title: "AppThon 2026: 36-Hour National Mobile Hackathon",
    date: "October 16 - 17, 2026",
    daysRemaining: 26,
    venue: "Convention Center, Kongu Engineering College",
    prizePool: "₹1,50,000 Cash Prizes",
    type: "National Hackathon",
    status: "Registrations Open",
    description: "India's premier student mobile engineering hackathon! Build transformative solutions in Generative AI on Mobile, FinTech Inclusion, HealthTech, and Smart Agriculture.",
    highlights: [
      "Round-the-clock mentorship by top industry mobile architects",
      "Free food, accommodation, and high-speed campus Wi-Fi",
      "Direct fast-track interview opportunities with sponsor tech firms"
    ]
  },
  {
    id: "flutterverse-workshop",
    title: "FlutterVerse 3.0: Zero to App Store Workshop",
    date: "November 04 - 05, 2026",
    daysRemaining: 45,
    venue: "CC-9 High Performance Computing Lab, KEC",
    prizePool: "Swags & Certificates",
    type: "Hands-on Bootcamp",
    status: "Limited to 60 Seats",
    description: "Two days of intensive coding: Master state management with Riverpod, offline caching with Hive, and automated deployment pipelines.",
    highlights: [
      "Hands-on coding of two complete portfolio apps",
      "Free custom Flutter cheat sheets & source repositories",
      "Industry accredited participation certificate"
    ]
  },
  {
    id: "swiftui-sprint",
    title: "SwiftUI Masterclass: Crafting Apple-Grade UIs",
    date: "November 21, 2026",
    daysRemaining: 62,
    venue: "Apple Authorized Lab, KEC",
    prizePool: "App Showcase Trophy",
    type: "Specialized Masterclass",
    status: "Upcoming",
    description: "Deep dive into declarative UI, interactive canvas previewing, custom transition animations, and widgets for iOS 18.",
    highlights: [
      "Hands-on with Mac Studio devices in KEC labs",
      "Building dynamic interactive iOS lock screen widgets",
      "Guidance for publishing your first app on TestFlight"
    ]
  }
];

export const PRINCIPAL_INFO = {
  name: "Dr. R. Parameshwaran",
  role: "Principal, Kongu Engineering College",
  honor: "Website Inaugurated & Officially Launched By",
  photo: "/principal.jpg",
  message: "Empowering the next generation of engineers to pioneer mobile computing excellence, innovative app architectures, and societal solutions."
};

export const TEAM_MEMBERS = [
  {
    name: "Dr. R. Parameshwaran",
    role: "Chief Patron & Principal",
    dept: "Principal, Kongu Engineering College",
    avatar: "/principal.jpg",
    badge: "Chief Patron"
  },
  {
    name: "Dr. K. Senthil Kumar",
    role: "Faculty Patron & Club Mentor",
    dept: "Professor & Head, Dept. of Computer Applications",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    badge: "Faculty Advisor"
  },
  {
    name: "Pravin Raj M",
    role: "President, MADC",
    dept: "Final Year • Mobile Systems Architect",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    badge: "Student President"
  },
  {
    name: "Harini Sundaram",
    role: "Vice President & Flutter Lead",
    dept: "Third Year • Cross-Platform Specialist",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    badge: "VP & Flutter Lead"
  },
  {
    name: "Karthik Vignesh",
    role: "Native Android & Kotlin Lead",
    dept: "Third Year • System Architecture",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    badge: "Android Lead"
  },
  {
    name: "Divya Bharathi",
    role: "UI/UX & Product Design Lead",
    dept: "Final Year • Design Systems & Figma",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    badge: "Design Lead"
  },
  {
    name: "Arunachalam S",
    role: "iOS & Cloud Integration Lead",
    dept: "Third Year • Swift & Firebase",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    badge: "iOS Lead"
  }
];

export const TESTIMONIALS = [
  {
    quote: "Being part of MADC transformed my perspective from writing basic code to deploying production apps on the Google Play Store with 5,000+ users. The mentorship is unmatched!",
    author: "Naveen Kumar",
    batch: "KEC Batch of 2024",
    currentRole: "Mobile Engineer @ Swiggy"
  },
  {
    quote: "The club hackathons gave us the confidence to participate in National hackathons. The collaboration culture between juniors and seniors here is inspiring.",
    author: "Sowmya R",
    batch: "KEC Batch of 2025",
    currentRole: "iOS Developer @ Zoho"
  },
  {
    quote: "From UI/UX wireframing in Figma to building Flutter backends on Supabase, MADC teaches the exact skills companies test during campus recruitment drives.",
    author: "Vigneshwaran P",
    batch: "KEC Batch of 2024",
    currentRole: "Product Engineer @ ThoughtWorks"
  }
];
