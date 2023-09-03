output "cloudfront_endpoint" {
  value = module.web_content_bucket.cloudfront_endpoint
}

output "bucket_regional_domain_name" {
  value = module.web_content_bucket.bucket_regional_domain_name
}

output "bucket_id" {
  value = module.web_content_bucket.bucket_id
}
