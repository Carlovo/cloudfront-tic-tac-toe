module "web_content_bucket" {
  source      = "github.com/Carlovo/cloudfront-s3"
  bucket_name = "cloudfront-tic-tac-toe"

  cloudfront_function_viewer_request_code = templatefile(
    "${local.content_path}get_game.js",
    { signing_key = var.signing_key }
  )
}
