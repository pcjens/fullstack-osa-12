FROM node:20

# Copy over everything
WORKDIR /usr/src/app
COPY --chown=node:node . .

# Build
RUN npm ci --omit=dev

# Configure the launch command
USER node
CMD ["npm", "start"]
