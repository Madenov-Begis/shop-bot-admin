import { CreateProductLanguage } from '@/features/product-languages/ui/create-product-language'
import { ProductLanguagesList } from '@/features/product-languages/ui/product-languages-list'
import { PageHead } from '@/shared/ui/page-head/page-head'
import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'

const ProductLanguages = () => {
  const handleCreate = () => {
    modals.open({
      title: 'Добавить язык продукта',
      children: <CreateProductLanguage />,
    })
  }

  return (
    <>
      <PageHead
        title="Язык продукта"
        renderButton={<Button onClick={handleCreate}>Добавить</Button>}
      />

      <ProductLanguagesList />
    </>
  )
}

export default ProductLanguages
