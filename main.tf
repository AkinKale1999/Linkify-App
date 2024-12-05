provider "aws" {
  region = "eu-central-1"
}

# Security Group erstellen (nur SSH-Zugriff)
resource "aws_security_group" "ssh_access" {
  name_prefix  = "ssh-access"
  description  = "Allow SSH access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Ersetze mit deiner IP für mehr Sicherheit
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "SSH_Access"
  }
}

# EC2-Instance erstellen
resource "aws_instance" "meineErsteInstanz" {
  ami           = "ami-0b5673b5f6e8f7fa7" # Überprüfe diese ID
  instance_type = "t2.small"
  key_name      = "linkify1"
  vpc_security_group_ids = [aws_security_group.ssh_access.id]

  tags = {
    Name = "Meine Github Actions"
  }
}

# Ausgabe der öffentlichen IP-Adresse der Instanz
output "instance_public_ip" {
  value = aws_instance.meineErsteInstanz.public_ip
}
