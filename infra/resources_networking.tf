module "cloudfront_api" {
  for_each = local.api_files_to_ids

  source      = "github.com/Carlovo/cloudfront-s3"
  bucket_name = each.value

  cloudfront_function_viewer_request_code = templatefile(
    "${local.api_code_path}${each.key}",
    { signing_key = var.signing_key }
  )
}
