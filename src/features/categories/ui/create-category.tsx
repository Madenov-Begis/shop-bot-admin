import { modals } from "@mantine/modals"
import { useCreateCategory } from "../queries/category-queries"
import { CategoryBody } from "../types/category"
import { ErrorAlert } from "@/shared/ui/error-alert/error-alert"
import { CategoryForm } from "./category-form"

export const CreateCategory = () => {
  const createMutation = useCreateCategory()

  const handleSubmit = async (body: CategoryBody) => {
    try {
      await createMutation.mutateAsync(body)
      modals.closeAll()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <>
      {createMutation.isError && !createMutation.error.errors && (
        <ErrorAlert message={createMutation.error.message} mb="md" />
      )}

      <CategoryForm
        submitFn={handleSubmit}
        loading={createMutation.isPending}
        submitTitle="Добавить"
      />
    </>
  )
}
