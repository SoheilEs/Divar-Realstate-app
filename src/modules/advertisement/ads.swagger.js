/**
 * @swagger
 * tags:
 *  name: Ads
 *  description: Ads Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateAds:
 *              type: object
 *              required:
 *                  -   title
 *                  -   content
 *                  -   amount
 *                  -   category
 *                  -   province
 *                  -   city
 *                  -   district
 *                  -   address
 *                  -   coordinate
 *                  -   images
 *              properties:
 *                  title:
 *                      type: string
 *                  content:
 *                      type: string
 *                  amount:
 *                      type: number
 *                  category:
 *                      type: string
 *                  province:
 *                      type: string
 *                  city:
 *                      type: string
 *                  district: 
 *                      type: string
 *                  address: 
 *                      type: string
 *                  coordinate:
 *                      type: array
 *                      items:
 *                          type: number
 *                  images:
 *                      type: array 
 *                      items:
 *                          type: string
 */

/**
 * @swagger
 * /ads:
 *  post:
 *      summary: Create new Ads
 *      tags:
 *          -   Ads
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateAds"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateAds"
 *      responses:
 *          201:
 *              description: success
 *                      
 */

/**
 * @swagger
 * /ads:
 *  get:
 *      summary: List all ads
 *      tags:
 *          -  Ads
 *      responses:
 *          200:
 *              description: success
 *
 *
 */

/**
 * @swagger
 * /ads/{id}:
 *  delete:
 *      summary: Delete ads by id
 *      tags:
 *          -   Ads
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: Category deleted successfully
 */


/**
 * @swagger
 * /ads/{id}:
 *  get:
 *      summary: get ads detial
 *      tags:
 *          -   Ads
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /ads/user-ads:
 *  get:
 *      summary: List all user ads
 *      tags:
 *          -  Ads
 *      responses:
 *          200:
 *              description: success
 *
 *
 */

