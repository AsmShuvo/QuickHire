const Job = require('../models/Job');

class JobService {
  async getAllJobs(filters = {}) {
    const query = {};
    if (filters.category) query.category = filters.category;
    if (filters.location) query.location = new RegExp(filters.location, 'i');
    if (filters.search) {
      query.$or = [
        { title: new RegExp(filters.search, 'i') },
        { company: new RegExp(filters.search, 'i') }
      ];
    }
    return await Job.find(query).sort({ created_at: -1 });
  }

  async getJobById(id) {
    return await Job.findById(id);
  }

  async createJob(jobData) {
    const job = new Job(jobData);
    return await job.save();
  }

  async deleteJob(id) {
    return await Job.findByIdAndDelete(id);
  }
}

module.exports = new JobService();
