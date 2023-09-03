module "web_content_bucket" {
  source      = "github.com/Carlovo/cloudfront-s3"
  bucket_name = "cloudfront-tic-tac-toe"
}
