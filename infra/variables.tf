locals {
  content_path = "${path.module}/../content/"
}

variable "signing_key" {
  description = "Key used to sign validated game moves"
  type        = string
  sensitive   = true
}
