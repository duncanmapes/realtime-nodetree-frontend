const S3Plugin = require('webpack-s3-plugin')


const config = {
    plugins: [
      new S3Plugin({
        directory:'dist',
        s3Options: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: 'us-east-1'
        },
        s3UploadOptions: {
          Bucket: process.env.AWS_BUCKET
        },
        // cloudfrontInvalidateOptions: {
        //   DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
        //   Items: ["/*"]
        // }
      })
    ]
  }

  module.exports = config;