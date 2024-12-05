terraform {
  backend "s3" {
    bucket = "linkify1"
    key    = "github-action-.tfstate"
    region = "eu-central-1"
  }
}