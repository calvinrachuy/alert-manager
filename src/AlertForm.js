import PropTypes from 'prop-types'
import {useReducer} from 'react'

const initialState = {
  alertTitle: '',
  alertType: 'info',
  id: crypto.randomUUID(),
  link: '',
  text: 'some text',
  timeLimit: 10,
}

function reducer(state = initialState, {type, payload}) {
  switch(type) {
  case 'setField': {
    const {key, value} = payload
    return {...state, [key]: value}
  }
  case 'reset':
    return {...initialState, id: crypto.randomUUID()}
  default:
    return state
  }
}

function AlertForm({onSubmit}) {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(state)
    dispatch({type: 'reset'})
  }
  
  function setField(key, value) {
    dispatch({type: 'setField', payload: {key, value}})
  }
  
  function getInputEntries() {
    return Object.entries(state).filter(([key, value]) => key !== 'alertType')
  }
  
  return (
    <form onSubmit={handleSubmit}>
      
      <div className='form-row'>
        <label htmlFor='alertType'>Choose an alertType</label>
        <select id='alertType' name='alertType' value={state.alertType} onChange={e => setField('alertType', e.target.value)}>
          <option value='info'>info</option>
          <option value='success'>success</option>
          <option value='warning'>warning</option>
          <option value='error'>error</option>
        </select>
      </div>
      
      {getInputEntries().map(([key, value]) => (
        <div key={key} className='form-row'>
          <label htmlFor={key}>{key}:</label>
          <input id={key} name={key} placeholder={key} value={value} onChange={e => setField(key, e.target.value)} />
        </div>
      ))}
    
      <button type='submit'>Create Alert</button>
    </form>
  )
}

AlertForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default AlertForm