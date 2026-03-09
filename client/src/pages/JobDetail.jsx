import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  Clock,
  Calendar,
  ArrowLeft,
  Share2,
  Bookmark,
} from "lucide-react";
import apiClient from "../api/apiClient";
import ApplicationForm from "../components/ApplicationForm";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await apiClient.get(`/jobs/${id}`);
        if (response.data.success) {
          setJob(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-[#3B49DF] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-6 py-32 text-center">
        <h2 className="text-3xl font-extrabold mb-4">Job not found</h2>
        <Link to="/" className="text-[#3B49DF] font-bold hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFF] min-h-screen py-12">
      <div className="container mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#3B49DF] font-bold mb-10 transition-colors group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to jobs</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 mb-10">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center border border-gray-50 shadow-sm flex-shrink-0">
                    <img
                      src={
                        "https://images.unsplash.com/photo-1603834305747-b0fb6f8bbfd6?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt={job.company}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h1 className="text-4xl font-extrabold text-[#0D0D0D] mb-3 leading-tight">
                      {job.title}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                      <p className="text-gray-400 font-bold">{job.company}</p>
                      <span className="w-1.5 h-1.5 bg-gray-200 rounded-full hidden md:block"></span>
                      <p className="text-gray-400 font-medium flex items-center gap-1">
                        <MapPin size={18} /> {job.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-[#3B49DF] transition-colors">
                    <Bookmark size={24} />
                  </button>
                  <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-[#3B49DF] transition-colors">
                    <Share2 size={24} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-y border-gray-50 mb-12">
                <div>
                  <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-[0.2em] mb-3">
                    Category
                  </p>
                  <p className="text-[#0D0D0D] font-bold text-lg">
                    {job.category}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-[0.2em] mb-3">
                    Job Type
                  </p>
                  <p className="text-[#3B49DF] font-bold text-lg">{job.type}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-[0.2em] mb-3">
                    Salary
                  </p>
                  <p className="text-[#0D0D0D] font-bold text-lg">
                    {job.salary || "Negotiable"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-[0.2em] mb-3">
                    Posted At
                  </p>
                  <p className="text-[#0D0D0D] font-bold text-lg">
                    {new Date(job.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="prose prose-blue max-w-none">
                <h3 className="text-2xl font-extrabold mb-6">Description</h3>
                <div className="text-gray-500 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                  {job.description}
                </div>
              </div>

              <div className="mt-16 pt-10 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h4 className="text-2xl font-bold mb-2 text-[#0D0D0D]">
                    Start posting jobs today
                  </h4>
                  <p className="text-gray-400 font-medium">
                    Start recruitment with us for better team
                  </p>
                </div>
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="bg-[#3B49DF] text-white px-12 py-5 rounded-2xl font-extrabold text-lg hover:bg-[#2F3BB1] transition-all shadow-xl shadow-blue-100 w-full md:w-auto"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-[#3B49DF] p-10 rounded-[40px] text-white sticky top-10 shadow-xl shadow-blue-100">
              <h3 className="text-2xl font-bold mb-8">About Company</h3>
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center border border-white/20">
                  <img
                    src={job.logo || "https://via.placeholder.com/100"}
                    alt={job.company}
                    className="w-10 h-10 object-contain invert grayscale brightness-200"
                  />
                </div>
                <div>
                  <p className="font-extrabold text-xl leading-tight">
                    {job.company}
                  </p>
                  <p className="text-blue-200 font-medium text-sm">
                    Design Agency
                  </p>
                </div>
              </div>
              <p className="text-blue-100 font-medium leading-relaxed mb-10 opacity-80">
                A leading global firm specializing in {job.category}{" "}
                innovations, fostering a culture of creativity and excellence.
              </p>

              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-200 font-extrabold uppercase tracking-widest opacity-60">
                      Location
                    </p>
                    <p className="font-bold">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Briefcase size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-200 font-extrabold uppercase tracking-widest opacity-60">
                      Industry
                    </p>
                    <p className="font-bold">{job.category}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowApplyModal(true)}
                className="w-full bg-white text-[#3B49DF] px-8 py-5 rounded-2xl font-extrabold text-lg hover:bg-gray-50 transition-all shadow-lg"
              >
                Apply for this job
              </button>
            </div>
          </div>
        </div>
      </div>

      {showApplyModal && (
        <ApplicationForm
          jobTitle={job.title}
          jobId={job._id}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </div>
  );
};

export default JobDetail;
