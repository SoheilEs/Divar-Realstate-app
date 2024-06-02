/**
 * @swagger
 * tags:
 *  name: Options
 *  description: Options Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddOptions:
 *              type: object
 *              required:
 *                  -   title
 *                  -   key
 *                  -   category
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                  key:
 *                      type: string
 *                  category:
 *                      type: string
 *                  guid:
 *                      type: string
 *                  required:
 *                      type: boolean
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   number
 *                          -   string
 *                          -   boolean
 *                          -   array
 *                  enum:
 *                      type: array
 *                      items:
 *                           type: string
 *          UpdateOptions:
 *              type: object
 *          
 *              properties:
 *                  title:
 *                      type: string
 *                  key:
 *                      type: string
 *                  category:
 *                      type: string
 *                  guid:
 *                      type: string
 *                  required:
 *                      type: boolean
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   number
 *                          -   string
 *                          -   boolean
 *                          -   array
 *                  enum:
 *                      type: array
 *                      items:
 *                          type: string
 * 
 */

/**
 * @swagger
 * /options:
 *  post:
 *      summary: Add Options for category
 *      tags:
 *          -   Options
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/AddOptions"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/AddOptions"
 *      responses:
 *          201:
 *              description: success
 *                      
 */

/**
 * @swagger
 * /options/by-category/{categoryId}:
 *  get:
 *      summary: List Options by category id
 *      tags:
 *          -  Options
 *      parameters:
 *          -   in: path
 *              name: categoryId
 *              type: string
 *      responses:
 *          200:
 *              description: success
 *
 *
 */

/**
 * @swagger
 * /options/{id}:
 *  get:
 *      summary: List Options by id
 *      tags:
 *          -  Options
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: success
 *
 *
 */

/**
 * @swagger
 * /options:
 *  get:
 *      summary: List all Options
 *      tags:
 *          -  Options
 *      parameters:
 *          -   in: path
 *              name: List All
 *              type: string
 *      responses:
 *          200:
 *              description: success
 *
 *
 */

/**
 * @swagger
 * /options/by-slug/{slug}:
 *  get:
 *      summary: List Options By Slug
 *      tags:
 *          -  Options
 *      parameters:
 *          -   in: path
 *              name: slug
 *              type: string
 *      responses:
 *          200:
 *              description: success
 *
 *
 */

/**
 * @swagger
 * /options/{id}:
 *  delete:
 *      summary: delete Options by id
 *      tags:
 *          -  Options
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: deleted successfully
 *
 *
 */

/**
 * @swagger
 * /options/{id}:
 *  put:
 *      summary: Update Options for category
 *      tags:
 *          -   Options
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/UpdateOptions"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/UpdateOptions"
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          201:
 *              description: success
 *                      
 */