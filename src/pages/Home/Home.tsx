import React from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { Achievements } from '@/pages/Home/Achievements';
import { AboutMe } from './AboutMe';
import { Journey } from '@/pages/Home/Journey';
import { Section } from '@/components/Section';
import { milestones } from '@/constants/milestones';
import { Skills } from '@/pages/Home/Skills';
import { skills } from '@/constants/skills';
import { Comparison } from '@/pages/Home/Comparison';
import { Projects } from '@/pages/Home/Projects';
// import { Testimonials } from '@/pages/Home/Testimonials';
import { FAQ } from '@/pages/Home/FAQ';
import { Contact } from '@/pages/Home/Contact';
import { Footer } from '@/pages/Home/Footer';
import styles from './Home.module.scss';

export const Home: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <Header />

      <Hero />

      <Achievements>
        <Achievements.Key metric='15+' detail='Successful projects delivered' />
        <Achievements.Key metric='90%' detail='User satisfaction rate' />
        <Achievements.Key metric='100%' detail='Perfection in every detail' />
      </Achievements>

      <AboutMe />

      <Section
        title='My Professional Journey'
        subtitle='A visual timeline of key milestones and experiences from over the years.'
        containerWidth={1440}
      >
        <Journey>
          <Journey.Main>
            <Journey.Timeline />
            <Journey.Cards>
              {milestones.map((milestone, index) => (
                <Journey.Card key={index} {...milestone} />
              ))}
            </Journey.Cards>
          </Journey.Main>
          <Journey.Navigation />
        </Journey>
      </Section>

      <Section
        title='My Core Skills'
        subtitle='An overview of the key technologies and frameworks I specialize in'
        id='skills'
      >
        <Skills>
          {skills.map((skills, index) => (
            <Skills.Item
              key={index}
              title={skills.title}
              description={skills.description}
              proficiency={skills.proficiency}
            />
          ))}
        </Skills>
      </Section>

      <Section
        title='What Sets Me Apart'
        subtitle='A comparison of my approach and skills against typical programmers.'
      >
        <Comparison />
      </Section>

      <Section
        title='Crafted with Code'
        subtitle='Explore the web solutions I’ve developed, combining sleek design with powerful functionality.'
        id='projects'
      >
        <Projects />
      </Section>

      {/* <Section
        title='What People Say About Me'
        subtitle='Hear from clients and colleagues about their experiences working with me.'
      >
        <Testimonials />
      </Section> */}

      <Section
        title='Your Questions, Answered'
        subtitle='Find answers to some of the frequently asked questions below.'
        id='faq'
      >
        <FAQ>
          <FAQ.Item
            title='What’s your approach to front-end development?'
            description='I emphasize building scalable and maintainable front-end architectures while ensuring pixel-perfect implementation and seamless user interactions.'
          />
          <FAQ.Item
            title='How do you ensure your code is maintainable?'
            description='I follow modern best practices like modular design, reusable components, and consistent styling frameworks to ensure long-term maintainability and scalability.'
          />
          <FAQ.Item
            title='Which technologies do you specialize in?'
            description='I specialize in React, TypeScript, and modern CSS methodologies like Tailwind CSS and SCSS. I also have experience with server using tRPC and database using Supabase.'
          />
          <FAQ.Item
            title='How do you optimize front-end performance?'
            description='I implement strategies like lazy loading, code splitting, and minimizing bundle size while optimizing critical rendering paths for fast and smooth user experiences.'
          />
          <FAQ.Item
            title='What’s your process for collaborating with teams?'
            description='I believe in clear communication and collaboration using tools like Figma, Jira, and Git. I ensure alignment with designers, back-end developers, and stakeholders to deliver exceptional results.'
          />
        </FAQ>
      </Section>

      <Section
        title='Let’s Get in Touch'
        subtitle='Feel free to drop a message for any inquiries or collaborations.'
        id='contact'
        overflowHidden
      >
        <Contact />
      </Section>

      <Footer />
    </div>
  );
};
