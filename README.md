# PtC Dashboard

PtC Dashboard is a React-based web application designed to facilitate community-led urban governance. This project leverages various modern web technologies to provide a seamless and interactive user experience.

## Table of Contents

- [PtC Dashboard](#ptc-dashboard)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Project](#running-the-project)
    - [Building the Project](#building-the-project)
    - [Deploying the Project](#deploying-the-project)
      - [What happens inside the container](#what-happens-inside-the-container)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)

## Features

- Interactive maps with Mapbox
- Real-time notifications with Socket.io
- Multi-language support with i18next
- Responsive design with Tailwind CSS
- Form handling with Headless UI
- Data visualization and QR code generation

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/ptc-dashboard.git
   cd ptc-dashboard
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

### Running the Project

To start the development server, run:

```sh
npm run dev
```

This will start the Vite development server and you can view the application by navigating to http://localhost:3000 in your web browser.

### Building the Project

To build the project for production, run:

```sh
npm run build
```

The built files will be in the `dist` directory.

### Deploying the Project

`ptc-dashboard` is part of `permissioning-city-engine`. It is going to be deplyed as one of the containers in the `docker-compose.yml` or `docker-compose.prod.yml` according to the deployment environment.

#### What happens inside the container

`docker-entrypoint.sh` is going to run on container start. 

```bash
# docker-entrypoint.sh

#!/bin/bash
set -e

echo "Install packages..."
npm i
echo "Package installation complete!"

echo "Building application..."
npm run build
echo "Application build complete!"

if [ "$NODE_ENV" = "production" ]; then
  # In production mode, the compiled application will be served
  echo "Production environment detected, serving the app..."
  npm i -g serve@14.2.4
  serve -s dist
else
  echo "Non-production environment detected, tailing /dev/null..."
  # In development mode, the on-development application will be served via pm2
  npm i -g pm2@5.4.3
  pm2 start --name "ptc-dashboard" npm -- run start
  pm2 logs
  tail -f /dev/null
fi
```

## Technologies Used

React: A JavaScript library for building user interfaces.
Vite: A fast build tool and development server.
Tailwind CSS: A utility-first CSS framework.
Mapbox GL: A JavaScript library for interactive, customizable vector maps.
Socket.io: A library for real-time web applications.
i18next: An internationalization framework for JavaScript.
Headless UI: Unstyled, fully accessible UI components.
Day.js: A minimalist JavaScript library for date and time manipulation.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
1. Create your Feature Branch (git checkout -b feature/AmazingFeature)
1. Commit your Changes (git commit -m 'Add some AmazingFeature')
1. Push to the Branch (git push origin feature/AmazingFeature)
1. Open a Pull Request
