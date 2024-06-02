/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              required:
 *                  -   name
 *                  -   icon
 *              properties:
 *                  name:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  icon:
 *                      type: string
 *                  parent:
 *                      type: string
 */

/**
 * @swagger
 * /category:
 *  post:
 *      summary: Create new Category
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateCategory"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateCategory"
 *      responses:
 *          201:
 *              description: success
 *                      
 */

/**
 * @swagger
 * /category:
 *  get:
 *      summary: List all Categories
 *      tags:
 *          -  Category
 *      responses:
 *          200:
 *              description: success
 *
 *
 */

/**
 * @swagger
 * /category/{id}:
 *  delete:
 *      summary: Delete category and its all options by id
 *      tags:
 *          -   Category
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: Category deleted successfully
 */
