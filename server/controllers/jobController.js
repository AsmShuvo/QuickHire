const jobService = require('../services/jobService');

class JobController {
  async getAllJobs(req, res) {
    try {
      const filters = {
        category: req.query.category,
        location: req.query.location,
        search: req.query.search
      };
      const jobs = await jobService.getAllJobs(filters);
      res.status(200).json({ success: true, data: jobs });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getJobById(req, res) {
    try {
      const job = await jobService.getJobById(req.params.id);
      if (!job) {
        return res.status(404).json({ success: false, message: 'Job not found' });
      }
      res.status(200).json({ success: true, data: job });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createJob(req, res) {
    try {
      const job = await jobService.createJob(req.body);
      res.status(201).json({ success: true, data: job });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteJob(req, res) {
    try {
      const job = await jobService.deleteJob(req.params.id);
      if (!job) {
        return res.status(404).json({ success: false, message: 'Job not found' });
      }
      res.status(200).json({ success: true, message: 'Job deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new JobController();
