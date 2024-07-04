FROM node:20 AS tester

# Copy over everything
WORKDIR /usr/src/app
COPY . .

# Install deps and test
ENV VITE_BACKEND_URL=http://localhost:3000
RUN npm ci
RUN npm test

FROM node:20 AS builder

# Copy over the source and dependencies from the tests
WORKDIR /usr/src/app
COPY --from=tester /usr/src/app .

# Build dist
ENV VITE_BACKEND_URL=http://localhost:3000
RUN npm run build
RUN npm prune --omit=dev

# Finally, create a slim, just-the-needed-bits image
FROM nginx:1.25-alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
