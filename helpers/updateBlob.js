const { BlobServiceClient } = require("@azure/storage-blob")
const blobServiceClient = BlobServiceClient.fromConnectionString(
  `DefaultEndpointsProtocol=https;
   AccountName=${process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME};
   AccountKey=${process.env.AZURE_BLOB_STORAGE_ACCOUNT_KEY};
   EndpointSuffix=core.windows.net`
)

const sharp = require("sharp")

const updateBlob = async ({
  buffer,
  fileName,
  containerName,
  fileExt = "png",
}) => {
  const containerClient = blobServiceClient.getContainerClient(containerName)
  const blobName = fileName + "." + fileExt
  const blockBlobClient = containerClient.getBlockBlobClient(blobName)

  let fileBuffer = buffer

  if (fileExt === "png") {
    fileBuffer = await sharp(buffer, { failOnError: false }) // Lo agregué por este error "VipsJpeg: Invalid SOS parameters for sequential JPEG"
      .resize(500)
      .toBuffer({ resolveWithObject: true })
    await blockBlobClient.upload(fileBuffer.data, fileBuffer.data.length)
  } else {
    await blockBlobClient.upload(fileBuffer, fileBuffer.length)
  }

  return blobName
}

module.exports = updateBlob
