require('dotenv').config()
const AWS = require('aws-sdk')

const {S3_BUCKET, AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID} = process.env

module.exports = {
	async getSig(req, res) {
		AWS.config = {
			region: 'us-west-1',
			accessKeyId: AWS_ACCESS_KEY_ID,
			secretAccessKey: AWS_SECRET_ACCESS_KEY
		}

		const objParams = {
			Bucket: S3_BUCKET,
			Key: req.query.filename,
			Expires: 60,
			ContentType: req.query.filetype,
			ACL: 'public-read'
		}

		const s3 = new AWS.S3()

		s3.getSignedUrl('putObject', objParams, (err, data) => {
			if (err) {
				console.log(err)
				return res.end()
			}
			const returnData = {
				signedRequest: data,
				url: `https://s3-us-west-1.amazonaws.com/${S3_BUCKET}/${req.query.filename}`
			}

			res.send(returnData)
		})

	},
	
	async deleteObject(req, res) {
		const db = req.app.get('db')
		const id = +req.params.id
		const s3 = new AWS.S3()

		const deletedContent = await db.deleteContent({id})

		const params = {
			Bucket: S3_BUCKET,
			Key: deletedContent[0].object_key
		}

		s3.deleteObject(params, (err, data) => {
			if (err) console.log(err)
			else {
				res.sendStatus(200)
			}
		})
	}
}