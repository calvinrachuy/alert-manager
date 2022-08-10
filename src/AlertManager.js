import {useReducer} from 'react'
import AlertComponent from './AlertComponent'
import AlertForm from './AlertForm'

const initialState = {
  success: {
    id: 'success',
    text: 'This success will dismiss in 3 seconds!',
    timeLimit: 3,
    alertType: 'success',
  },
  warning: {
    id: 'warning',
    text: 'This warning will dismiss in 4 seconds',
    timeLimit: 4,
    alertType: 'warning',
  },
  error: {
    id: 'error',
    text: 'This error will dismiss in 5 seconds!',
    timeLimit: 5,
    alertType: 'error',
  },
  default: {
    id: 'default',
    text: 'This default info alert will dismiss in 10 seconds',
  },
  title: {
    id: 'title',
    text: 'This alert has a title',
    alertTitle: 'Title',
    timeLimit: 12,
  },
  'internal-link': {
    id: 'internal-link',
    link: '/status',
    text: 'This is an internal link to /status',
    alertType: 'warning',
    timeLimit: 120,
  },
  'external-link': {
    id: 'external-link',
    link: 'https://www.google.com',
    text: 'This is an external link to https://www.google.com',
    alertType: 'success',
    alertTitle: 'Google',
    timeLimit: 120,
  },
}

function reducer(state = initialState, {type, payload}) {
  let {id} = payload
  switch(type) {
  case 'add': {
    id = id || crypto.randomUUID()
    return {...state, [id]: {...payload, id}}
  }
  case 'remove': {
    const newState = {...state}
    delete newState[id]
    return newState
  }
  default:
    return state
  }
}

export function useAlertReducer() {
  return useReducer(reducer, initialState)
}

function AlertManager() {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  function add(alert) {
    dispatch({type: 'add', payload: alert})
  }
  
  function remove(id) {
    dispatch({type: 'remove', payload: {id}})
  }
  
  function getAlerts() {
    return Object.values(state)
  }
  
  return (
    <div className='alert-manager'>
      <AlertForm onSubmit={add} />
      <div className='alert-list'>
        {getAlerts().map(alert => (
          <AlertComponent key={alert.id} dismiss={() => remove(alert.id)} {...alert} />
        ))}
      </div>
    </div>
  )
}

export default AlertManager