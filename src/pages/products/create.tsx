import { CreateProductList } from '@/features/products/ui/create-product'
import { PageHead } from '@/shared/ui/page-head/page-head'

const CreateProduct = () => {
  return (
    <>
      <PageHead title="Создать Продукт" renderButton={null} />

      <CreateProductList />
    </>
  )
}

export default CreateProduct
