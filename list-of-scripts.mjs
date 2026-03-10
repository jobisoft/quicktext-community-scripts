// This structure is used to signal Quicktext which scripts are available. The
// actual script definitions will be in the specified file in the scripts subfolder.
//
// Each entry can provide a `usage` string and a short `description`.
export const SCRIPTS = {
  "AddRecipients": {
    file: "AddRecipients.mjs",
    usage: "AddRecipients|type|addresses",
    description: "Adds one or more recipients to the chosen field (to/cc/bcc/reply-to).",
  },
  "CaseNumber": {
    file: "CaseNumber.mjs",
    usage: "CaseNumber|prefix",
    description: "Prepends a timestamp-based reference number to the subject and returns it.",
  },
  "CleanSubject": {
    file: "CleanSubject.mjs",
    usage: "CleanSubject",
    description: "Removes common reply/forward prefixes from the current subject.",
  },
  "CustomForwardHeader": {
    file: "CustomForwardHeader.mjs",
    usage: "CustomForwardHeader",
    description: "Generates a custom forwarding header from the original message metadata.",
  },
  "DateOffset": {
    file: "DateOffset.mjs",
    usage: "DateOffset|months|days|format",
    description: "Returns a date string offset by the given months/days, using an optional format.",
  },
  "GeneratePassword": {
    file: "GeneratePassword.mjs",
    usage: "GeneratePassword|length|chars",
    description: "Generates a random password using optional length and character set.",
  },
  "GetLinepart": {
    file: "GetLinepart.mjs",
    usage: "GetLinepart|prefix|suffix",
    description: "Extracts text between prefix and suffix from the current message body.",
  },
  "GetMailBody": {
    file: "GetMailBody.mjs",
    usage: "GetMailBody|format",
    description: "Returns the current compose body (plain text by default, HTML if requested).",
  },
  "GetRecipients": {
    file: "GetRecipients.mjs",
    usage: "GetRecipients",
    description: "Lists recipients currently set in the compose window.",
  },
  "GoodMorning": {
    file: "GoodMorning.mjs",
    usage: "GoodMorning",
    description: "Returns a greeting based on the current time of day.",
  },
  "Identity": {
    file: "Identity.mjs",
    usage: "Identity|action|identityId",
    description: "Gets or sets the current identity; can list all identities.",
  },
  "LastMonth": {
    file: "LastMonth.mjs",
    usage: "LastMonth",
    description: "Returns the name of the previous month.",
  },
  "OpenComposeWindow": {
    file: "OpenComposeWindow.mjs",
    usage: "OpenComposeWindow|subject",
    description: "Opens a new compose window with an optional initial subject.",
  },
  "RemoveRecipients": {
    file: "RemoveRecipients.mjs",
    usage: "RemoveRecipients|type",
    description: "Clears recipients in the specified field or all fields.",
  },
  "SchleuderResend": {
    file: "SchleuderResend.mjs",
    usage: "SchleuderResend",
    description: "Extracts 'x-resend' headers from a message for re-sending.",
  },
  "SetSubject": {
    file: "SetSubject.mjs",
    usage: "SetSubject|subject",
    description: "Sets the subject of the current compose window.",
  },
  "SpellChecker": {
    file: "SpellChecker.mjs",
    usage: "SpellChecker|action|languages",
    description: "Gets/sets spellchecking languages or lists supported languages.",
  },
  "ToFirstOrLastname": {
    file: "ToFirstOrLastname.mjs",
    usage: "ToFirstOrLastname|separator",
    description: "Returns the first name (or last name if missing) of recipients.",
  },
  "ToggleSignMessage": {
    file: "ToggleSignMessage.mjs",
    usage: "ToggleSignMessage|type",
    description: "Toggles or sets signing for the current message (on/off).",
  },
  "ToNickname": {
    file: "ToNickname.mjs",
    usage: "ToNickname|separator",
    description: "Returns the nickname (or first name) of recipients.",
  }
}