# My-curriculum-vitae REST API

My-curriculum-vitae API is a simple REST API developed using Node.js, Express and MongoDB. This API is used to store and display your contact informations, job experiences, education experiences, skills and projects. If you want, you can use [my-curriculum-vitae](https://github.com/SHergibo/my-curriculum-vitae.git) with this API to be able to use all the features of this API directly on your browser.

## Features

- CORS enabled
- Express + MongoDB ([Mongoose](http://mongoosejs.com/))
- Uses [helmet](https://github.com/helmetjs/helmet) to set some HTTP headers for security
- Load environment variables from .env files with [dotenv](https://github.com/rolodato/dotenv-safe)
- Gzip compression with [compression](https://github.com/expressjs/compression)
- Sanitize inputs against query selector injection attacks with [mongo-sanitize](https://github.com/vkarpov15/mongo-sanitize)
- Uses [isomorphic-dompurify](https://www.npmjs.com/package/isomorphic-dompurify) to clean all incoming data before storing them in the database
- Logging with [morgan](https://github.com/expressjs/morgan)
- Authentication and Authorization with [passport](http://passportjs.org)
- Uses [multer](https://www.npmjs.com/package/multer) and [multer-gridfs-storage](https://www.npmjs.com/package/multer-gridfs-storage) to upload files to MongoDb
- Send email with [Nodemailer](https://nodemailer.com/about/) via gmail with [googleapis](https://www.npmjs.com/package/googleapis)

## Requirements

- [Node v16.13+](https://nodejs.org/en/download/current/)
- [MongoDB v4.2](https://docs.mongodb.com/v4.2/installation/)

## Getting Started

#### 1) Clone the repo

```bash
git clone https://github.com/SHergibo/my-curriculum-vitae-api.git
cd my-curriculum-vitae-api
rm -rf .git
```

#### 2) Add your environments data

Rename `development-sample.env` and `production-sample.env` to `development.env` and `production.env`.

In these files, you need to add your `JWT_SECRET`, you can also change your DB name in `MONGO_URI`, for example `mongodb://localhost:27017/my-rest-api`.

In `production.env`, you can add one or multiple urls in `CORS_ORIGIN` for security reasons. Only those urls will have access to the REST API.

For example:
for one url: `CORS_ORIGIN = "www.example.com"`
for multiple urls: `CORS_ORIGIN = ["www.example.com", "www.example2.com"]`

#### 3) Create your SendGrid account to receive email

This API uses [SendGrid](https://sendgrid.com/) to receive emails from the contact form. If you want to receive emails from your contact form, you need to create a SendGrid account, follow the initial step to add a sender email or domain, and then create an API key.

Once you have added a sender email or domain and generated your SendGrid API key, you need to add them in your `development.env` and `production.env`.

For example:
`SENDGRID_FROM = "your sender email or domain here"`
`SENDGRID_API_KEY = "your SendGrid API key here"`

#### 4) Install dependencies

```bash
npm install
```

#### 5) Running the app

Locally

```bash
npm run dev
```

In production

```bash
npm run start
```

## Endpoints

See my-curriculum-vitae-api endpoints [here](https://github.com/SHergibo/my-curriculum-vitae-api/blob/master/readme-api-endpoints/api-endpoints.md)

## License

[MIT License](README.md) - [Sacha Hergibo](https://github.com/SHergibo)
