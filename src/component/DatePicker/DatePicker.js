import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
export default function DatePicker() {
    const [selected,setSelected] = useState()
  return (
    <DayPicker
    mode="single"
    selected={selected}
    onSelect={setSelected}
  />
  )
}
