# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.209.5/containers/ubuntu/.devcontainer/base.Dockerfile

# [Choice] Ubuntu version (use hirsuite or bionic on local arm64/Apple Silicon): hirsute, focal, bionic
ARG VARIANT="hirsute"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends nginx vim npm

# install NodeJS v17.x
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends nodejs

COPY default /etc/nginx/sites-available/default

# Setup npm global path
USER vscode
RUN mkdir ~/.npm-global
RUN npm config set prefix '~/.npm-global'

# Update path with npm global binaries
ENV PATH="~/.npm-global/bin:${PATH}"
# Solve/workaround node V>14.x bug with SSL (@see https://exerror.com/error-error0308010cdigital-envelope-routinesunsupported-in-webpack/)
#ENV NODE_OPTIONS=--openssl-legacy-provider

# Install Vue.js CLI
# RUN npm install -g ampersand
RUN npm install -g @angular/cli
