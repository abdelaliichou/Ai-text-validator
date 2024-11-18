FROM node:18-alpine

WORKDIR /HeReFaNMI

COPY public/ /HeReFaNMI/public
COPY src/ /HeReFaNMI/src
COPY package.json /HeReFaNMI/

# after running npm install, the node modules + the package-lock.json will be both downloaded
# In this case, it installs all the dependencies specified in the package.json file. This is 
# why we did not copy the node_modules folder into the working directory. The folder will be 
# created after this command gets executed.
RUN npm install

CMD ["npm","start"]
