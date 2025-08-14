# S3 region
output "s3_bucket_region" {
  description = "S3 bucket region"
  value       = var.aws_region
}

# S3 bucket name
output "s3_bucket_name" {
  description = "S3 bucket name"
  value       = aws_s3_bucket.app_bucket.bucket
}

# RDS public endpoint
output "rds_endpoint" {
  description = "RDS MySQL endpoint"
  value       = aws_db_instance.mysql.endpoint
}

# RDS username
output "rds_username" {
  description = "RDS master username"
  value       = aws_db_instance.mysql.username
}
