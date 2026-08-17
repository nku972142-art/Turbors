#!/bin/sh
set -e

# Inject Railway env vars with local defaults
: "${RAILWAY_PUBLIC_DOMAIN:=localhost}"
export RAILWAY_PUBLIC_DOMAIN

# Substitute PORT in nginx config
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf > /tmp/default.conf
mv /tmp/default.conf /etc/nginx/conf.d/default.conf

# Inject public domain into static files
for f in index.html robots.txt sitemap.xml; do
  envsubst '${RAILWAY_PUBLIC_DOMAIN}' < "/usr/share/nginx/html/$f" > /tmp/out
  mv /tmp/out "/usr/share/nginx/html/$f"
done

exec nginx -g 'daemon off;'
