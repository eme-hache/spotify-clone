import { useState, useEffect } from 'react'

type RangeProps = {
  value: number
  min?: number | undefined
  max?: number | undefined
  onChange?: (value: number) => void // Cambié el tipo de la función para pasar el valor directamente
  onMouseUp?: (value: number) => void
}

const Range: React.FC<RangeProps> = ({ value, min = 0, max = 1, onChange, onMouseUp }) => {
  const [localValue, setLocalValue] = useState(value)

  // Actualiza localValue cuando cambia el valor prop
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const onChangeLocalValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(evt.target.value);
    setLocalValue(newValue); // Actualiza el estado local

    if (!onChange) return

    onChange(newValue); // Llama a la función onChange con el nuevo valor
  }
  const handleOnMouseUp = (evt: React.MouseEvent<HTMLInputElement>) => {
    const newValue = Number(evt.currentTarget.value)

    setLocalValue(newValue)

    if (!onMouseUp) return

    onMouseUp(newValue)
  }

  const progressWidth = (localValue / max) * 100

  return (
    <div className='w-full relative input-range group'>
      <input
        value={localValue} // Utiliza localValue en lugar de value
        onMouseUp={handleOnMouseUp}
        onChange={onChangeLocalValue}
        type='range'
        className='w-full block z-10'
        min={min}
        max={max}
        step='0.01'
      />

      <span
        style={{ width: `${progressWidth}%` }}
        className='absolute h-[4px] top-1/2 -translate-y-1/2 block group-hover:hidden bg-white rounded-full'
      />

      <span
        className='w-full h-[4px] absolute top-1/2 -z-[1] -translate-y-1/2 bg-playlist-progress rounded-full'
      >
        <span
          style={{ width: `${progressWidth}%` }}
          className='bg-bright-accent h-[4px] hidden group-hover:block absolute top-1/2 left-0 -translate-y-1/2 rounded-full thumb'
        />
      </span>
    </div>
  )
}

export default Range
