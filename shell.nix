{pkgs ? import <nixpkgs> {}}: let
  python = pkgs.python311.withPackages (ps:
    with ps; [
      django
      django-cors-headers
      djangorestframework
      gunicorn
      openpyxl
      pandas
      pip
      psycopg2
      requests
    ]);
in
  pkgs.mkShell {
    buildInputs = with pkgs; [
      nodejs_20
      python
    ];
  }
