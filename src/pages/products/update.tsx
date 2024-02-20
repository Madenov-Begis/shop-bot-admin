import { UpdateProduct } from '@/features/products/ui/update-product'
import { PageHead } from '@/shared/ui/page-head/page-head'

const Update = () => {
  return (
    <>
      <PageHead title="Редактирование продукта" renderButton={null} />

      <UpdateProduct />
    </>
  )
}

export default Update
