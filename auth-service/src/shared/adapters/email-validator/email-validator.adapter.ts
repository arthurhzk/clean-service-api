export class EmailValidatorAdapter {
  isValid(email: string | undefined): boolean {
    const mailRegExp =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    if (!email) {
      return false
    }

    const emailParts: string[] = email.split("@")

    if (emailParts.length !== 2) {
      return false
    }

    const [account, address] = emailParts

    if (!account || !address) {
      return false
    }

    if (account.length > 64 || address.length > 255) {
      return false
    }

    const domainParts: string[] = address.split(".")

    if (domainParts.some((part) => part.length > 63)) {
      return false
    }

    return mailRegExp.test(email)
  }
}
