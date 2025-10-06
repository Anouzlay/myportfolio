import React from 'react';
import Layout from '@/components/Layout/Layout';
import AboutMe from '@/components/Sections/AboutMe';
import ProfessionalBackground from '@/components/Sections/ProfessionalBackground';
import KeyProjects from '@/components/Sections/KeyProjects';
import Certifications from '@/components/Sections/Certifications';
import SkillsAndStrengths from '@/components/Sections/SkillsAndStrengths';
import Educations from '@/components/Sections/Educations';
import Services from '@/components/Sections/Services';
import { 
  PersonalInfo, 
  ProfessionalExperience, 
  Project, 
  Certification, 
  Skill 
} from '@/types';
import portfolioData from '../mydata.json';

// Personal information from JSON data
const personalInfo: PersonalInfo = {
  name: portfolioData.profile.name,
  title: portfolioData.profile.title,
  email: portfolioData.profile.email,
  phone: portfolioData.profile.phone,
  location: portfolioData.profile.location,
  summary: portfolioData.profile.summary,
  profileImage: "/mypicture.JPG" // Your profile image
};

// Full experiences mapped and sorted (current/latest first)
const allProfessionalExperiences: ProfessionalExperience[] = (portfolioData.experience || [])
  .map((exp: any, index: number) => {
    const start = typeof exp.start_date === 'string' ? exp.start_date : '';
    const endRaw = exp.end_date;
    const isCurrent = !endRaw || endRaw === 'Present' || exp.current === true;
    const end = isCurrent ? 'Present' : (typeof endRaw === 'string' ? endRaw : '');

    return {
      id: `exp-${index + 1}`,
      company: exp.organization,
      position: exp.role,
      duration: start ? `${start} - ${end || 'Present'}` : (end || 'Present'),
      location: exp.location || 'Morocco',
      description: exp.highlights ? exp.highlights.join(' ') : '',
      achievements: exp.highlights || [],
      technologies: exp.technologies || [],
      // helper fields for sorting only (not in type)
      _sortStart: start,
      _sortEnd: isCurrent ? '9999-99' : (end || ''),
      _isCurrent: isCurrent
    } as any;
  })
  .sort((a: any, b: any) => {
    // Current first
    if (a._isCurrent && !b._isCurrent) return -1;
    if (!a._isCurrent && b._isCurrent) return 1;
    // Then by end desc
    if (a._sortEnd > b._sortEnd) return -1;
    if (a._sortEnd < b._sortEnd) return 1;
    // Then by start desc
    if (a._sortStart > b._sortStart) return -1;
    if (a._sortStart < b._sortStart) return 1;
    return 0;
  })
  .map((e: any) => {
    const { _sortStart, _sortEnd, _isCurrent, ...rest } = e;
    return rest as ProfessionalExperience;
  });

// Only current role; minimal fields
// (Intentionally showing full timeline by default; toggle in the component controls view.)

const projects: Project[] = portfolioData.projects.map((proj, index) => ({
  id: `proj-${index + 1}`,
  title: proj.title,
  description: proj.summary,
  technologies: proj.technologies || [],
  githubUrl: undefined,
  liveUrl: undefined,
  category: 'professional',
  featured: index < 6
}));

const certifications: Certification[] = [
  ...portfolioData.certifications.map((cert, index) => {
    const base = {
      id: `cert-${index + 1}`,
      name: cert.name,
      issuer: cert.issuer,
      date: cert.year?.toString() || "N/A",
      credentialId: undefined as string | undefined,
      credentialUrl: undefined as string | undefined,
      logoUrl: undefined as string | undefined
    };

    if (cert.name === 'Machine Learning Specialization Certificate') {
      return { ...base, credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/5J5E52V2TAB4' };
    }
    if (cert.name === 'Google Data Analytics Certificate') {
      return { ...base, credentialUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/FPNL5KFT6K6Y' };
    }
    if (cert.name === 'CrewAI Certification – Multi-Agent Systems') {
      return { ...base, credentialUrl: 'https://drive.google.com/file/d/1Y_nIehaJwhx5xKX46VKQiv530a-cp1VT/view' };
    }
    return base;
  }),
  {
    id: 'cert-alx-ds',
    name: 'Data Science',
    issuer: 'ALX Morocco',
    date: '2025',
    credentialId: undefined,
    credentialUrl: 'https://savanna.alxafrica.com/certificates/X56hyfJ9SN',
    logoUrl: undefined
  }
];

const skills: Skill[] = [
  {
    category: "AI & Machine Learning",
    skills: portfolioData.skills.ai_and_machine_learning
  },
  {
    category: "Natural Language Processing",
    skills: portfolioData.skills.natural_language_processing
  },
  {
    category: "Computer Vision",
    skills: portfolioData.skills.computer_vision
  },
  {
    category: "Data Science & Analytics",
    skills: portfolioData.skills.data_science_and_analytics
  },
  {
    category: "Data Engineering & Automation",
    skills: portfolioData.skills.data_engineering_and_automation
  },
  {
    category: "Multi-Agent Systems",
    skills: portfolioData.skills.multi_agent_systems
  },
  {
    category: "Software & Web Engineering",
    skills: portfolioData.skills.software_and_web_engineering
  },
  {
    category: "Languages",
    skills: (portfolioData.languages || []).map((l: any) => `${l.language} — ${l.proficiency}`)
  },
  {
    category: "Soft Skills",
    skills: portfolioData.skills.soft_skills
  },
  {
    category: "Tools & Frameworks",
    skills: portfolioData.skills.tools_and_frameworks
  }
];

const Portfolio: React.FC = () => {
  return (
    <Layout>
      <AboutMe personalInfo={personalInfo} />
      <Educations items={portfolioData.education} />
      <ProfessionalBackground experiences={allProfessionalExperiences} />
      <Services items={portfolioData.services || []} />
      <SkillsAndStrengths skills={skills} />
      <KeyProjects projects={projects} />
      <Certifications certifications={certifications} />
    </Layout>
  );
};

export default Portfolio;
