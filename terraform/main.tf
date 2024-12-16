provider "aws" {
  region = "eu-central-1"
}

# EC2-Instanz
resource "aws_instance" "GithubActionsInstanz" {
  count = 1
  ami           = "ami-0eddb4a4e7d846d6f"
  instance_type = "t2.small"
  key_name      = "linkify1"
  vpc_security_group_ids = [
    aws_security_group.ssh_access.id,
    aws_security_group.web_access.id
  ]
  tags = {
    Name = "Meine Github Actions Instanz ${count.index}"
  }
}

# Sicherheitsgruppe: SSH-Zugriff
resource "aws_security_group" "ssh_access" {
  name        = "ssh_access"
  description = "Allow SSH access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "SSH Access"
  }
}

# Sicherheitsgruppe: HTTP-Zugriff
resource "aws_security_group" "web_access" {
  name        = "allow_http"
  description = "Allow HTTP inbound traffic"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "HTTP Access"
  }
}

# Output der öffentlichen IP-Adresse der Instanz
output "instance_public_ips" {
  value = aws_instance.GithubActionsInstanz.public_ip
}
