const { redirectDomain } = require('../../configs/keys')

const surveyTemplate = ({ body }) => `
  <html>
    <body>
      <div style="text-align: center">
        <h3>We want to hear from you!</h3>
        <p>Please answer the following question:</p>
        <p>${body}</p>
        <div>
          <a href="${redirectDomain}/surveys/thanks">Yes</a>
        </div>
        <div>
          <a href="${redirectDomain}/surveys/thanks">No</a>
        </div>
      </div>
    </body>
  </html>
`

module.exports = surveyTemplate