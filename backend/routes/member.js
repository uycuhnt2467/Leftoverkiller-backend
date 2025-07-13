import express from "express";
const router = express.Router();

import MemberModifyMethod from "../controllers/member_controller.js";

const memberModifyMethod = new MemberModifyMethod();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new member
 *     description: Register a new user with the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newuser"
 *               hash_password:
 *                 type: string
 *                 example: "password123"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               nickname:
 *                 type: string
 *                 example: "New User"
 *     responses:
 *       201:
 *         description: Member registered successfully.
 *       400:
 *         description: Invalid input data.
 */
router.post("/register", memberModifyMethod.postRegister);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Member login
 *     description: Authenticate a member and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newuser"
 *               hash_password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: A list of favorite recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "abc123xyz"
 *                     status:
 *                       type: string
 *                       example: "Login successful"
 *                     loginMember:
 *                       type: string
 *                       example: "newuser"
 *       401:
 *         description: Unauthorized, invalid credentials.
 */
router.post("/login", memberModifyMethod.postLogin);

/**
 * @swagger
 * /update:
 *   put:
 *     summary: Update member information
 *     description: Update the details of an existing member.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "newemail@example.com"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Member updated successfully.
 *       400:
 *         description: Invalid input data.
 */
router.put("/update", memberModifyMethod.putUpdate);

export default router;
