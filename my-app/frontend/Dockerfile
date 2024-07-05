FROM node:20 AS builder

# Copy over everything
WORKDIR /usr/src/app
COPY . .

# Build dist
RUN npm ci
RUN npm run build
RUN npm prune --omit=dev

# Finally, create a slim, just-the-needed-bits image
FROM nginx:1.25-alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
