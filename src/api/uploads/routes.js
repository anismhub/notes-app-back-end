const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/upload/images',
    handler: (request, h) => handler.postUploadImageHeader(request, h),
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },
  {
    method: 'GET',
    path: '/upload/{param*}',
    /* handler perlu binding
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
      },
    },
    */
    handler: (request, h) => {
      const filePath = path.resolve(__dirname, 'file', request.params.param);
      return h.file(filePath);
    },
  },
];

module.exports = routes;
