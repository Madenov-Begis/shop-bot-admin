import { UpdateProduct } from '@/features/products/ui/update-product'
import { PageHead } from '@/shared/ui/page-head/page-head'

const UpdateProductPage = () => {
  return (
    <>
      <PageHead title="Редактирование" renderButton={null} />

      <UpdateProduct />
    </>
  )
}

export default UpdateProductPage
