const express = require("express");
const router = express.Router();
const { Todo } = require("../models");

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Lấy danh sách tất cả Todos
 *     description: API để lấy toàn bộ danh sách Todos trong hệ thống.
 *     responses:
 *       200:
 *         description: Trả về danh sách Todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   completed:
 *                     type: boolean
 */
router.get("/", async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Thêm một Todo mới
 *     description: API để tạo một Todo mới với tiêu đề được cung cấp.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Trả về Todo mới được tạo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 completed:
 *                   type: boolean
 */
router.post("/", async (req, res) => {
  const { title } = req.body;
  const newTodo = await Todo.create({ title, completed: false });
  res.status(201).json(newTodo);
});

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Cập nhật trạng thái Todo
 *     description: API để cập nhật trạng thái hoàn thành của Todo.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của Todo cần cập nhật.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Trả về Todo đã cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 completed:
 *                   type: boolean
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const todo = await Todo.findByPk(id);
  if (todo) {
    todo.completed = completed;
    await todo.save();
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Xóa một Todo
 *     description: API để xóa một Todo dựa trên ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của Todo cần xóa.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xác nhận Todo đã bị xóa
 *       404:
 *         description: Không tìm thấy Todo
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByPk(id);
  if (todo) {
    await todo.destroy();
    res.json({ message: "Todo deleted" });
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

module.exports = router;
