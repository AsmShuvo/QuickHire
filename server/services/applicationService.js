const Application = require('../models/Application');

class ApplicationService {
  async submitApplication(applicationData) {
    const application = new Application(applicationData);
    return await application.save();
  }

  async getApplicationsByJobId(jobId) {
    return await Application.find({ job_id: jobId }).sort({ created_at: -1 });
  }
}

module.exports = new ApplicationService();
