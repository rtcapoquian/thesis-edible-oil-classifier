import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faPlane,
  faBook,
  faBriefcase,
  faCertificate,
  faGamepad,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";
import { faJs, faReact, faNodeJs } from "@fortawesome/free-brands-svg-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = {
  educationalBackground: [
    {
      degree: "Bachelor of Science",
      field: "Computer Engineering",
      institution: "Mapúa University",
      year: "2025",
    },
  ],
  certificates: [
    {
      name: "Azure Administrator Associate",
      institution: "Microsoft",
      year: "2024",
    },
  ],
  projects: [
    {
      title: "Social Media App",
      description: "nextjs, firebase, tailwindcss",
      year: "2024",
    },
    {
      title: "E-commerce App",
      description: "reactjs, nodejs, mongodb",
      year: "2025",
    },
  ],
  coreSkills: [
    { skill: "JavaScript", icon: faJs },
    { skill: "React", icon: faReact },
    { skill: "Node.js", icon: faNodeJs },
  ],
  personalInterests: [
    { interest: "Traveling", icon: faPlane },
    { interest: "Gaming", icon: faGamepad },
    { interest: "Movies", icon: faFilm },
  ],
  experience: [
    {
      position: "Software Engineer",
      company: "Tech Solutions Inc.",
      year: "2021 - Present",
    },
    {
      position: "Web Developer",
      company: "Creative Minds",
      year: "2019 - 2021",
    },
  ],
};

const About = () => {
  return (
    <div>
      <section id="about" className="about">
        <div className="container">
          <div className="mt-8">
            <h3 className="scroll-m-20 border-b pb-4 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Full Stack Developer
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-4">
              Passionate developer with a strong focus on building efficient and
              scalable applications.
            </p>
            <div className="mt-4 flex flex-wrap">
              <div className="w-full md:w-1/2">
                <ul>
                  <li>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      <strong>Birthday:</strong> July 2005
                    </p>
                  </li>
                  <li>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      <strong>Website:</strong> www.rejicode.com
                    </p>
                  </li>
                  <li>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      <strong>Phone:</strong> 0928 050 5659
                    </p>
                  </li>
                  <li>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      <strong>City:</strong> Manila, Philippines
                    </p>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2">
                <ul>
                  <li>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      <strong>Age:</strong> 19
                    </p>
                  </li>
                  <li>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      <strong>Degree:</strong> Bachelor
                    </p>
                  </li>
                  <li>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      <strong>Email:</strong> rejicapoquian81@gmail.com
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap">
              <div className="w-full md:w-1/3 p-4">
                <Card className="h-64">
                  {" "}
                  {/* Set a fixed height for cards */}
                  <CardHeader>
                    <CardTitle>Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      {data.experience.map((job, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full mr-2">
                            <FontAwesomeIcon
                              icon={faBriefcase}
                              className="text-xl text-gray-800"
                            />
                          </div>
                          <p className="leading-7 [&:not(:first-child)]:mt-6">
                            <strong>{job.position}</strong> at {job.company} -{" "}
                            {job.year}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="w-full md:w-1/3 p-4">
                <Card className="h-64">
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      {data.educationalBackground.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full mr-2">
                            <FontAwesomeIcon
                              icon={faGraduationCap}
                              className="text-xl text-gray-800"
                            />
                          </div>
                          <p className="leading-7 [&:not(:first-child)]:mt-6">
                            <strong>{item.degree}</strong> in {item.field} -{" "}
                            {item.institution}, {item.year}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="w-full md:w-1/3 p-4">
                <Card className="h-64">
                  <CardHeader>
                    <CardTitle>Certificates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      {data.certificates.map((certificate, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full mr-2">
                            <FontAwesomeIcon
                              icon={faCertificate}
                              className="text-xl text-gray-800"
                            />
                          </div>
                          <p className="leading-7 [&:not(:first-child)]:mt-6">
                            <strong>{certificate.name}</strong> from{" "}
                            {certificate.institution}, {certificate.year}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="w-full md:w-1/3 p-4">
                <Card className="h-64">
                  <CardHeader>
                    <CardTitle>Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      {data.projects.map((project, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full mr-2">
                            <FontAwesomeIcon
                              icon={faBriefcase}
                              className="text-xl text-gray-800"
                            />
                          </div>
                          <p className="leading-7 [&:not(:first-child)]:mt-6">
                            <strong>{project.title}</strong>:{" "}
                            {project.description} - {project.year}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="w-full md:w-1/3 p-4">
                <Card className="h-64">
                  <CardHeader>
                    <CardTitle>Core Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      {data.coreSkills.map((skill, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full mr-2">
                            <FontAwesomeIcon
                              icon={skill.icon}
                              className="text-xl text-gray-800"
                            />
                          </div>
                          <p className="leading-7 [&:not(:first-child)]:mt-6">
                            {skill.skill}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="w-full md:w-1/3 p-4">
                <Card className="h-64">
                  <CardHeader>
                    <CardTitle>Personal Interests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      {data.personalInterests.map((interest, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full mr-2">
                            <FontAwesomeIcon
                              icon={interest.icon}
                              className="text-xl text-gray-800"
                            />
                          </div>
                          <p className="leading-7 [&:not(:first-child)]:mt-6">
                            {interest.interest}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
