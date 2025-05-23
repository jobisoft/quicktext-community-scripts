/**
 * Creates a custom subject prefix using current date and time as a case reference
 * number. The case reference number uses the following format `[Prefix-yyMMddHHmm]`
 * where the `Prefix` can be specified by a variable.
 * 
 * It is added in front of the current subject and as a reference text in the body.
 * 
 * Usage:
 * 
 * Using this script in your template (where `AREF` can be any other prefix or ommitted):
 * ```
 * [[SCRIPT=CaseNumber|AREF]]
 * ```
 * would resolve to:
 * ```
 * Reference number: AREF-2001311245
 * ```
 * Additionally the subject will be prefixed by: `[AREF-2001311245]`
 */
export async function CaseNumber() {
    // create timestampID
    let date = new Date();

    let yy = date.getFullYear().toString().substr(2, 2);
    let mm = (date.getMonth() + 1).toString();
    let dd = date.getDate().toString();
    let hh = date.getHours().toString();
    let nn = date.getMinutes().toString();

    if (mm.length < 2) mm = "0" + mm;
    if (dd.length < 2) dd = "0" + dd;
    if (hh.length < 2) hh = "0" + hh;
    if (nn.length < 2) nn = "0" + nn;

    let timestampID = yy + mm + dd + hh + nn;

    // combine prefix and timestampID to the caseID if the variable was set
    let caseID = timestampID;
    if (this.quicktext.variables.length >= 1) caseID = this.quicktext.variables[0] + "-" + timestampID;

    // add caseID in front of the current subject
    let { subject } = await this.compose.getComposeDetails();
    subject = "[" + caseID + "] " + subject;
    await this.compose.setComposeDetails({ subject });

    return "Reference number: " + caseID + "\n";
}