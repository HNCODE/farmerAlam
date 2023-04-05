const config = require("../../config.json")
const chalk = require("chalk")

/**
 * Checks if the proper values have been provided in the config.json file!
 */

async function checkValid() {
    if (!config.OWNER_ID) {
        console.log(
            chalk.bgYellowBright.black(
                "[WARN] OWNER_ID_WAS_NOT_FOUND"
            )
        )
    }
    if (!config.BOT_TOKEN) {
        throw ReferenceError(
            chalk.bgRedBright.black(
                "[CONFIG_ERR] BOT_TOKEN_WAS_NOT_FOUND"
            )
        )
    }
}

module.exports = {
    checkValid
}
