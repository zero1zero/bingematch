import software.amazon.awssdk.auth.credentials.AwsBasicCredentials
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.ses.SesClient
import software.amazon.awssdk.services.ses.model.*

class Notifier {

    // Replace sender@example.com with your "From" address.
    // This address must be verified with Amazon SES.
    val from = "time-to-trade@vestly.io"

    // The HTML body for the email.
    val htmlbody = ("<h1></h1>"
            + "<p>This email was sent with <a href='https://aws.amazon.com/ses/'>"
            + "Amazon SES</a> using the <a href='https://aws.amazon.com/sdk-for-java/'>"
            + "AWS SDK for Java</a>")

    // The email body for recipients with non-HTML email clients.
    val textbody = ("This email was sent through Amazon SES "
            + "using the AWS SDK for Java.")

    private val creds = StaticCredentialsProvider.create(
        AwsBasicCredentials.create(
            "AKIA6NDPKVG35G72HFEB",
            "lmz6J6mWHGK58FO6qHKXWfPVhVRPZG1/SrpQ4JW1"
        )
    )

    fun notifyOfTrade(user : User, trade : Trade) {
        val client = SesClient.builder()
            .credentialsProvider(creds)
            .region(Region.US_WEST_2)
            .build()
        val request = SendEmailRequest.builder()
            .destination(
                Destination.builder().toAddresses(user.email).build()
            )
            .message(
                Message.builder()
                    .body(
                        Body.builder()
                            .html(
                                Content.builder()
                                    .charset("UTF-8").data(htmlbody)
                                    .build()
                            )
                            .text(
                                Content.builder()
                                    .charset("UTF-8").data(textbody)
                                    .build()
                            )
                            .build()
                    )
                    .subject(
                        Content.builder()
                            .charset("UTF-8")
                            .data("Time to Make a Trade for " + trade.symbol)
                            .build()
                    )
                    .build()
            )
            .source(from)
            .build()
        client.sendEmail(request)
    }
}