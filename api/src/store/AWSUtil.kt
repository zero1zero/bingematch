package store

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials
import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.dynamodb.DynamoDbClient

class AWSUtil {

    private val awsCreds = StaticCredentialsProvider.create(
        AwsBasicCredentials.create(
            "AKIA6NDPKVG3TTRGGXUP",
            "LIujF/ZhqMrfVH1XS2dcPPyR/RoJpBRBB0Xi4rTs"
        )
    )
    val ddb: DynamoDbClient = DynamoDbClient.builder()
        .credentialsProvider(awsCreds)
        .region(Region.US_WEST_2)
        .build()
}