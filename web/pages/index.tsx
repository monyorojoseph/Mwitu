import HeroSection from '@/components/Hero/HeroSection';
import MainPreview from '@/components/Sites/MainPreview';
import Layout from '@/components/Layout/Layout';

export default function Home() {
  return (
    <Layout>
      <>
        <HeroSection />
        <MainPreview />
      </>
    </Layout>
  )
}