 # Run locally

* `make fresh`
* `make dashboard`
* Port forward to postgres: `kubectl -n default port-forward `kubectl get pods -n default -l "app=postgres" -o jsonpath="{.items[0].metadata.name}"` 5433:5432`
* Connect locally to k8s postgres: `psql -p 5433 -h 127.0.0.1`

How can I set this block after the fact for metrics server:
```
      containers:
        - name: metrics-server
          image: k8s.gcr.io/metrics-server/metrics-server:v0.5.0
          args:
            - '--kubelet-insecure-tls'
            - '--cert-dir=/tmp'
```

# ML Notes
* https://towardsdatascience.com/build-a-movie-recommendation-api-using-scikit-learn-flask-and-heroku-bee239dc96e3