# AWS region
variable "aws_region" {
  description = "AWS region to deploy resources"
  default     = "us-east-1"
}

# AWS credentials
# access key and secret key are passed through github secrets

# S3 bucket
variable "s3_bucket_name" {
  description = "Name of the S3 bucket"
  default     = "testing-csplms-app-buckett"
}

# RDS database
variable "db_username" {
  description = "RDS master username"
  default     = "admin"
}

variable "db_password" {
  description = "RDS master password"
  type        = string
  sensitive   = true
}

variable "db_instance_class" {
  description = "RDS instance type"
  default     = "db.t3.micro"
}

variable "db_allocated_storage" {
  description = "RDS allocated storage in GB"
  default     = 20
}

variable "db_backup_window" {
  description = "Preferred backup window (UTC)"
  default     = "03:00-04:00"
}

variable "db_backup_retention_period" {
  description = "RDS backup retention in days"
  default     = 0
}
