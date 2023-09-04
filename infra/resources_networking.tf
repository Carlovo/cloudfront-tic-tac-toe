module "web_content_bucket" {
  source                                  = "github.com/Carlovo/cloudfront-s3"
  bucket_name                             = "cloudfront-tic-tac-toe"
  cloudfront_function_viewer_request_code = file("${local.content_path}echo_uri.js")
}
