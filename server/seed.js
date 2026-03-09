const mongoose = require("mongoose");
const Job = require("./models/Job");
require("dotenv").config();

const dummyJobs = [
  {
    title: "Senior Product Designer",
    company: "DesignCo",
    location: "Remote / San Francisco",
    category: "Design",
    description:
      "We are looking for a Senior Product Designer to join our team...",
    type: "Full Time",
    salary: "$120k - $150k",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "Frontend Developer (React)",
    company: "TechFlow",
    location: "Remote / Berlin",
    category: "Technology",
    description:
      "Join our frontend team and build beautiful user interfaces...",
    type: "Full Time",
    salary: "€60k - €80k",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "Marketing Strategist",
    company: "Brandify",
    location: "New York, NY",
    category: "Marketing",
    description: "Lead our marketing campaigns and grow our brand presence...",
    type: "Full Time",
    salary: "$90k - $110k",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "Financial Analyst",
    company: "FinHoldings",
    location: "London, UK",
    category: "Finance",
    description:
      "Analyze financial data and provide strategic recommendations...",
    type: "Full Time",
    salary: "£50k - £70k",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "Backend Engineer (Node.js)",
    company: "API Wizards",
    location: "Remote",
    category: "Technology",
    description:
      "Help us build scalable backend services using Node.js and MongoDB...",
    type: "Contract",
    salary: "$80 - $120 / hr",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "Sales Executive",
    company: "GrowthLab",
    location: "Chicago, IL",
    category: "Sales",
    description: "Drive sales growth and manage client relationships...",
    type: "Full Time",
    salary: "$70k - $90k + Commission",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "HR Manager",
    company: "PeopleFirst",
    location: "Austin, TX",
    category: "Human Resource",
    description: "Manage recruitment, benefits, and employee relations...",
    type: "Full Time",
    salary: "$85k - $105k",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "Business Development Manager",
    company: "BizGrow",
    location: "Seattle, WA",
    category: "Business",
    description:
      "Identify new business opportunities and strategic partnerships...",
    type: "Full Time",
    salary: "$100k - $130k",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Paris, France",
    category: "Design",
    description: "Create stunning user experiences for our global clients...",
    type: "Freelance",
    salary: "€40 - €60 / hr",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Remote",
    category: "Engineering",
    description: "Manage our cloud infrastructure and CI/CD pipelines...",
    type: "Full Time",
    salary: "$130k - $160k",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "Content Marketing Manager",
    company: "WordSmith",
    location: "Remote / London",
    category: "Marketing",
    description: "Create compelling content strategies and manage our blog...",
    type: "Part Time",
    salary: "£30k - £40k",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "Full Stack Developer",
    company: "Innovate Inc",
    location: "Toronto, Canada",
    category: "Technology",
    description: "Build end-to-end features using MERN stack...",
    type: "Full Time",
    salary: "$90k - $120k",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "Accountant",
    company: "BalancePoint",
    location: "Sydney, Australia",
    category: "Finance",
    description: "Handle financial reporting and tax compliance...",
    type: "Full Time",
    salary: "$80k - $95k AUD",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "Project Manager",
    company: "Streamline Projects",
    location: "Madrid, Spain",
    category: "Business",
    description: "Coordinate projects and ensure timely delivery...",
    type: "Contract",
    salary: "€50k - €65k",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "Mobile App Developer (Flutter)",
    company: "AppLaunch",
    location: "Remote",
    category: "Engineering",
    description: "Develop cross-platform mobile applications using Flutter...",
    type: "Full Time",
    salary: "$100k - $140k",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "Recruitment Specialist",
    company: "TalentHub",
    location: "Dubai, UAE",
    category: "Human Resource",
    description: "Source and hire top talent for our clients...",
    type: "Full Time",
    salary: "AED 15k - 20k / month",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "SEO Specialist",
    company: "SearchLogic",
    location: "Remote",
    category: "Marketing",
    description: "Optimize websites for search engines and drive traffic...",
    type: "Contract",
    salary: "$50 - $70 / hr",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "Graphic Designer",
    company: "Visual Arts",
    location: "Milan, Italy",
    category: "Design",
    description: "Create visual identities and marketing materials...",
    type: "Part Time",
    salary: "€20k - €25k",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "Systems Architect",
    company: "DataNode",
    location: "Remote / Singapore",
    category: "Engineering",
    description: "Design and implement complex system architectures...",
    type: "Full Time",
    salary: "$150k - $180k",
    logo: "https://via.placeholder.com/100",
  },
  {
    title: "Inbound Sales Representative",
    company: "SalesBoost",
    location: "Remote",
    category: "Sales",
    description: "Manage inbound leads and convert prospects...",
    type: "Full Time",
    salary: "$50k - $65k",
    logo: "https://via.placeholder.com/100",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    await Job.deleteMany({});
    console.log("Cleared existing jobs");

    await Job.insertMany(dummyJobs);
    console.log("Successfully seeded 20 dummy jobs");

    mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
