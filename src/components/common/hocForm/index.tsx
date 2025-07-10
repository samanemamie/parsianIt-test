import { Button } from '@/components/ui/button/Button'
import { default as InputOriginal } from '@/components/ui/input/Input'
import { SelectTrigger as SelectTriggerOriginal } from '@/components/ui/select/Select'

import { withFormState } from '@/lib'

export const EnhancedInput = withFormState(InputOriginal)
export const EnhancedSelectTrigger = withFormState(SelectTriggerOriginal)

export const EnhancedButton = withFormState(Button)
