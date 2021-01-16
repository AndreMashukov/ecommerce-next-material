# Dockerfile

# base image
FROM node:alpine

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 3000
CMD npm run start

# # stage1 as builder
# FROM node:10-alpine as builder

# # copy the package.json to install dependencies
# COPY package.json package-lock.json ./

# # Install the dependencies and make the folder
# RUN npm install && mkdir /ecommerce-next-material && mv ./node_modules ./ecommerce-next-material

# WORKDIR /ecommerce-next-material

# COPY . .

# # Build the project and copy the files
# RUN npm run build


# FROM nginx:alpine

# #!/bin/sh

# COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# ## Remove default nginx index page
# RUN rm -rf /usr/share/nginx/html/*

# # Copy from the stahg 1
# COPY --from=builder /ecommerce-next-material/build /usr/share/nginx/html

# EXPOSE 3000 80

# ENTRYPOINT ["nginx", "-g", "daemon off;"]