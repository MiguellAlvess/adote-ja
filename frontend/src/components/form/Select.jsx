import './Select.css'

const Select = ({text, name, options, handleOnChange, value}) => {
  return (
    <div className='form-control'>
        <label htmlFor={name}>{text}:</label>
        <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
            <option>Selecione uma opção</option>
            {options.map((option) => (
                <option value={option} key ={option}>{option}</option>
            ))}
        </select>
    </div>
  )
}

export default Select
