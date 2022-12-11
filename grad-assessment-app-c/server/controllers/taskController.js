const Task = require('../models/TaskModel');

module.exports = {
	async postTask(req, res, next) {
		try {
			const newTask = await Task.create(req.body);

			res.status(201).json({
				newTask,
			});
		} catch (err) {
			next({
				err,
				msg: 'error from postTasks middleware',
			});
		}
	},

	async getTasks(req, res, next) {
		try {
			const tasks = await Task.find();

			res.status(200).json({
				tasks,
			});
		} catch (err) {
			next({
				err,
				msg: 'error from getTasks middleware',
			});
		}
	},

	async deleteTask(req, res, next) {
		try {
			console.log(req.params.id);
			await Task.findByIdAndDelete(req.params.id);
		} catch (err) {
			next({
				err,
				msg: 'error from deleteTasks middleware',
			});
		}
	},
};
