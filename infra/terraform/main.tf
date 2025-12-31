provider "google" {
  project = "nsbe-app-482908"
  region  = "us-central1"
}

# Enable APIs (GKE and Artifact Registry)
resource "google_project_service" "gke" {
  service = "container.googleapis.com"
}
resource "google_project_service" "artifact_registry" {
  service = "artifactregistry.googleapis.com"
}

# Artifact Registry 
resource "google_artifact_registry_repository" "my_repo" {
  location      = "us-central1"
  repository_id = "nsbe-app-repo"
  format        = "DOCKER"
}

# GKE Cluster (Zonal to save cost)
resource "google_container_cluster" "primary" {
  name     = "nsbe-cluster"
  location = "us-central1-a"
  
  # Delete the default node pool and make a custom one
  remove_default_node_pool = true
  initial_node_count       = 1
}

# Node Pool 
resource "google_container_node_pool" "primary_nodes" {
  name       = "nsbe-node-pool"
  location   = "us-central1-a"
  cluster    = google_container_cluster.primary.name
  node_count = 2

  node_config {
    machine_type = "e2-medium" # Good balance of power/cost
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }
}