package etc

import at.favre.lib.crypto.bcrypt.BCrypt

class PasswordUtil {

    val bcrypt = BCrypt.withDefaults()
    val verifier = BCrypt.verifyer()

//    fun hashIfClear(user : etc.User) {
//        if (!isHashed(user.hash)) {
//            user.hash = hash(user.hash)
//        }
//    }

    fun hash(password: String): String {
        return bcrypt.hashToString(12, password.toCharArray())
    }

    fun verify(password: String, hash: String): Boolean {
        val verified: BCrypt.Result = verifier.verify(password.toCharArray(), hash)

        return verified.verified;
    }

    fun isHashed(clearOrHashed: String): Boolean {
        return clearOrHashed.startsWith("$2a")
    }
}