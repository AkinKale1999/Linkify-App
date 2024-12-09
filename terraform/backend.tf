terraform {
    backend "s3" {
      bucket = "linkify1"
      key = "github-actions.tfstate"
      region = "eu-central-1"
    }
}