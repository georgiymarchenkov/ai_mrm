---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: architecture_doc
title: Deployment Architecture
language: ru
industry: advertising
role_apply: [developer, architect]
period: 2025-10
version: "1.0"
source_path: 08_ARCHITECTURE/Deployment.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [architecture, deployment]
---

# Deployment Architecture
## MRM AI Platform

**Version:** 1.0  
**Date:** 23.10.2025  
**Environment:** Kubernetes on Cloud Provider (AWS/GCP/Azure)

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Infrastructure Components](#infrastructure-components)
3. [Kubernetes Setup](#kubernetes-setup)
4. [CI/CD Pipeline](#cicd-pipeline)
5. [Monitoring & Observability](#monitoring--observability)
6. [Security](#security)
7. [Disaster Recovery](#disaster-recovery)
8. [Scaling Strategy](#scaling-strategy)

---

## Architecture Overview

### High-Level Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Cloud Provider                          │
│                      (AWS / GCP / Azure)                        │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Load Balancer (ALB/NLB)                     │
│                         + CDN (CloudFlare)                      │
└─────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┴───────────────┐
                ▼                               ▼
┌───────────────────────────┐     ┌───────────────────────────┐
│   Kubernetes Cluster 1    │     │   Kubernetes Cluster 2    │
│      (Production)         │     │      (Staging)            │
│                           │     │                           │
│  ┌────────────────────┐  │     │  ┌────────────────────┐  │
│  │   API Gateway      │  │     │  │   API Gateway      │  │
│  │   (NGINX Ingress)  │  │     │  │   (NGINX Ingress)  │  │
│  └────────────────────┘  │     │  └────────────────────┘  │
│           │               │     │           │               │
│  ┌────────┴────────┐     │     │  ┌────────┴────────┐     │
│  │                 │     │     │  │                 │     │
│  │  Backend API    │     │     │  │  Backend API    │     │
│  │  (NestJS)       │     │     │  │  (NestJS)       │     │
│  │  Pods: 5-20     │     │     │  │  Pods: 2-5      │     │
│  │                 │     │     │  │                 │     │
│  └────────┬────────┘     │     │  └────────┬────────┘     │
│           │               │     │           │               │
│  ┌────────┴────────┐     │     │  ┌────────┴────────┐     │
│  │                 │     │     │  │                 │     │
│  │  Worker Pods    │     │     │  │  Worker Pods    │     │
│  │  (Bull Queue)   │     │     │  │  (Bull Queue)   │     │
│  │  Pods: 3-10     │     │     │  │  Pods: 1-3      │     │
│  │                 │     │     │  │                 │     │
│  └─────────────────┘     │     │  └─────────────────┘     │
│                           │     │                           │
│  ┌────────────────────┐  │     │  ┌────────────────────┐  │
│  │                    │  │     │  │                    │  │
│  │  Frontend (Next.js)│  │     │  │  Frontend (Next.js)│  │
│  │  Pods: 3-10        │  │     │  │  Pods: 1-2         │  │
│  │                    │  │     │  │                    │  │
│  └────────────────────┘  │     │  └────────────────────┘  │
└───────────────────────────┘     └───────────────────────────┘
                │                             │
                └──────────────┬──────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Shared Services Layer                         │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  PostgreSQL  │  │  ClickHouse  │  │    Redis     │         │
│  │  (RDS/Cloud) │  │  (Managed)   │  │  (ElastiCache)│         │
│  │  Primary +   │  │  3-node      │  │  Cluster     │         │
│  │  2 Replicas  │  │  cluster     │  │  Mode        │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Vector DB   │  │     S3 /     │  │  Monitoring  │         │
│  │ (Pinecone)   │  │  Object      │  │  (Prometheus)│         │
│  │              │  │  Storage     │  │  + Grafana   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Infrastructure Components

### 1. Cloud Provider
**Recommendation:** AWS (mature K8s support, wide service portfolio)

**Services:**
- **EKS** (Elastic Kubernetes Service) - Managed Kubernetes
- **RDS** (Relational Database Service) - PostgreSQL
- **ElastiCache** - Redis
- **S3** - Object storage (reports, backups)
- **CloudFront** - CDN
- **Route53** - DNS
- **ACM** - SSL certificates
- **CloudWatch** - Logs & Metrics
- **IAM** - Identity & Access Management
- **VPC** - Network isolation

**Alternative:** GCP (GKE) or Azure (AKS)

---

### 2. Kubernetes Cluster

#### Cluster Specs (Production)

| Component | Spec | Nodes |
|-----------|------|-------|
| **Control Plane** | Managed (EKS) | N/A |
| **Worker Nodes (API)** | m5.2xlarge (8 vCPU, 32GB RAM) | 3-10 (autoscale) |
| **Worker Nodes (Workers)** | c5.2xlarge (8 vCPU, 16GB RAM) | 2-5 (autoscale) |
| **Total Initial Capacity** | 40 vCPU, 144GB RAM | 5 nodes |

#### Node Groups
- **api-nodegroup** - for API pods
- **workers-nodegroup** - for background workers
- **spot-nodegroup** - for non-critical workloads (cost optimization)

---

### 3. Networking

#### VPC Structure
```
VPC: 10.0.0.0/16

├── Public Subnets (10.0.1.0/24, 10.0.2.0/24)
│   ├── Load Balancer
│   └── NAT Gateway
│
├── Private Subnets (10.0.10.0/24, 10.0.11.0/24)
│   ├── EKS Worker Nodes
│   └── Application Pods
│
└── Data Subnets (10.0.20.0/24, 10.0.21.0/24)
    ├── RDS (PostgreSQL)
    ├── ElastiCache (Redis)
    └── ClickHouse (if self-hosted)
```

#### Load Balancer
- **Type:** Application Load Balancer (ALB)
- **SSL/TLS:** Termination at ALB (ACM certificates)
- **Health Checks:** /health endpoint
- **Sticky Sessions:** Enabled for API
- **Rate Limiting:** AWS WAF

---

## Kubernetes Setup

### Namespaces
```yaml
- default          # Default namespace (not used in production)
- mrm-production   # Production workloads
- mrm-staging      # Staging workloads
- mrm-workers      # Background workers
- monitoring       # Prometheus, Grafana
- logging          # ELK stack
```

### Deployments

#### API Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mrm-api
  namespace: mrm-production
spec:
  replicas: 5  # Min replicas
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0  # Zero-downtime deployments
  selector:
    matchLabels:
      app: mrm-api
  template:
    metadata:
      labels:
        app: mrm-api
        version: v1.0.0
    spec:
      containers:
      - name: api
        image: mrm-ai/api:1.0.0
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: production
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: url
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
      nodeSelector:
        node-type: api
      tolerations:
      - key: "node-type"
        operator: "Equal"
        value: "api"
        effect: "NoSchedule"
```

#### HorizontalPodAutoscaler
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: mrm-api-hpa
  namespace: mrm-production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: mrm-api
  minReplicas: 5
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Pods
        value: 1
        periodSeconds: 60
```

#### Worker Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mrm-worker
  namespace: mrm-workers
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mrm-worker
  template:
    metadata:
      labels:
        app: mrm-worker
    spec:
      containers:
      - name: worker
        image: mrm-ai/worker:1.0.0
        env:
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: redis-secrets
              key: url
        - name: QUEUE_NAME
          value: "sync,reports,email"
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"
          limits:
            memory: "4Gi"
            cpu: "2000m"
      nodeSelector:
        node-type: workers
```

#### Service
```yaml
apiVersion: v1
kind: Service
metadata:
  name: mrm-api-service
  namespace: mrm-production
spec:
  type: ClusterIP
  selector:
    app: mrm-api
  ports:
  - port: 80
    targetPort: 3000
```

#### Ingress
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: mrm-ingress
  namespace: mrm-production
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  tls:
  - hosts:
    - api.mrm-ai.com
    secretName: mrm-tls
  rules:
  - host: api.mrm-ai.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: mrm-api-service
            port:
              number: 80
```

---

## CI/CD Pipeline

### Tools
- **GitHub Actions** (or GitLab CI)
- **Docker** - Containerization
- **Helm** - K8s package manager
- **ArgoCD** - GitOps continuous delivery

### Pipeline Stages

#### 1. Build & Test
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
    
    - name: Build Docker image
      run: docker build -t mrm-ai/api:${{ github.sha }} .
    
    - name: Push to Registry
      run: |
        echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker push mrm-ai/api:${{ github.sha }}
```

#### 2. Deploy to Staging
```yaml
  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    steps:
    - name: Deploy to Staging
      run: |
        kubectl set image deployment/mrm-api mrm-api=mrm-ai/api:${{ github.sha }} -n mrm-staging
        kubectl rollout status deployment/mrm-api -n mrm-staging
```

#### 3. Deploy to Production
```yaml
  deploy-production:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
    - name: Deploy to Production
      run: |
        kubectl set image deployment/mrm-api mrm-api=mrm-ai/api:${{ github.sha }} -n mrm-production
        kubectl rollout status deployment/mrm-api -n mrm-production
    
    - name: Notify Slack
      run: |
        curl -X POST -H 'Content-type: application/json' \
        --data '{"text":"🚀 Deployed to production: v${{ github.sha }}"}' \
        ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Rollback Strategy
```bash
# Manual rollback
kubectl rollout undo deployment/mrm-api -n mrm-production

# Rollback to specific revision
kubectl rollout undo deployment/mrm-api --to-revision=2 -n mrm-production
```

---

## Monitoring & Observability

### Metrics (Prometheus + Grafana)

#### Dashboards
1. **Application Metrics**
   - Request rate, latency (P50, P95, P99)
   - Error rate (4xx, 5xx)
   - Active connections

2. **Infrastructure Metrics**
   - CPU, Memory utilization (nodes, pods)
   - Disk I/O, Network I/O
   - Pod restarts

3. **Business Metrics**
   - Active users
   - Projects created/day
   - Reports generated/hour
   - API calls/minute

#### Alerts
```yaml
# prometheus-alerts.yml
groups:
- name: mrm-api
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
      description: "Error rate is {{ $value }} (>5%)"

  - alert: HighLatency
    expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High API latency"
      description: "P95 latency is {{ $value }}s (>1s)"

  - alert: PodCrashLooping
    expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Pod is crash looping"
```

### Logging (ELK Stack)

#### Log Aggregation
- **Fluentd** - Log collection from pods
- **Elasticsearch** - Log storage
- **Kibana** - Log visualization

#### Log Format (Structured JSON)
```json
{
  "timestamp": "2025-10-23T12:00:00.123Z",
  "level": "info",
  "service": "api",
  "pod": "mrm-api-abc123",
  "request_id": "req_xyz789",
  "user_id": "user_123",
  "method": "POST",
  "path": "/api/v1/media-plans",
  "status": 201,
  "duration_ms": 234,
  "message": "Media plan created successfully"
}
```

### Distributed Tracing (Jaeger)
- Track requests across microservices
- Identify performance bottlenecks
- Debug complex issues

---

## Security

### 1. Network Security
- **VPC Isolation:** All resources in private VPC
- **Security Groups:** Strict inbound/outbound rules
- **Network Policies:** K8s NetworkPolicies to restrict pod-to-pod communication
- **WAF:** AWS WAF for DDoS protection, rate limiting

### 2. Secrets Management
- **AWS Secrets Manager** or **HashiCorp Vault**
- **K8s Secrets:** Encrypted at rest
- **No secrets in code/images**

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secrets
  namespace: mrm-production
type: Opaque
data:
  url: <base64-encoded-url>
```

### 3. Authentication & Authorization
- **OAuth 2.0 + JWT** for API
- **RBAC (Role-Based Access Control)** in K8s
- **Service Accounts** for pods

### 4. Image Security
- **Image Scanning:** Trivy/Snyk for vulnerability scanning
- **Signed Images:** Cosign for image signing
- **Private Registry:** ECR/GCR

### 5. SSL/TLS
- **All traffic HTTPS**
- **TLS 1.2+ only**
- **HSTS headers**

---

## Disaster Recovery

### Backup Strategy
- **Databases:** Daily full backup + continuous WAL archiving
- **Object Storage (S3):** Cross-region replication
- **Configuration:** GitOps (all K8s manifests in Git)

### RTO & RPO
- **RTO (Recovery Time Objective):** <1 hour
- **RPO (Recovery Point Objective):** <15 minutes

### Multi-Region Strategy (Future)
- **Primary Region:** us-east-1 (or eu-west-1)
- **DR Region:** us-west-2 (or eu-central-1)
- **Failover:** DNS-based (Route53) or Global Load Balancer

---

## Scaling Strategy

### Vertical Scaling
- Increase node size (e.g., m5.2xlarge → m5.4xlarge)
- Increase pod resources

### Horizontal Scaling
- **Auto-scaling:** HPA based on CPU/Memory
- **Node Auto-scaling:** Cluster Autoscaler (add/remove nodes)

### Database Scaling
- **PostgreSQL:** Read replicas (up to 5)
- **ClickHouse:** Add shards, increase replication
- **Redis:** Cluster mode (add nodes)

---

## Cost Optimization

### Strategies
1. **Spot Instances:** For non-critical workloads (workers) - save 70%
2. **Reserved Instances:** For stable workloads (API) - save 40%
3. **Right-sizing:** Monitor and adjust pod resources
4. **Auto-scaling:** Scale down during low traffic
5. **S3 Lifecycle:** Move old data to Glacier
6. **CloudFront:** Reduce origin requests

### Estimated Monthly Cost (Production)

| Component | Spec | Cost (USD) |
|-----------|------|------------|
| EKS Control Plane | Managed | $150 |
| Worker Nodes (5x m5.2xlarge) | On-Demand | $1,200 |
| RDS PostgreSQL (db.r5.2xlarge) | Primary + 2 replicas | $1,800 |
| ElastiCache Redis (cache.r5.large) | Cluster mode | $500 |
| ClickHouse (3x c5.2xlarge) | Self-hosted | $900 |
| S3 + CloudFront | 10TB transfer | $500 |
| Load Balancer | ALB | $100 |
| Monitoring (Prometheus) | m5.xlarge | $200 |
| **Total** | | **~$5,350/month** |

**With optimizations (Spot + Reserved):** ~$3,500/month

---

## Environments

### 1. Development (Local)
- Docker Compose
- Local PostgreSQL, Redis
- Mocked external APIs

### 2. Staging (K8s)
- 20% of production capacity
- Shared databases (staging schema)
- Real external APIs (sandbox accounts)

### 3. Production (K8s)
- Full capacity
- Dedicated databases
- Real external APIs

---

## Deployment Checklist

### Pre-Deployment
- [ ] Run all tests (unit, integration, e2e)
- [ ] Code review approved
- [ ] Security scan passed
- [ ] Database migrations tested
- [ ] Rollback plan prepared

### Deployment
- [ ] Deploy to staging first
- [ ] Smoke tests passed in staging
- [ ] Deploy to production (rolling update)
- [ ] Health checks passed
- [ ] Monitoring dashboards green

### Post-Deployment
- [ ] Verify key metrics (latency, error rate)
- [ ] Test critical user flows
- [ ] Monitor for 1 hour
- [ ] Update changelog
- [ ] Notify team

---

**Version:** 1.0  
**Last Updated:** 23.10.2025  
**Maintained by:** MRM AI DevOps Team

