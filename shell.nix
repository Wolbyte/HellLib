{pkgs ? import <nixpkgs> {}}: let
  python = pkgs.python311.withPackages (ps:
    with ps; [
      django
      djangorestframework
      django-cors-headers
      psycopg2
      gunicorn
      pip
    ]);
in
  pkgs.mkShell {
    buildInputs = with pkgs; [
      nodejs_20
      python
    ];
  }
