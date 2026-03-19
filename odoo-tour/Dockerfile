FROM odoo:19.0

USER root

# Install chromium for Odoo Tours
RUN apt-get update && \
    apt-get install -y --no-install-recommends chromium-browser && \
    rm -rf /var/lib/apt/lists/*

USER odoo