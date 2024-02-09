import { CreateAudience } from '@/features/audiences/ui/create-audience'
import { PageHead } from '@/shared/ui/page-head/page-head'

import { AudienceList } from '@/features/audiences/ui/audience-list'

const AudiencesPage = () => {
  return (
    <>
      <PageHead
        title="Возрастное ограничение"
        renderButton={<CreateAudience />}
      />

      <AudienceList />
    </>
  )
}

export default AudiencesPage
