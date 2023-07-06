import Layout from '@/components/Layout/Layout';
import ListSites from '@/components/Sites/ListSites';
import Recent from '@/components/Sites/Recent';
import { ContentTypes } from '@/constants/types';
import { useSitesContext } from '@/hooks/contexts/sitesContext';

export default function Home() {
  const { content } = useSitesContext()
  return (
      <Layout>
        <>
          { content === ContentTypes.RECENT && <Recent />}
          { content === ContentTypes.CATEGORY && <ListSites />}          

        </>
      </Layout>
  )
}