import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { Center, Loader } from '@mantine/core'
import { useFetchProduct, useUpdateProduct } from '../queries/products-queries'
import { ProductBody } from '../types/products'
import { ProductForm } from './product-from'
import { FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UseFormReturnType } from '@mantine/form'

export const UpdateProduct = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const {
    data: product,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useFetchProduct(id)

  const updateMutation = useUpdateProduct()

  const handleSubmit = async ({
    data,
    event,
  }: {
    data: ProductBody
    event?: FormEvent<HTMLFormElement>
  }) => {
    const formData = new FormData(event?.currentTarget)

    if (typeof data.image[0] !== 'string') formData.set('image', data.image[0])

    formData.set('status', data.status ? '1' : '0')

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      await updateMutation.mutateAsync({ id, body: formData })
      navigate('/products')
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const handleDelete = ({
    form,
    index,
  }: {
    form: UseFormReturnType<ProductBody, (values: ProductBody) => ProductBody>
    index: number
  }) => {
    form.removeListItem('image', index)
  }

  return (
    <>
      {isError && <ErrorAlert message={error.message} />}

      {isFetching && (
        <Center>
          <Loader />
        </Center>
      )}

      {isSuccess && !isFetching && (
        <>
          {updateMutation.isError && !updateMutation.error.message && (
            <ErrorAlert message={updateMutation.error.message} mb="md" />
          )}

          <ProductForm
            initialValues={{
              description: product.description,
              category_id: String(product.category_d),
              image: [product.image],
              price: product.price,
              title: product.title,
              status: Boolean(product.status),
            }}
            submitFn={handleSubmit}
            loading={updateMutation.isPending}
            submitTitle="Сохранить"
            handleDelete={handleDelete}
          />
        </>
      )}
    </>
  )
}
