export async function SchleuderResendEnc() {
    let { plainTextBody } = await this.compose.getComposeDetails()

    let resentLines = plainTextBody.match(/Resent: (.*)\n/)
    let fromLines = plainTextBody.match(/From: .*\n/g)
    let toLines = plainTextBody.match(/To: .*\n/g)
    let ccLines = plainTextBody.match(/Cc: .*\n/g)

    let headerLines = []

    if (resentLines != null) { headerLines = headerLines.concat(resentLines) }
    if (fromLines != null) { headerLines = headerLines.concat(fromLines[0].split(",")) }
    if (toLines != null) { headerLines = headerLines.concat(toLines[0].split(",")) }
    if (ccLines != null) { headerLines = headerLines.concat(ccLines[0].split(",")) }

    let resentEmails = [];

    for (let elem in headerLines) {
        if (headerLines[elem] == null) { continue };

        // Match all possible email in the string
        let emails = headerLines[elem].match(/\S+@\S+\.\S+/g)
        if (emails == null) { continue };

        emails = emails.map(sanitizeMail)

        for (let email in emails) {
            resentEmails.push("X-RESEND-ENC: ".concat(emails[email]))
        }
    }

    if (headerLines.length == 0) {
        resentEmails.push("X-RESEND-ENC: ")
    }

    return resentEmails.join("\n")

    function sanitizeMail(value) {
        return value.replace(/</g, '').replace(/>/g, '').replace(/"/g, '')
    }
}
