FROM node:20

# Copy over everything
WORKDIR /usr/src/app
COPY --chown=node:node . .

# Build
RUN npm ci --omit=dev

# Configure the launch command
ENV PORT=3000
EXPOSE 3000
USER node
CMD ["npm", "start"]
