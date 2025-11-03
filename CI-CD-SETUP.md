# CI/CD Setup for hm-admin

This document describes the complete CI/CD pipeline setup for the hm-admin Next.js frontend application.

## Overview

**Deployment URLs:**
- Dev: https://hm-admin-dev.dog-foot.com
- Prod: https://hm-admin-prod.dog-foot.com

**Architecture:**
- GitHub Actions for CI/CD
- Docker images pushed to GitHub Container Registry (GHCR)
- Kustomize for Kubernetes manifest management
- ArgoCD for GitOps deployment
- k3s with Traefik ingress controller
- Cert-manager for SSL/TLS certificates

## Environment Variables Strategy

This setup uses **Build-Time Variables (Option 1)** with the following approach:

- Environment variables are passed as Docker build arguments during the CI/CD process
- Variables are baked into the Next.js build at compile time
- All variables use the `NEXT_PUBLIC_*` prefix for client-side access
- Each environment (dev/prod) gets its own Docker image with environment-specific values

### Required Environment Variables

The following environment variables must be configured as GitHub Secrets:

**For DEV environment:**
- `DEV_NEXT_PUBLIC_API_URL`
- `DEV_NEXT_PUBLIC_S3_THUMBNAIL_URL`
- `DEV_NEXT_PUBLIC_S3_CERT_URL`
- `DEV_NEXT_PUBLIC_S3_CERT_KEY`
- `DEV_NEXT_PUBLIC_ACCESS_KEY_ID`
- `DEV_NEXT_PUBLIC_SECRET_ACCESS_KEY`

**For PROD environment:**
- `PROD_NEXT_PUBLIC_API_URL`
- `PROD_NEXT_PUBLIC_S3_THUMBNAIL_URL`
- `PROD_NEXT_PUBLIC_S3_CERT_URL`
- `PROD_NEXT_PUBLIC_S3_CERT_KEY`
- `PROD_NEXT_PUBLIC_ACCESS_KEY_ID`
- `PROD_NEXT_PUBLIC_SECRET_ACCESS_KEY`

**Shared secrets:**
- `MANIFESTS_REPO_PAT` - Personal Access Token with write access to dog-foot-k8s-manifests repository

## Setup Instructions

### 1. Configure GitHub Secrets

Go to your hm-admin GitHub repository → Settings → Secrets and variables → Actions, and add all the secrets listed above.

To create the `MANIFESTS_REPO_PAT`:
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Add it as a repository secret

### 2. Push the CI/CD Files

Commit and push the following files to your hm-admin repository:
```bash
cd hm-admin
git add .
git commit -m "feat: Add CI/CD pipeline and Kubernetes manifests"
git push origin main
```

### 3. Verify K8s Manifests Repository

The `dog-foot-k8s-manifests` repository should have the following structure:

```
dog-foot-k8s-manifests/
├── dev/
│   └── hm-admin/
│       ├── kustomization.yaml
│       └── secret.yaml
└── prod/
    └── hm-admin/
        ├── kustomization.yaml
        └── secret.yaml
```

### 4. Fill in Kubernetes Secrets (Optional)

The secret.yaml files in the manifests repository are for documentation purposes only. Since we're using build-time variables, the secrets are injected during the Docker build process.

However, if you want to store them in Kubernetes for future reference or runtime configuration:

```bash
# Navigate to the manifests repo
cd dog-foot-k8s-manifests/dev/hm-admin

# Edit secret.yaml and fill in your values using stringData
# Then apply to your cluster
kubectl apply -f secret.yaml
```

### 5. Set up ArgoCD Application

Create an ArgoCD Application for hm-admin (both dev and prod):

```yaml
# hm-admin-dev.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: hm-admin-dev
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/Team-DogFoot/dog-foot-k8s-manifests
    targetRevision: main
    path: dev/hm-admin
  destination:
    server: https://kubernetes.default.svc
    namespace: default
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

Apply it:
```bash
kubectl apply -f hm-admin-dev.yaml
kubectl apply -f hm-admin-prod.yaml
```

### 6. Ensure Image Pull Secret Exists

Your cluster needs a secret to pull images from GHCR:

```bash
kubectl create secret docker-registry ghcr-auth-secret \
  --docker-server=ghcr.io \
  --docker-username=YOUR_GITHUB_USERNAME \
  --docker-password=YOUR_GITHUB_PAT \
  --docker-email=YOUR_EMAIL
