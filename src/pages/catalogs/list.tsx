import { CatalogsList } from "@/features/catalogs/ui/catalogs-list"
import { CreateCatalog } from "@/features/catalogs/ui/create-catalog"
import { PageHead } from "@/shared/ui/page-head/page-head"
import { Button } from "@mantine/core"
import { modals } from "@mantine/modals"

const CatalogsPage = () => {
  const handleCreate = () => {
    modals.open({
      title: 'Добавление каталога',
      children: <CreateCatalog />,
    })
  }

  return (
    <>
      <PageHead
        title="Каталоги"
        renderButton={<Button onClick={handleCreate}>Добавить</Button>}
      />

      <CatalogsList />
    </>
  )
}

export default CatalogsPage