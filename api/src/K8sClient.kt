import io.kubernetes.client.openapi.ApiClient
import io.kubernetes.client.openapi.Configuration
import io.kubernetes.client.openapi.apis.CoreV1Api
import io.kubernetes.client.util.Config

class K8sClient {
    val client : ApiClient = Config.fromUrl("https://192.168.64.2:8443")
    val api = CoreV1Api(client)

    init {
        Configuration.setDefaultApiClient(client)
    }
}