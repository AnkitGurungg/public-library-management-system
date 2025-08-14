# Security Group for RDS & S3 Access
resource "aws_security_group" "app_sg" {
  name        = "testing-csplms-sg"
  description = "Allow MySQL access and outbound traffic"

  # Allow MySQL inbound traffic
  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow MySQL access"
  }

  # Outbound traffic allowed to all destinations
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# S3 Bucket
resource "aws_s3_bucket" "app_bucket" {
  bucket = var.s3_bucket_name

  tags = {
    Name = "CSPLMS App Bucket"
    Env  = "prod"
  }
}

# Object Ownership
resource "aws_s3_bucket_ownership_controls" "app_bucket_ownership" {
  bucket = aws_s3_bucket.app_bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# Public Access Block
resource "aws_s3_bucket_public_access_block" "app_bucket_public_access" {
  bucket = aws_s3_bucket.app_bucket.id

  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

# RDS MySQL Instance
resource "aws_db_instance" "mysql" {
  allocated_storage    = var.db_allocated_storage
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = var.db_instance_class
  username             = var.db_username
  password             = var.db_password
  skip_final_snapshot  = true
  publicly_accessible  = true
  vpc_security_group_ids = [aws_security_group.app_sg.id]

  backup_retention_period = var.db_backup_retention_period
  backup_window           = var.db_backup_window
  apply_immediately       = true

  tags = {
    Name = "CSPLMS RDS"
    Env  = "prod"
  }
}
