FROM nginx:alpine

# Remove default nginx site
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets
COPY index.html robots.txt sitemap.xml manifest.json sw.js /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/
COPY icons/ /usr/share/nginx/html/icons/

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

CMD ["/docker-entrypoint.sh"]
