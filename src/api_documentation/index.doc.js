const { Router } = require('express');
const { serve, setup } = require('swagger-ui-express');

const docrouter = Router();
import dotenv from 'dotenv';

dotenv.config();
const local = process.env.LOCAL_HOST;
const heroku = process.env.DB_CONNECT;




const options = {
  openapi: '3.0.1',
  info: {
    title: 'My Brand',
    version: '1.0.0',
    description:
      'My Protofolio Backend.',
  },
  host: process.env === 'production' ? heroku : local,
  basePath: '/api',
security: [
  {
    bearerAuth: [],
  }
],
tags: [
      {name: 'Users', description: 'Users'},
      {name: 'Blog', description: 'Blogs'},
      {name: 'Message', description: 'Messages'},
    ],
  paths: {
    '/api/account/signUp': {
      post: {
        tags: ['Users'],
        description: 'User SigUp',
        security: [],
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                username: 'John Doe',
                email: 'admin@gmail.com',
                password: '123456',
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'New User was created successfully',
          },
          400: {
            description: 'Bad Request',
          },
          500: {
              description: 'Internal Server Error'
          }
        },
      },
    },
    '/api/account/login': {
        post: {
        tags: ['Users'],
        description: 'User login',
        security: [],
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                email: 'admin@gmail.com',
                password: '123456',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'successfully',
          },
          400: {
            description: 'Invalid credation',
          },
          500: {
              description: 'Internal Server Error'
          }
        }, 
        } 
    },
    '/api/articles/': {
        get: {
        tags: ['Blog'],
        description: 'Get All Blog Articles',
        parameters: [],
        security: [],
        responses: {
          200: {
            description: 'successfully',
          },
          500: {
              description: 'Internal Server Error'
          }
        }, 
      } 
    },
    '/api/articles/{id}': {
      get: {
        security: [],
      tags: ['Blog'],
      description: 'Get One Blog article by id',
      parameters: [
        {
           "in": "path",
         "name": "id",
          required: true,
        }
      ],
      responses: {
        200: {
          description: 'successfully',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
      } 
  },
  '/api/articles/add':{
    post:{
      tags:['Blog'],
      description:'Create new blog article',
    //   parameters:[
    //   {
    //   "in":"formData",
    //   "name":"title",
    //   "description":"Article title",
    //   required:true
    //    },
    //   {
    //   "in":"formData",
    //   "name":"content",
    //   "description":"Article content",
    //   required:true
    //    },
    //   {
    //   "in":"form",
    //   "name":"photo",
    //   scheme:{
    //   type: 'string',
    //   description: "Article image url",
    //   format: 'binary'
    // },
    //   required:true
    //    },
    //   ],
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/Blog',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'User Not Authorized',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
    }
  },
  '/api/articles/{id}/update':{
    put:{
      tags:['Blog'],
      description:'Update blog article',
      parameters: [
        {
           "in": "path",
         "name": "id",
          required: true,
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Blog',
            },
            example: {
              title: 'testing blog article title update',
              content: 'testing blog article content update',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'User Not Authorized',
        },
        404: {
          description: 'Article doesn\'t exist!',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
    }
  },
  '/api/articles/{id}':{
    delete:{
      tags:['Blog'],
      description:'Delete blog article',
      parameters: [
        {
           "in": "path",
         "name": "id",
          required: true,
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Blog',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'User Not Authorized',
        },
        404: {
          description: 'Article doesn\'t exist!',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
    }
  },
  '/api/articles/{article_id}/comment':{
    post:{
      tags:['Blog'],
      description:'Comment on article blog article',
      parameters: [
        {
          "in": "path",
          "name": "article_id",
           required: true,
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Blog',
            },
            example: {
              comment:"that content is very helpful thanks"
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'Not Authorized',
        },
        404: {
          description: 'Article doesn\'t exist!',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
    }
  },
  '/api/articles/{article_id}/like':{
    post:{
      tags:['Blog'],
      description:'Like on article blog article',
      parameters: [  {
        "in": "path",
        "name": "article_id",
         required: true,
      }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Blog',
            },
            // example: {
            //   article_id:"6251374247c7a6f93bdd52e7",
            // },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'Not Authorized',
        },
        404: {
          description: 'Article doesn\'t exist!',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
    }
  },
  '/api/message/sendMessage/':{
    post:{
      tags:['Message'],
      security:[],
      description:'Sending message',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Message',
            },
            example: {
              name:"John Doe",
              email:"john@gmail.com",
              message:"testing message"
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
    }
  },
  '/api/message/':{
    get:{
      tags:['Message'],
      description:'Getting all messages',
      parameters: [],
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'Not Authorized',
        },
        500: {
            description: 'Internal Server Error'
      },
    }, 
    }
  },
  },
  components: {
    schemas: {
      User: {
        type: 'object',

        properties: {
          id: {
            type: 'string',
            description: 'The auto-generated id of the user',
          },
          username: {
            type: 'string',
            description: "User's names",
          },
          password: {
            type: 'string',
            description: "User's password",
          },
          email: {
            type: 'string',
            description: "User's email",
          },
          role: {
            type: 'string',
            description: "User role",
          },
        },
      },
      Blog: {
        type: 'object',

        properties: {
          title: {
            type: 'string',
            description: "Article title",
          },
          content: {
            type: 'string',
            description: "Article content",
          },
          photo: {
            type: 'string',
            description: "Article image url",
            format: 'binary'
          }
      },
    },
      Message: {
        type:"object",
        
        properties:{
          id: {
            type: 'string',
            description: 'The auto-generated id of the message',
          },
          name: {
            type: 'string',
            description: 'sender name',
          },
          email: {
            type: 'string',
            description: 'sender email',
          },
          message: {
            type: 'string',
            description: 'message content',
          },
        }
      }
     },
  
    securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
},
}

docrouter.use('/', serve, setup(options));

module.exports = docrouter;