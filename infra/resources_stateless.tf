locals {
  index_content   = file("${local.content_path}index.html")
  page404_content = file("${local.content_path}404.html")
}

# Backup resources for when function content does not work.
resource "aws_s3_object" "index" {
  for_each = local.api_files_to_ids

  bucket       = each.value
  key          = "index.html"
  content_type = "text/html"
  content      = local.index_content
  etag         = md5(local.index_content)

  depends_on = [module.cloudfront_api]
}

resource "aws_s3_object" "page_404" {
  for_each = local.api_files_to_ids

  bucket       = each.value
  key          = "404.html"
  content_type = "text/html"
  content      = local.page404_content
  etag         = md5(local.page404_content)

  depends_on = [module.cloudfront_api]
}
