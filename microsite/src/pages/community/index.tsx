import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { BannerSection } from '@site/src/components/bannerSection/bannerSection';
import { BannerSectionGrid } from '@site/src/components/bannerSection/bannerSectionGrid';
import Layout from '@theme/Layout';
import { clsx } from 'clsx';
import React from 'react';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

import { ContentBlock } from '../../components/contentBlock/contentBlock';
import communityStyles from './community.module.scss';

interface ICollectionItem {
  title?: string;
  content: React.ReactNode;
  label: string;
  link: string;
}

const Community = () => {
  const { siteConfig } = useDocusaurusContext();

  //#region Collection Data
  const communityListItems: ICollectionItem[] = [
    {
      content: 'Chat and get support on our',
      label: 'Discord',
      link: 'https://discord.gg/backstage-687207715902193673',
    },
    {
      content: 'Get into contributing with the',
      label: 'Good First Issues',
      link: 'https://github.com/backstage/backstage/contribute',
    },
    {
      content: 'Subscribe to the',
      label: 'Community Newsletter',
      link: 'https://info.backstage.spotify.com/newsletter_subscribe',
    },
  ];

  const officialInitiatives: ICollectionItem[] = [
    {
      title: 'Community Sessions',
      content:
        'Maintainers and adopters meet monthly to share updates, demos, and ideas. You can find recorded session on our YouTube channel!',
      link: 'https://github.com/backstage/community/tree/main/backstage-community-sessions#backstage-community-sessions',
      label: 'Join a session',
    },
    {
      title: 'Newsletter',
      content:
        "The official monthly Backstage newsletter. Don't miss the latest news from your favorite project!",
      link: 'https://info.backstage.spotify.com/newsletter_subscribe',
      label: 'Subscribe',
    },
  ];

  const trainingNCertifications: ICollectionItem[] = [
    {
      title: 'Introduction to Backstage: Developer Portals Made Easy (LFS142x)',
      content:
        'This is a course produced and curated by the Linux Foundation. This course introduces you to Backstage and how to get started with the project.',
      link: 'https://training.linuxfoundation.org/training/introduction-to-backstage-developer-portals-made-easy-lfs142x/',
      label: 'Learn more',
    },
    {
      title: 'Certified Backstage Associate (CBA)',
      content:
        'Designed for IT engineers, developers, platform engineers, and other IT professionals, the CBA proves you have the skills and the mindset to work with Backstage.',
      link: 'https://www.cncf.io/training/certification/cba/',
      label: 'Learn more',
    },
    {
      title: 'KodeKloud Certified Backstage Associate Course',
      content:
        'KodeKloud offers an interactive course with hands-on labs to prepare you for the Certified Backstage Associate exam. Perfect for practical learners who want to gain real-world Backstage skills.',
      link: 'https://learn.kodekloud.com/user/courses?search=backstage',
      label: 'Learn more',
    },
  ];

  const partners: { name: string; url: string; logo: string }[] = [
    {
      name: 'Frontside Software',
      url: 'https://frontside.com/backstage/',
      logo: 'img/partner-logo-frontside',
    },
    {
      name: 'RedHat',
      url: 'https://developers.redhat.com/rhdh',
      logo: 'img/partner-logo-redhat',
    },
    {
      name: 'Roadie',
      url: 'https://roadie.io/',
      logo: 'img/partner-logo-roadie',
    },
    {
      name: 'solo.io',
      url: 'https://www.solo.io/spotlight/',
      logo: 'img/partner-logo-solo',
    },
    {
      name: 'ThoughtWorks',
      url: 'https://www.thoughtworks.com/about-us/partnerships/technology/backstage-by-spotify',
      logo: 'img/partner-logo-thoughtworks',
    },
    {
      name: 'VMWare',
      url: 'https://tanzu.vmware.com/developer-portal',
      logo: 'img/partner-logo-tanzubybroadcom',
    },
    {
      name: 'StatusNeo',
      url: 'https://statusneo.com/backstage',
      logo: 'img/partner-logo-statusneo',
    },
    {
      name: 'Alauda',
      url: 'https://www.alauda.io/community/169249',
      logo: 'img/partner-logo-alauda',
    },
    {
      name: 'Liatrio',
      url: 'https://www.liatrio.com/service-offerings/backstage',
      logo: 'img/partner-logo-liatrio',
    },
  ];
  //#endregion

  return (
    <Layout>
      <div className={clsx(communityStyles.communityPage)}>
        <BannerSection diagonalBottomBorder greyBackground>
          <BannerSectionGrid>
            <ContentBlock
              className="padding-right--xl"
              title={<h1>Backstage Community</h1>}
            >
              Join the vibrant community around Backstage through social media
              and different meetups. To ensure that you have a welcoming
              environment, we follow the{' '}
              <Link to="https://github.com/cncf/foundation/blob/master/code-of-conduct.md">
                CNCF Code of Conduct
              </Link>{' '}
              in everything we do.
            </ContentBlock>

            <ContentBlock
              className={clsx(
                'padding-left--xl',
                communityStyles.listContainer,
              )}
              title="Get started in our community!"
            >
              <ul>
                {communityListItems.map(
                  ({ content: text, link, label }, index) => (
                    <li key={index}>
                      <p className="margin-bottom--none">
                        {text} <Link to={link}>{label}</Link>
                      </p>
                    </li>
                  ),
                )}
              </ul>
            </ContentBlock>
          </BannerSectionGrid>
        </BannerSection>

        <BannerSection diagonalBorder greenBottomGradientBackground>
          <BannerSectionGrid
            header={
              <>
                <h2 className="text--primary">
                  Official Backstage Initiatives
                </h2>

                <h1>Stay tuned to the latest developments</h1>
              </>
            }
          >
            {officialInitiatives.map(
              ({ title, content, link, label }, index) => (
                <ContentBlock
                  key={index}
                  title={title}
                  hasBulletLine
                  actionButtons={[
                    {
                      link,
                      label,
                    },
                  ]}
                >
                  {content}
                </ContentBlock>
              ),
            )}
          </BannerSectionGrid>
        </BannerSection>

        <BannerSection diagonalBorder>
          <BannerSectionGrid
            header={
              <h2 className="text--primary">Trainings and Certifications</h2>
            }
          >
            {trainingNCertifications.map(
              ({ title, content, link, label }, index) => (
                <ContentBlock
                  key={index}
                  title={title}
                  hasBulletLine
                  actionButtons={[
                    {
                      link,
                      label,
                    },
                  ]}
                >
                  <p>{content}</p>
                </ContentBlock>
              ),
            )}
          </BannerSectionGrid>
        </BannerSection>

        <BannerSection greyBackground>
          <BannerSectionGrid
            header={<h2 className="text--primary">Commercial Partners</h2>}
          >
            {partners.map(({ name, url, logo }, index) => (
              <div key={index}>
                <Link to={url}>
                  <ThemedImage
                    alt={name}
                    sources={{
                      light: useBaseUrl(`${siteConfig.baseUrl}${logo}-blk.png`),
                      dark: useBaseUrl(`${siteConfig.baseUrl}${logo}.png`),
                    }}
                  />
                </Link>
              </div>
            ))}
          </BannerSectionGrid>
        </BannerSection>
      </div>
    </Layout>
  );
};

export default Community;
