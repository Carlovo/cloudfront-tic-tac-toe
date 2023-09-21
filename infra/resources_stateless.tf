locals {
  page404_content      = file("${local.content_path}404.html")
  index_content_backup = file("${local.content_path}index_backup.html")

  index_content_frontend = templatefile(
    "${local.content_path}index_frontend.html",
    {
      for api_file, _ in local.api_files_to_ids :
      replace(api_file, "/[-.]/", "_") => module.cloudfront_api[api_file].cloudfront_endpoint
    }
  )
}

resource "aws_s3_object" "index_frontend" {
  bucket       = local.frontend_bucket_name
  key          = "index.html"
  content_type = "text/html"
  content      = local.index_content_frontend
  etag         = md5(local.index_content_frontend)

  depends_on = [module.frontend]
}

resource "aws_s3_object" "page_404_frontend" {
  bucket       = local.frontend_bucket_name
  key          = "404.html"
  content_type = "text/html"
  content      = local.page404_content
  etag         = md5(local.page404_content)

  depends_on = [module.frontend]
}

# Backup resources for when function content does not work.
resource "aws_s3_object" "index_backup" {
  for_each = local.api_files_to_ids

  bucket       = each.value
  key          = "index.html"
  content_type = "text/html"
  content      = local.index_content_backup
  etag         = md5(local.index_content_backup)

  depends_on = [module.cloudfront_api]
}

resource "aws_s3_object" "page_404_backup" {
  for_each = local.api_files_to_ids

  bucket       = each.value
  key          = "404.html"
  content_type = "text/html"
  content      = local.page404_content
  etag         = md5(local.page404_content)

  depends_on = [module.cloudfront_api]
}
