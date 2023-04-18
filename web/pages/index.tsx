import HeroSection from '@/components/Hero/HeroSection';
import MainPreview from '@/components/Sites/MainPreview';
import Layout from '@/components/Layout/Layout';
import { SitesContextProvider } from '@/hooks/contexts/sitesContext';

export default function Home() {
  return (
    <>
      <SitesContextProvider>
        <Layout>
          <>
            <HeroSection />
            <MainPreview />
          </>
        </Layout>
      </SitesContextProvider>
    </>
  )
}