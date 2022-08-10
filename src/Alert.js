export default class Alert {
  constructor({
    alertTitle = '',
    alertType = 'info',
    id = crypto.randomUUID(),
    link = '',
    text,
    timeLimit = '',
  }) {
    this.alertTitle = alertTitle
    this.alertType = alertType
    this.id = id
    this.link = link
    this.text = text
    this.timeLimit = timeLimit
  }
}