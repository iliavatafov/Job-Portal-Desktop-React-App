import { Col, message, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { getAllJobs } from "./apis/jobs";

function Home() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllJobs();
      dispatch(HideLoading());
      if (response.success) {
        setData(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title="Welcome to PerfectJobs" />

      <Row gutter={[15, 15]} className="mt-3">
        {data.map((job, i) => {
          return (
            <Col key={i} span={8}>
              <div className="job-card">
                <h3 className="uppercase">{job.title}</h3>
                <div className="light-divider">
                  <div className="d-flex flex-column gap-1">
                    <div className="d-flex justify-content-between mt-1">
                      <span>Company</span>
                      <span>{job.companyName}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Location</span>
                      <span>{job.location}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Salary</span>
                      <span>{job.salary}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Posted On</span>
                      <span>{job.posterOn}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Last date to apply</span>
                      <span>{job.lastDayToApply}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="primary-outline-btn w-100 mt-2"
                onClick={() => navigate(`/job-description/${job.id}`)}
              >
                APPLY NOW
              </button>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Home;
