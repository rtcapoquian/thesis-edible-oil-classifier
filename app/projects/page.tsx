import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  category: string;
}

const projectData: Project[] = [
  {
    title: "Social Media App",
    description: "Built with Next.js, Firebase, and Tailwind CSS",
    thumbnail:
      "https://st2.depositphotos.com/3591429/5246/i/450/depositphotos_52467161-stock-photo-business-people-with-social-media.jpg",
    link: "https://example.com/social-media-app",
    category: "Web Development",
  },
  {
    title: "E-commerce App",
    description: "Built with React.js, Node.js, and MongoDB",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69XMbjTCvxA-P5sunL0w4CUb3dNuQf1mjeA&s",
    link: "https://example.com/e-commerce-app",
    category: "Full Stack",
  },
  {
    title: "Portfolio Website",
    description: "Developed using Gatsby and GraphQL",
    thumbnail:
      "https://uploads.sitepoint.com/wp-content/uploads/2019/04/155530806117.jpg",
    link: "https://example.com/portfolio-website",
    category: "Web Development",
  },
  {
    title: "Task Management Tool",
    description: "Created with Angular and Firebase",
    thumbnail: "https://plaky.com/assets/images/web-assets/single-project.png",
    link: "https://example.com/task-manager",
    category: "Productivity",
  },
  {
    title: "Weather App",
    description: "Built using Vue.js and OpenWeather API",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:3588/1*tRUq9FQeOwBUpHNsPXrzPQ.png",
    link: "https://example.com/weather-app",
    category: "Web Development",
  },
  {
    title: "Chat Application",
    description: "Real-time chat built with Socket.io and Express.js",
    thumbnail:
      "https://www.yabb.com/blog/wp-content/uploads/2019/06/Chat-Apps-2019.jpg",
    link: "https://example.com/chat-app",
    category: "Full Stack",
  },
  {
    title: "New Full Stack Project",
    description: "Built with MERN stack",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:850/1*0MSCBaIfPnNuZKq3kpisxA.jpeg",
    link: "https://example.com/new-full-stack-project",
    category: "Full Stack",
  },
  {
    title: "New Productivity Tool",
    description: "Created with React and Firebase",
    thumbnail:
      "https://www.inflectra.com/GraphicsViewer.aspx?url=~/Ideas/Topics/Understanding-Task-Management-Software.doc&name=wordml://03000002.png",
    link: "https://example.com/new-productivity-tool",
    category: "Productivity",
  },
  {
    title: "Another Productivity App",
    description: "Built using Python and Flask",
    thumbnail:
      "https://www.zohowebstatic.com/sites/zweb/images/projects/seo/what-is-task-management-software-2x.jpg",
    link: "https://example.com/another-productivity-app",
    category: "Productivity",
  },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <Card className="h-80 flex flex-col">
    <CardHeader className="flex-none">
      <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow overflow-hidden">
      <img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-32 object-cover mb-4"
      />
      <p className="text-sm leading-5">{project.description}</p>
    </CardContent>
    <div className="flex-none mt-auto pb-4 flex justify-between">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline px-4 py-2"
      >
        View Project
      </a>
      <a
        href={`https://github.com/rtcapoquian/${project.title}`} // Replace with actual code repo links
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline px-4 py-2"
      >
        View Code
      </a>
    </div>
  </Card>
);

const Projects: React.FC = () => {
  const categories = Array.from(
    new Set(projectData.map((project) => project.category))
  );

  return (
    <div className="container mt-8">
      <h3 className="scroll-m-20 border-b pb-4 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Featured Projects
      </h3>
      <p className="leading-7 mt-4">
        Here are a few of my key projects. Click on a project to see more
        details. If you want to view the full functionality,{" "}
        <a
          href="http://localhost:3000/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          contact me
        </a>
        .
      </p>

      {categories.map((category) => (
        <div key={category}>
          <h4 className="text-2xl font-medium mt-8">{category}</h4>
          <div className="flex flex-wrap mt-4 -mx-4">
            {projectData
              .filter((project) => project.category === category)
              .map((project, index) => (
                <div
                  key={`${project.title}-${project.category}-${index}`}
                  className="w-full md:w-1/3 p-4"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
