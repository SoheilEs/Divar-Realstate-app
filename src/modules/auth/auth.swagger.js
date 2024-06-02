/**
 * @swagger
 * tags:
 *  name: Authorization
 *  description: Auth module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          SendOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                  code:
 *                      type: string
 */

/**
 * @swagger
 * /auth/send-otp:
 *  post:
 *      summary: login with OTP in this end-point
 *      tags:
 *          -   Authorization
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/SendOTP"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/SendOTP"
 *      responses:
 *          200:
 *              description: Success
 *                      
 */

/**
 * @swagger
 * /auth/check-otp:
 *  post:
 *      summary: check OTP for loging user end-point
 *      tags:
 *          -   Authorization
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CheckOTP"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CheckOTP"
 *      responses:
 *          200:
 *              description: success
 *                      
 */