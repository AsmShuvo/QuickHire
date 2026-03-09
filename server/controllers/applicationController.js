const applicationService = require('../services/applicationService');

class ApplicationController {
  async submitApplication(req, res) {
    try {
      const application = await applicationService.submitApplication(req.body);
      res.status(201).json({ success: true, data: application });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getApplicationsByJobId(req, res) {
    try {
      const applications = await applicationService.getApplicationsByJobId(req.params.jobId);
      res.status(200).json({ success: true, data: applications });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new ApplicationController();
