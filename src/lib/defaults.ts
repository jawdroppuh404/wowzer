export type FAQ = { question: string; answer: string };
export type Service = {
  slug: string;
  title: string;
  heroTitle: string;
  heroAccent: string;
  description: string;
  introTitle: string;
  intro: string;
  theme: "water" | "air";
  image: string;
  imageAlt: string;
  offerings: { title: string; description: string }[];
  faqs: FAQ[];
  seoTitle: string;
  seoDescription: string;
};
export const defaults = {
  neighborhoodImage: "/images/florida/neighborhood.webp",
  homeImage: "/images/florida/home.webp",
  backyardImage: "/images/florida/backyard.webp",
  phone: "656.240.8321",
  email: "info@callwowzer.com",
  address: "6802 Lakeview Center Drive, Unit 3-305, Tampa, FL 33619",
  bookingURL: "https://callwowzer.com/contact-us/",
  schedulerID: "sched_prsyzn7vid06gr3jema49tdb",
  schedulerKey: "lz2akh7yjmygyf9sna7l5ray",
  logoPath: "/images/wowzer-logo.webp",
  vanPath: "/images/wowzer-van.webp",
  serviceAreas: [
    "Tampa",
    "Brandon",
    "Bradenton",
    "Clearwater",
    "Riverview",
    "Ruskin",
    "Seffner",
    "Temple Terrace",
    "Plant City",
    "Valrico",
  ],
  heroTitle: "Your home.",
  heroAccent: "Our wow factor.",
  heroDescription:
    "Plumbing and air care that goes beyond the fix. Honest answers, upfront pricing, and a whole lot of Wow.",
  promiseTitle: "Big personality.\nEven bigger care.",
  promiseDescription:
    "The van gets your attention. The way we treat your home earns your trust. We listen first, explain your options, and make getting things fixed feel refreshingly simple.",
  promises: [
    {
      title: "The price comes first.",
      description:
        "Flat-rate, upfront pricing before work begins. You know the plan before we pick up a tool.",
    },
    {
      title: "Good advice. Zero pressure.",
      description:
        "Clear recommendations and free second opinions. You make the call on what is right for your home.",
    },
    {
      title: "People who take pride.",
      description:
        "A team that trains every week and treats your home with care, from hello to the final check.",
    },
  ],
  membershipTitle: "A little care.\nA lot less worry.",
  membershipDescription:
    "Meet the Wow Wellness Plan. Annual maintenance, priority service, waived dispatch fees, and 10% off services. More peace of mind, all year long.",
  membershipPrice: "$20",
  membershipPeriod: "/ month",
  membershipAnnual: "Or $200 per year.",
  membershipURL: "https://callwowzer.com/maintenance-plan/",
  financingTitle: "Comfort now.\nRoom to breathe.",
  financingDescription:
    "An unexpected repair should not put your home on hold. Explore financing options for the work you need.",
  financingURL: "https://callwowzer.com/financing/",
  ctaTitle: "Let’s get your home\nback to happy.",
  faqs: [
    {
      question: "Can you come out today?",
      answer:
        "Same-day appointments are available whenever scheduling allows. Call us with your concern and location so we can confirm the next available visit.",
    },
    {
      question: "Will I know the price before work starts?",
      answer:
        "Yes. We explain the recommended work and provide flat-rate, upfront pricing before we begin. You can ask questions and decide how you would like to proceed.",
    },
    {
      question: "Do you offer a second opinion?",
      answer:
        "Yes. Wowzer offers free second opinions. If you have a repair or replacement recommendation from another company, contact us to arrange a visit.",
    },
    {
      question: "What is the Wow Wellness Plan?",
      answer:
        "Our maintenance membership includes annual maintenance, priority service, waived dispatch fees, and service discounts. Ask our team about the full benefits and the lifetime warranty available with an active annual membership.",
    },
  ] as FAQ[],
};
export const serviceDefaults: Service[] = [
  {
    slug: "plumbing",
    title: "Plumbing",
    theme: "water",
    heroTitle: "Goodbye, drip.",
    heroAccent: "Hello, relief.",
    description:
      "From the first morning shower to the last load of dishes, keep life flowing with plumbing service that puts your home first.",
    introTitle: "Every pipe. Every drop.\nWe’re on it.",
    intro:
      "A stubborn clog, an unexpected leak, or no hot water: whatever interrupted your day, we will help you understand the problem and find a practical way forward.",
    image: "/images/wowzer-van.webp",
    imageAlt: "Wowzer service van",
    offerings: [
      {
        title: "Water heaters & tankless systems",
        description:
          "Restore dependable hot water with repair, replacement, or a tankless upgrade suited to your household.",
      },
      {
        title: "Drain cleaning & sewer lines",
        description:
          "Get slow drains moving and address recurring backups with professional drain cleaning and sewer replacement.",
      },
      {
        title: "Leaks & whole-home repiping",
        description:
          "Find the source of water leaks and replace worn supply lines with a plan built around your home.",
      },
      {
        title: "Fixtures & faucets",
        description:
          "Repair or replace the fixtures you use every day, from kitchen faucets to bathroom plumbing.",
      },
      {
        title: "Water treatment",
        description:
          "Repair or replace filtration and treatment equipment to meet your household’s water needs.",
      },
      {
        title: "Gas lines & safety inspections",
        description:
          "Professional gas line repair, replacement, and annual plumbing safety inspections.",
      },
    ],
    faqs: [
      {
        question: "What plumbing problems do you handle?",
        answer:
          "We handle water heaters, tankless systems, drains, sewer lines, leaks, repiping, fixtures, gas lines, water treatment, and annual safety inspections.",
      },
      {
        question: "Should I repair or replace my water heater?",
        answer:
          "That depends on its age, condition, and performance. We inspect your equipment, explain your options, and provide pricing before you decide.",
      },
      {
        question: "Can you help with recurring leaks?",
        answer:
          "Yes. We can assess recurring leaks and the condition of your water lines to help determine whether a targeted repair or repiping makes sense.",
      },
      ...defaults.faqs.slice(0, 2),
    ],
    seoTitle: "Plumbing Services in Tampa & Brandon, FL | Wowzer!",
    seoDescription:
      "Water heaters, drain cleaning, leak repair, repiping and more. Get upfront pricing and friendly plumbing service from Wowzer in Tampa and surrounding communities.",
  },
  {
    slug: "hvac",
    title: "Heating & Air",
    theme: "air",
    heroTitle: "Florida heat.",
    heroAccent: "Meet your match.",
    description:
      "Cool afternoons. Cozy evenings. Heating and air care that makes every room feel like your favorite place to be.",
    introTitle: "Your comfort zone.\nOur specialty.",
    intro:
      "When your home feels too warm, too cold, or just not quite right, we look at the whole picture—from the equipment to the air moving through your rooms.",
    image: "/images/wowzer-van.webp",
    imageAlt: "Wowzer service van",
    offerings: [
      {
        title: "Air conditioning repair",
        description:
          "Warm air, weak airflow, or an unusual noise? We diagnose the issue and explain the repair clearly.",
      },
      {
        title: "AC installation & replacement",
        description:
          "Choose a cooling system that fits your home, with careful installation and a thorough final check.",
      },
      {
        title: "Heating repair & installation",
        description:
          "Dependable furnace repair and replacement for the days when Florida needs a little extra warmth.",
      },
      {
        title: "Seasonal maintenance",
        description:
          "Give your heating and cooling equipment regular attention to help catch problems early.",
      },
      {
        title: "Duct cleaning & replacement",
        description:
          "Address buildup, leaks, and worn ductwork so conditioned air can reach the rooms that need it.",
      },
      {
        title: "Indoor air quality",
        description:
          "Explore filtration, air circulation, and humidity solutions tailored to your indoor environment.",
      },
    ],
    faqs: [
      {
        question: "Why is my AC running but not cooling?",
        answer:
          "Several issues can cause poor cooling. Our team can inspect your system, identify the cause, and explain the recommended next step.",
      },
      {
        question: "How often should my HVAC system be serviced?",
        answer:
          "Most systems benefit from service once or twice a year, depending on the equipment. We can recommend a schedule for your home.",
      },
      {
        question: "Do you repair heating systems too?",
        answer:
          "Yes. Wowzer provides furnace repairs, installation, and maintenance in addition to air-conditioning services.",
      },
      ...defaults.faqs.slice(0, 2),
    ],
    seoTitle: "AC & Heating Services in Tampa & Brandon, FL | Wowzer!",
    seoDescription:
      "Stay comfortable with Wowzer AC repair, heating, installation, tune-ups, ductwork and indoor air quality services in Tampa and nearby communities.",
  },
];
export type SiteSettings = typeof defaults;
