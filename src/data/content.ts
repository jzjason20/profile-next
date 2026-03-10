export interface Project {
  title: string;
  description: string;
  href: string;
  status: "Work" | "Live" | "Research" | "Clinical";
  tags: string[];
  active: boolean;
}

export interface TimelineItem {
  date: string;
  detail: string;
  href?: string;
}

export interface Publication {
  title: string;
  description: string;
  href: string;
  venue: string;
  year: string;
}

export interface Award {
  place: string;
  event: string;
  note?: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface NowProject {
  name: string;
  href: string;
  description: string;
  status: string;
}

export const heroContent = {
  name: "Jacy",
  title: "Curious developer building playful products",
  description:
    "I design and code hands-on experiments across web, machine learning, and creative technology — always shipping something new to learn from.",
  primaryCta: { label: "See projects", href: "#projects" },
  secondaryCta: { label: "View timeline", href: "#timeline" },
};

export const aboutContent = {
  realName: "Jason",
  age: 20,
  summary:
    "Hey, I'm a curious guy who loves learning new things by getting hands-on with the code. I split time between ML research, product experiments, and tinkering with UI.",
  skills: [
    "HTML/CSS",
    "JavaScript",
    "Python",
    "Flutter/Dart",
    "React",
    "Bootstrap",
    "Git",
    "UI/UX",
    "TensorFlow",
    "OpenCV",
    "scikit-learn",
  ],
  hobbies: ["Coding", "Reading", "Sports", "Gaming", "Listening to music"],
  blogUrl: "https://jacyjason.substack.com/",
  blogTitle: "Check out my substack",
};

export const projects: Project[] = [
  {
    title: "AskLexy",
    description:
      "Developer at AskLexy. AI-powered learning and career prep platform.",
    href: "https://asklexy.me",
    status: "Work",
    tags: ["AI", "Web"],
    active: true,
  },
  {
    title: "LifeXP",
    description:
      "A gamified way to track life experiences and skill progression.",
    href: "https://lifexp.live",
    status: "Live",
    tags: ["App", "Web"],
    active: true,
  },
  {
    title: "Bodhimaram",
    description:
      "Custom WordPress site helping a playschool manage admissions, events, and storytelling.",
    href: "https://bodhimaram.in/",
    status: "Live",
    tags: ["Web"],
    active: false,
  },
  {
    title: "Road Network Extraction",
    description:
      "Hybrid CNN + U-Net model extracting road graphs from satellite imagery for rapid mapping.",
    href: "https://github.com/jzjason20/satellite-road-extraction",
    status: "Research",
    tags: ["AI", "Research"],
    active: false,
  },
  {
    title: "solarVert",
    description:
      "Dashboard that helps solar panel owners monitor uptime, faults, and maintenance queues.",
    href: "https://github.com/jzjason20/solarVert",
    status: "Live",
    tags: ["App", "Web"],
    active: false,
  },
  {
    title: "Cancer Pain Prediction",
    description:
      "Predicts pain spikes for cancer patients and suggests interventions before they escalate.",
    href: "https://github.com/jzjason20/cancer_pain_prediction",
    status: "Clinical",
    tags: ["AI", "Research", "Clinical"],
    active: false,
  },
];

export const timeline: TimelineItem[] = [
  { date: "August 2017", detail: "Started coding in C and Python." },
  {
    date: "May 2019",
    detail:
      "Launched my first personal website with HTML, CSS, and JavaScript.",
  },
  {
    date: "March 2020",
    detail:
      "Explored machine learning with TensorFlow, PyTorch, and scikit-learn.",
  },
  {
    date: "May 2021",
    detail: "Interned at Bodhimaram on full-stack development.",
  },
  {
    date: "November 2023",
    detail: "Began research on liquid neural networks.",
  },
  {
    date: "February 2024",
    detail: "Placed 3rd in a hackathon building a hybrid CNN + U-Net model.",
  },
  {
    date: "August 2024",
    detail: "Built solarVert, a solar panel management app for a hackathon.",
  },
  {
    date: "September 2024",
    detail:
      "Won 2nd place in a human pose estimation hackathon and earned an internship.",
  },
  {
    date: "September 2024",
    detail:
      "Won 3rd place for a cancer pain estimation and prediction platform.",
  },
  {
    date: "March 2025",
    detail: "Placed top 5 in a national-level hackathon hosted at Google.",
  },
  {
    date: "April 2025",
    detail:
      "Started building lifeXP, a gamified way to track life experiences.",
  },
  {
    date: "May 2025",
    detail: "Developer at AskLexy",
    href: "https://asklexy.me",
  },
  {
    date: "December 2025",
    detail:
      "Published IEEE paper: ENDCL — Attention-Enhanced CNN-BiLSTM model for automated cardiovascular disease detection.",
    href: "https://ieeexplore.ieee.org/abstract/document/11376121",
  },
];

export const publications: Publication[] = [
  {
    title: "ENDCL: Attention-Enhanced CNN-BiLSTM",
    description:
      "Automated cardiovascular disease detection model combining CNN, BiLSTM, and attention mechanisms. Published at IEEE.",
    href: "https://ieeexplore.ieee.org/abstract/document/11376121",
    venue: "IEEE",
    year: "Dec 2025",
  },
];

export const awards: Award[] = [
  { place: "2nd", event: "Human Pose Estimation", note: "+ internship offer" },
  { place: "3rd", event: "Satellite Road Extraction (CNN + U-Net)" },
  { place: "3rd", event: "Cancer Pain Prediction Platform" },
  { place: "Top 5", event: "National Hackathon @ Google" },
];

export const contactContent = {
  message:
    "Need a teammate, an engineer who loves storytelling, or someone to jam on product ideas with? I'm just an email away.",
  email: "mailto:jazjasonlee@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/jzjason20" },
    { label: "Instagram", href: "https://www.instagram.com/jazjason20/" },
    { label: "Email", href: "mailto:jazjasonlee@gmail.com" },
    { label: "Discord", href: "jacyjason20" },
  ] as SocialLink[],
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/jzjason20" },
  { label: "Instagram", href: "https://www.instagram.com/jazjason20/" },
  { label: "Email", href: "mailto:jazjasonlee@gmail.com" },
  { label: "Discord", href: "jacyjason20" },
];

export const nowContent = {
  lastUpdated: "March 2026",
  building: [
    {
      name: "AskLexy",
      href: "https://asklexy.me",
      description:
        "AI-powered learning and career prep platform. Working on the developer experience and onboarding flows.",
      status: "Active",
    },
    {
      name: "LifeXP",
      href: "https://lifexp.live",
      description:
        "Gamified life experience tracker. Iterating on the progression system and data visualisations.",
      status: "Active",
    },
  ] as NowProject[],
  reading: [
    "The Pragmatic Programmer — Hunt & Thomas",
    "The Design of Everyday Things — Don Norman",
  ],
  obsessed: [
    "Agentic AI workflows and how far you can push tool-use",
    "Building products that feel alive without overengineering them",
    "Tiny physical interfaces — buttons, knobs, haptics",
  ],
};
