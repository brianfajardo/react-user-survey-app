// emailregex.com

const validateEmails = (emails) => {

  const regularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    // Capture/return the array of emails that fail the RegEx test.
    .filter(email => regularExpression.test(email) === false)

  if (invalidEmails.length) {
    return `Invalid emails: ${invalidEmails}`
  }

  return null
}

export default validateEmails