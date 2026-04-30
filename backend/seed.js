const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Job = require('./models/Job');

dotenv.config();

const seedData = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Create a dummy recruiter (or reuse one if already exists)
  let recruiter = await User.findOne({ role: 'recruiter' });
  if (!recruiter) {
    recruiter = await User.create({
      name: 'Demo Recruiter',
      email: 'recruiter@demo.com',
      password: 'password123',
      role: 'recruiter',
    });
    console.log('Demo recruiter created (email: recruiter@demo.com, password: password123)');
  }

  // Clear existing jobs (optional — remove this line to keep existing jobs)
  await Job.deleteMany({});

  const jobs = [
    {
      title: 'Frontend Developer',
      company: 'TechCorp India',
      location: 'Bangalore',
      salary: '₹8–12 LPA',
      keywords: ['React', 'JavaScript', 'CSS', 'HTML'],
      description: `We are looking for a skilled Frontend Developer to join our growing team.\n\nResponsibilities:\n- Build responsive web UIs using React\n- Collaborate with designers and backend engineers\n- Write clean, maintainable code\n\nRequirements:\n- 2+ years of React experience\n- Strong HTML/CSS skills\n- Familiarity with REST APIs`,
      postedBy: recruiter._id,
    },
    {
      title: 'Node.js Backend Engineer',
      company: 'Startup Hub',
      location: 'Remote',
      salary: '₹10–15 LPA',
      keywords: ['Node.js', 'Express', 'MongoDB', 'REST API'],
      description: `Join our fast-growing startup as a Backend Engineer.\n\nResponsibilities:\n- Design and build RESTful APIs\n- Manage MongoDB databases\n- Ensure performance and scalability\n\nRequirements:\n- 2+ years Node.js experience\n- Experience with MongoDB/Mongoose\n- Good understanding of JWT auth`,
      postedBy: recruiter._id,
    },
    {
      title: 'Full Stack Developer',
      company: 'Innovate Solutions',
      location: 'Hyderabad',
      salary: '₹12–18 LPA',
      keywords: ['React', 'Node.js', 'MongoDB', 'Express'],
      description: `We need a Full Stack Developer comfortable on both frontend and backend.\n\nResponsibilities:\n- Build end-to-end features independently\n- Write tests and documentation\n- Participate in code reviews\n\nRequirements:\n- MERN stack experience\n- Strong problem-solving skills\n- Good communication`,
      postedBy: recruiter._id,
    },
    {
      title: 'UI/UX Designer',
      company: 'Creative Agency',
      location: 'Mumbai',
      salary: '₹6–10 LPA',
      keywords: ['Figma', 'UI Design', 'Prototyping', 'User Research'],
      description: `Looking for a creative UI/UX Designer to shape our product experience.\n\nResponsibilities:\n- Create wireframes and prototypes in Figma\n- Conduct user research and usability testing\n- Work closely with developers\n\nRequirements:\n- Portfolio showing UI/UX work\n- Proficiency in Figma\n- Understanding of design systems`,
      postedBy: recruiter._id,
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudBase Technologies',
      location: 'Pune',
      salary: '₹14–20 LPA',
      keywords: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      description: `We are hiring a DevOps Engineer to manage our cloud infrastructure.\n\nResponsibilities:\n- Manage AWS infrastructure\n- Set up CI/CD pipelines\n- Monitor system performance\n\nRequirements:\n- Experience with Docker and Kubernetes\n- AWS certification is a plus\n- Strong Linux skills`,
      postedBy: recruiter._id,
    },
  ];

  await Job.insertMany(jobs);
  console.log(`${jobs.length} jobs seeded successfully!`);

  mongoose.disconnect();
};

seedData().catch((err) => {
  console.error('Seed failed:', err);
  mongoose.disconnect();
});