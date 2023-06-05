# Angular Client-Side README

**Note: This README is a work in progress and may not include all the information yet.**

## Description

This repository contains an Angular client-side application built using Angular framework. The application serves as the frontend for the web app, integrating with the server-side API endpoints provided by the NestJS backend. MongoDB is used as the database for storing and retrieving data.

## Features

- Angular Components: The application is built using Angular components, providing a modular and reusable approach to building the user interface.

- Angular Routing: The application utilizes Angular Router to enable navigation between different views and components within the app.

- HTTP Requests: The Angular HttpClient module is used to make HTTP requests to the server-side APIs provided by the NestJS backend.

- Schemas: The application utilizes the following DTOs (Data Transfer Objects) to exchange data with the server-side API:
  - CreateUserDto
  - CreateFreelancerDTO
  - UpdateFreelancerDto
  - CreateRoleDto
  - CreateSkillDTO

- Authentication: The application employs JWT (JSON Web Token) for authentication.

## Installation

To set up and run the Angular client-side application locally, please follow these steps:

1. Clone this repository to your local machine.
2. Install the necessary dependencies by running the following command:
   ```shell
   npm install

3. Configure the server-side API endpoint URLs in the application's configuration files to match your NestJS backend.
Build the Angular app by running

   ```shell
   npm start
   ```
4.Access the application through your browser at http://localhost:4200.

### Screenshot


## Login
![Login](https://github.com/liyanakhrl/cdn-client/raw/master/screenshot/Add%20new%20skillset%20for%20freelance.png)

## Dashboard
![Dashboard](https://github.com/liyanakhrl/cdn-client/raw/master/screenshot/Add%20new%20skillset%20for%20freelance.png)

## Freelancer list
![Freelance list](https://github.com/liyanakhrl/cdn-client/raw/master/screenshot/Add%20new%20skillset%20for%20freelance.png)

## View freelancer
![View freelancer](https://github.com/liyanakhrl/cdn-client/raw/master/screenshot/Add%20new%20skillset%20for%20freelance.png)  

## Add new skillset for freelancer
![Add new skillset for freelance](https://github.com/liyanakhrl/cdn-client/raw/master/screenshot/Add%20new%20skillset%20for%20freelance.png)

# Skillset list
![Skillset list](https://github.com/liyanakhrl/cdn-client/raw/master/screenshot/Add%20new%20skillset%20for%20freelance.png)

## Add new skillset
![Add skills](https://github.com/liyanakhrl/cdn-client/blob/master/screenshot/Add%20skill.png) 

## User page
![User Page](https://github.com/liyanakhrl/cdn-client/raw/master/screenshot/Add%20new%20skillset%20for%20freelance.png)
