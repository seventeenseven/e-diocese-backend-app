
export default class UAParser {
    userAgent = {
      browser: '',
      version: '',
      source: '',
      os: ''
    };
    constructor (userAgent) {
      this.userAgent = userAgent
    }
    getBrowser () {
      return this.userAgent.browser
    }
    getBrowserVersion () {
      return this.userAgent.version
    }
    getSource () {
      return this.userAgent.source
    }
    getOS () {
      return this.userAgent.os
    }
}
