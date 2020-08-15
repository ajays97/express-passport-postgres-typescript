FROM node:12-alpine

ENV ENV_NAME dev
ENV NODE_ENV dev

# Create Directory for the Container
WORKDIR /usr/src/boilerplate

# Only copy the package.json file to work directory
COPY package.json yarn.lock ./
# Install all Packages
RUN yarn install

# Copy all other source code to work directory
ADD . /usr/src/boilerplate

# Start
EXPOSE 8000
CMD ["yarn", "start"]
