# ByteSized 
A secure online newsletter platform that delivers curated AI news to users through an authenticated dashboard.

## Overview
byteSized is a full-stack web application that provides users with a personalized dashboard to stay updated on current AI news and trends. The platform emphasizes security with JWT-based authentication, password hashing, and protected API routes.
***Features

## User Authentication: Secure registration and login system with JWT tokens
Password Security: Bcrypt password hashing with salt rounds
Protected Dashboard: Access to AI news content only for authenticated users
Form Validation: Client-side validation for improved user experience
Session Management: Token-based authentication with logout functionality
Secure API: Protected API endpoints accessible only with valid tokens
Responsive UI: Server-side rendering with Handlebars templates

## Tech Stack

Node.js & Express: Server framework and routing
MySQL2: Database for user management and content storage
JWT (jsonwebtoken): Token-based authentication
bcrypt: Password hashing and security
UUID: Unique identifier generation for users

## Frontend

Handlebars (HBS): Server-side templating engine
Client-side JavaScript: Form validation and token management

***Installation***
Prerequisites

Node.js (v14 or higher)
MySQL database
npm or yarn package manager
