import React, { useState } from 'react'

import { parseTimeRemaining } from './utils/time'
import { TimeSplit } from './typings/global'
import { useCssHandles } from 'vtex.css-handles'

const ONE_SECOND_IN_MILLIS = 1000
const CSS_HANDLES = ['countdown'] as const

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({
  targetDate,
}) => {
  const [timeRemaining, setTime] = useState<TimeSplit>({
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  const handles = useCssHandles(CSS_HANDLES)

  tick(targetDate, setTime)

  return (
    <div
      className={`${handles.countdown} t-heading-2 fw3 w-100 pt7 pb6 c-muted-1 db tc`}
    >
      {`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
    </div>
  )
}

const tick = (
  targetDate: string,
  dispatchFn: React.Dispatch<React.SetStateAction<TimeSplit>>
) => {
  let finalDate = new Date(targetDate)
  let now = new Date()

  let secondsLeft = (finalDate.getTime() - now.getTime()) / ONE_SECOND_IN_MILLIS

  setTimeout(() => {
    dispatchFn(parseTimeRemaining(secondsLeft))
  }, ONE_SECOND_IN_MILLIS)
}

interface CountdownProps {
  targetDate: string
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    autoplay: {
      type: 'object',
      isLayout: true,
      properties: {
        timeout: {
          type: 'number',
        },
        stopOnHover: {
          type: 'boolean',
        },
      },
    },
    arrayBolado: {
      title: 'Array Bolado',
      description: 'Sou muito bolado mesmo',
      type: 'array',
      items: {
        frutinhas: {
          type: 'object',
          isLayout: true,
          properties: {
            umbu: {
              type: 'string',
            },
            banana: {
              type: 'boolean',
            },
          },
        },
      },
    },
    targetDate: {
      title: 'editor.countdown.targetDate.title',
      description: 'editor.countdown.targetDate.description',
      type: 'string',
      default: null,
    },
  },
}

export default Countdown
