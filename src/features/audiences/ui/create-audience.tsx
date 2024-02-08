import { Button } from '@mantine/core'
import { AudineceForm } from './audinece-form'
import { modals } from '@mantine/modals'
import { useCreateAudience } from '../queries/audiences-queries'
import { AudienceBody } from '../types/audience'

export const CreateAudience = () => {
  const create = useCreateAudience()

  const submitFunc = async (data: AudienceBody) => {
    try {
      await create.mutateAsync(data)

      modals.closeAll()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <>
      <Button
        onClick={() =>
          modals.open({
            children: <AudineceForm submitFunc={submitFunc} />,
          })
        }
      >
        Добавить
      </Button>
    </>
  )
}
