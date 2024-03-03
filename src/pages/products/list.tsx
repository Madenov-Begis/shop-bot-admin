import { ProductsList } from '@/features/products/ui/products-list'
import { PageHead } from '@/shared/ui/page-head/page-head'
import { Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

const ProductPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <PageHead
        title="Продукты"
        renderButton={
          <Button onClick={() => navigate('create')}>Создать</Button>
        }
      />

      <ProductsList />
    </>
  )
}

export default ProductPage
