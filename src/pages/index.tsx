import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/intro">
            Get Started →
          </Link>
        </div>
      </div>
    </header>
  );
}

interface RepositoryCardProps {
  title: string;
  description: string;
  link: string;
  language: string;
}

function RepositoryCard({title, description, link, language}: RepositoryCardProps) {
  return (
    <div className="repo-card">
      <h3>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h3>
      <p className={styles.repoLanguage}>{language}</p>
      <p>{description}</p>
    </div>
  );
}

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureItem({icon, title, description}: FeatureItemProps) {
  return (
    <div className="feature-item">
      <div className={styles.featureIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`Home`}
      description="Unified documentation portal for all Superdesk repositories">
      <HomepageHeader />
      <main>
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What is Superdesk?</h2>
            <p className={styles.sectionDescription}>
              Superdesk is an open-source headless CMS designed for newsrooms, providing 
              end-to-end news creation, production, and publishing capabilities. It's a 
              comprehensive news management system that enables journalists and editors to 
              create, collaborate on, and publish news content across multiple channels.
            </p>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Key Features</h2>
            <div className="feature-grid">
              <FeatureItem
                icon="📝"
                title="Content Management"
                description="Create and manage articles, photos, videos, and multimedia packages with a rich text editor."
              />
              <FeatureItem
                icon="🔄"
                title="Workflow Engine"
                description="Flexible desk-based organization with stage-based workflow for content production."
              />
              <FeatureItem
                icon="🚀"
                title="Multi-channel Publishing"
                description="Publish content to multiple destinations with support for various output formats."
              />
              <FeatureItem
                icon="🔍"
                title="Advanced Search"
                description="Powerful search and filtering capabilities powered by Elasticsearch."
              />
              <FeatureItem
                icon="📅"
                title="Planning & Events"
                description="Event management, planning items, and assignment workflow with the Planning module."
              />
              <FeatureItem
                icon="🔌"
                title="Extensible Architecture"
                description="Plugin system for extending functionality with custom features and integrations."
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Repositories</h2>
            <p className={styles.sectionDescription}>
              Superdesk is organized into multiple repositories, each serving a specific purpose:
            </p>
            <div className={styles.repoGrid}>
              <RepositoryCard
                title="superdesk-core"
                language="Python"
                description="The backend REST API built with Flask/Eve, providing business logic, workflow management, and data persistence."
                link="https://github.com/superdesk/superdesk-core"
              />
              <RepositoryCard
                title="superdesk-client-core"
                language="TypeScript / React"
                description="The frontend user interface built with React and TypeScript, providing a rich editing experience."
                link="https://github.com/superdesk/superdesk-client-core"
              />
              <RepositoryCard
                title="superdesk-planning"
                language="Python / TypeScript"
                description="Planning and events module adding event management, planning items, and assignment workflows."
                link="https://github.com/superdesk/superdesk-planning"
              />
              <RepositoryCard
                title="superdesk"
                language="Docker / Configuration"
                description="Main deployment repository with Docker configurations and deployment scripts for easy setup."
                link="https://github.com/superdesk/superdesk"
              />
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Quick Links</h2>
            <div className={styles.quickLinks}>
              <Link to="/docs/getting-started/intro" className={styles.quickLink}>
                📖 Getting Started
              </Link>
              <Link to="/docs/getting-started/installation" className={styles.quickLink}>
                ⚙️ Installation Guide
              </Link>
              <Link to="/docs/developer-guide/architecture" className={styles.quickLink}>
                🏗️ Architecture
              </Link>
              <Link to="/docs/api" className={styles.quickLink}>
                🔌 API Reference
              </Link>
              <Link to="/docs/contributing" className={styles.quickLink}>
                🤝 Contributing
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Get Started</h2>
            <p className={styles.sectionDescription}>
              Ready to start using Superdesk? Follow our quick start guide to get up and running in minutes.
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/getting-started/quick-start">
                Quick Start Guide →
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="/docs/getting-started/installation">
                Full Installation →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
