import { modals } from "@mantine/modals"
import { useCreateCompany } from "../queries/company-queries"
import { CompanyBody } from "../types/company"
import { ErrorAlert } from "@/shared/ui/error-alert/error-alert"
import { CompanyForm } from "./company-form"

export const CreateCompany = () => {
  const createMutation = useCreateCompany()

  const handleSubmit = async (body: CompanyBody) => {
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

      <CompanyForm
        submitFn={handleSubmit}
        loading={createMutation.isPending}
        submitTitle="Добавить"
      />
    </>
  )
}
