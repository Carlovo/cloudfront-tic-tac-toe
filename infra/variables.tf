locals {
  content_path  = "${path.module}/../content/"
  api_code_path = "${local.content_path}api-code/"
  api_files_to_ids = {
    for api_file in fileset(local.api_code_path, "*") :
    api_file => "${split(".", api_file)[0]}${var.identifier}"
  }
}

variable "signing_key" {
  description = "Key used to sign validated game moves"
  type        = string
  sensitive   = true
}

variable "identifier" {
  description = "Id to append to some resource names"
  type        = string
  default     = "-tic-tac-toe"
}
