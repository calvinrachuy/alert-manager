import {Alert, AlertTitle} from '@mui/material'
import PropTypes from 'prop-types'
import {useEffect} from 'react'

function AlertComponent(props) {
  const {
    alertTitle,
    alertType = 'info',
    dismiss,
    id = crypto.randomUUID(),
    link,
    text,
    timeLimit = 10,
  } = props
  
  useEffect(() => {
    const timeoutID = setTimeout(dismiss, Number(timeLimit) * 1000)
    return () =>  clearTimeout(timeoutID)
  }, [])
  
  function handleClose(e) {
    e.preventDefault()
    dismiss()
  }
  
  return (
    <Alert
      component={link ? 'a' : 'div'}
      href={link || null}
      onClose={handleClose}
      severity={alertType}
      id={id}
      target={link ? '_blank' : null}
    >
      {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
      {text}
    </Alert>  
  )
}

AlertComponent.propTypes = {
  alertTitle: PropTypes.string,
  alertType: PropTypes.oneOf(['error','warning','info','success']),
  dismiss: PropTypes.func,
  id: PropTypes.string,
  link: PropTypes.string,
  text: PropTypes.string.isRequired,
  timeLimit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default AlertComponent