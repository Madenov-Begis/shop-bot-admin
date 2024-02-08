import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'

import { CreateLanguage } from '@/features/languages/ui/create-language'
import { LanguagesList } from '@/features/languages/ui/languages-list'
import { PageHead } from '@/shared/ui/page-head/page-head'

const LanguagesPage = () => {
  const handleCreate = () => {
    modals.open({
      title: 'Добавление языка',
      children: <CreateLanguage />,
    })
  }

  return (
    <>
      <PageHead
        title="Языки"
        renderButton={<Button onClick={handleCreate}>Добавить</Button>}
      />

      <LanguagesList />
    </>
  )
}

export default LanguagesPage
