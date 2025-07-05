//servidor/services/s3Client.js
const { S3Client } = require("@aws-sdk/client-s3");

let instance = null;

function getS3Client() {
  if (!instance) {
    instance = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  return instance;
}

module.exports = getS3Client;