```

## Workflow Execution

### Manual Deployment

Both workflows are configured to run on `workflow_dispatch`, meaning they need to be manually triggered:

1. Go to your hm-admin repository on GitHub
2. Navigate to Actions tab
3. Select either "CI/CD for DEV Environment" or "CI/CD for Prod Environment"
4. Click "Run workflow"
5. Select the branch to deploy from
6. Click "Run workflow"

### What Happens During Deployment

1. **Build Stage:**
   - Checks out source code
   - Sets up Docker Buildx
   - Generates image tag using format: `{env}-{git-sha}`
   - Logs into GHCR
   - Builds Docker image with environment variables as build args
   - Pushes image to GHCR with caching

2. **Update Manifests Stage:**
   - Installs Kustomize
   - Checks out dog-foot-k8s-manifests repository
   - Updates the image tag in kustomization.yaml
   - Commits and pushes changes

3. **ArgoCD Deployment:**
   - ArgoCD detects changes in the manifests repository
   - Automatically syncs and deploys the new version
   - Creates/updates Deployment, Service, and Ingress resources
   - Cert-manager provisions SSL certificates

## File Structure

### hm-admin Repository

```
hm-admin/
├── .github/
│   └── workflows/
│       ├── ci-cd-dev.yml          # Dev environment workflow
│       └── ci-cd-prod.yml         # Prod environment workflow
├── k8s-base/
│   ├── dev/
│   │   ├── deployment.yaml        # Dev deployment config (1 replica)
│   │   ├── service.yaml           # ClusterIP service
│   │   ├── ingress.yaml           # Traefik ingress with TLS
│   │   └── kustomization.yaml     # Kustomize config
│   └── prod/
│       ├── deployment.yaml        # Prod deployment config (2 replicas)
│       ├── service.yaml           # ClusterIP service
│       ├── ingress.yaml           # Traefik ingress with TLS
│       └── kustomization.yaml     # Kustomize config
├── Dockerfile                      # Multi-stage build with build args
├── .dockerignore                   # Docker build optimization
├── next.config.mjs                 # Updated with output: 'standalone'
└── CI-CD-SETUP.md                 # This file
```

## Troubleshooting

### Build Fails

1. Check GitHub Actions logs for specific error
2. Verify all environment variables are set in GitHub Secrets
3. Ensure Dockerfile is correct and all dependencies are available

### Deployment Not Updating

1. Check if ArgoCD is syncing: `kubectl get applications -n argocd`
2. View ArgoCD logs: `kubectl logs -n argocd -l app.kubernetes.io/name=argocd-application-controller`
3. Manually sync in ArgoCD UI if needed

### Image Pull Errors

1. Verify `ghcr-auth-secret` exists: `kubectl get secret ghcr-auth-secret`
2. Check if image is public or PAT has correct permissions
3. Verify image name matches in deployment.yaml

### DNS/Ingress Issues

1. Verify DNS records point to your cluster
2. Check Traefik ingress: `kubectl get ingress`
3. Check cert-manager certificates: `kubectl get certificates`

### Environment Variables Not Available

1. Since we're using build-time variables, changes require a rebuild
2. Update GitHub Secrets and re-run the workflow
3. Variables are baked into the JavaScript bundle during build

## Next Steps

1. ✅ Configure GitHub Secrets
2. ✅ Push CI/CD files to repository
3. ✅ Set up ArgoCD Applications
4. ✅ Ensure image pull secret exists
5. ✅ Run the workflow manually
6. ✅ Verify deployment in ArgoCD
7. ✅ Test the application at the deployment URL

## Notes

- **Security**: Since environment variables are prefixed with `NEXT_PUBLIC_*`, they are exposed in the client-side JavaScript bundle. Do NOT store sensitive secrets that should only be server-side.
- **Performance**: Build-time variables provide the best performance as they're optimized during the Next.js build process.
- **Immutability**: Each environment has its own Docker image. To change environment variables, you must rebuild and redeploy.
- **Replicas**: Dev uses 1 replica, Prod uses 2 replicas for high availability.

## Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Kustomize Documentation](https://kustomize.io/)
- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)
- [Traefik Ingress](https://doc.traefik.io/traefik/providers/kubernetes-ingress/)
