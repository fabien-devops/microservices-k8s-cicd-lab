# 🚀 Microservices Kubernetes CI/CD & GitOps Lab

[![CI/CD Pipeline](https://github.com/fabien-devops/microservices-k8s-cicd-lab/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/fabien-devops/microservices-k8s-cicd-lab/actions)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![ArgoCD](https://img.shields.io/badge/ArgoCD-EF7B4D?style=flat&logo=argo&logoColor=white)](https://argoproj.github.io/cd/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)

An end-to-end production-grade DevOps repository showcasing automated continuous integration, security scanning, multi-stage containerization, and GitOps continuous deployment using Kubernetes and ArgoCD.

---

## 🏗️ System Architecture

+------------------+      +------------------+      +--------------------+
|  GitHub Push     | ---> |  GitHub Actions  | ---> |  Docker Registry   |
|  (Source Code)   |      |  CI Pipeline     |      |  (ghcr.io / Hub)   |
+------------------+      +------------------+      +--------------------+
|
v
+------------------+      +------------------+      +--------------------+
|  Kubernetes      | <--- |  ArgoCD          | <--- |  GitOps Repo Sync  |
|  Cluster (Pods)  |      |  GitOps Engine   |      |  (Manifests)       |
+------------------+      +------------------+      +--------------------+

The architecture adheres to modern cloud-native best practices:
* **Microservices Design**: Decoupled, stateless RESTful service (`user-service`) built with Express.js.
* **Continuous Integration**: GitHub Actions executes automated unit testing, static code analysis (SonarQube), multi-stage Docker builds, and container vulnerability scanning (Trivy).
* **GitOps Continuous Deployment**: ArgoCD automatically synchronizes Kubernetes manifests to match the desired repository state.

---

## ⚡ Key Technical Features

### 1. `user-service` Application
* **RESTful CRUD Operations**: Exposes clear JSON endpoints (`GET`, `POST`, `DELETE`).
* **Kubernetes Probes**: Native support for `/health/liveness` and `/health/readiness` endpoints.
* **Graceful Shutdown**: Intercepts `SIGTERM` signals for clean connection termination during pod rotation.

### 2. Multi-Stage Containerization
* **Security Hardening**: Runs under a non-root (`node`) user context.
* **Lightweight Image**: Built using Node Alpine base images to minimize the attack surface and overall image size.

### 3. Kubernetes Infrastructure Manifests
* Deployment configurations with explicit resource requests/limits.
* Configured readiness and liveness health probes.
* ClusterIP Services exposing standard container ports.

---

## 📊 Endpoints API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health/liveness` | Kubernetes Liveness Probe |
| `GET` | `/health/readiness` | Kubernetes Readiness Probe |
| `GET` | `/api/users` | Retrieve all mock users |
| `GET` | `/api/users/:id` | Retrieve single user by ID |
| `POST` | `/api/users` | Add new user (`{ "name": "", "role": "" }`) |
| `DELETE` | `/api/users/:id` | Remove user by ID |

---

## 🛠️ Local Development & Testing

### Prerequisites
* Node.js v20+
* Docker Engine
* `kubectl`

### Run Locally (Node.js)
```bash
cd user-service
npm install
npm start
```

## Execute Unit Tests
```bash
npm run test:unit
```

## Build & Test Docker Image
```bash
docker build -t user-service:local .
docker run -d -p 8080:8080 --name user-service user-service:local
curl http://localhost:8080/api/users
```

## Kubernetes Port-Forward Validation
```bash
kubectl port-forward svc/user-service 8080:80
curl http://localhost:8080/health/liveness
```

## 👤 Author

Fabien ANDRIANAMBININTSOA

DevOps & Infrastructure Engineer

    GitHub: @fabien-devops

    LinkedIn: www.linkedin.com/in/fabien-andrianambinintsoa