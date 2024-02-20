import { CreateProductList } from '@/features/products/ui/create-product'
import { PageHead } from '@/shared/ui/page-head/page-head'

const CreateProduct = () => {
  return (
    <>
      <PageHead title="Создание продукта" renderButton={null} />

      <CreateProductList />
    </>
  )
}

export default CreateProduct
