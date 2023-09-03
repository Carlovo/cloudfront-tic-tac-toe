locals {
  index_content   = file("${path.module}/../content/index.html")
  page404_content = file("${path.module}/../content/404.html")
}

resource "aws_s3_object" "index" {
  bucket       = module.web_content_bucket.bucket_id
  key          = "index.html"
  content_type = "text/html"
  content      = local.index_content
  etag         = md5(local.index_content)
}

resource "aws_s3_object" "page_404" {
  bucket       = module.web_content_bucket.bucket_id
  key          = "404.html"
  content_type = "text/html"
  content      = local.page404_content
  etag         = md5(local.page404_content)
}
