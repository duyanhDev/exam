import "./DashBoar.scss";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

import { getOverview } from "../../../services/apiService";
import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
const DashBoar = (props) => {
  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDaTaChart] = useState([]);
  useEffect(() => {
    fetchDataOverview();
  }, []);
  const { t } = useTranslation();
  const fetchDataOverview = async () => {
    let res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverView(res.DT);
      //process chart data
      let Qz = 0,
        Qs = 0,
        As = 0;
      Qz = res?.DT?.others?.countQuiz ?? 0; // neue bi undifle
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;
      const data = [
        {
          name: "Quizzes",
          Qz: Qz,
        },
        {
          name: "Questions",
          Qs: Qs,
        },
        {
          name: "Answer",
          As: As,
        },
      ];
      setDaTaChart(data);
    }
  };

  console.log("dataOverview", dataOverView);
  return (
    <div className="dashboard-container">
      <div className="title">Analytics Dashboard</div>
      <div className="content">
        <div className="c-left">
          <div className="chart">
            <span className="chart-1">{t("admin.boar.totalUser")}</span>
            <span className="chart-2">
              {dataOverView && dataOverView.users && dataOverView.users.total
                ? dataOverView.users.total
                : 0}
            </span>
          </div>
          <div className="chart">
            <span className="chart-1">{t("admin.boar.totalQuiz")}</span>
            <span className="chart-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuiz
                ? dataOverView.others.countQuiz
                : 0}
            </span>
          </div>

          <div className="chart">
            <span className="chart-1">{t("admin.boar.totalQuestion")}</span>
            <span className="chart-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuestions
                ? dataOverView.others.countQuestions
                : 0}
            </span>
          </div>
          <div className="chart">
            <span className="chart-1">{t("admin.boar.totalAn")}</span>
            <span className="chart-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countAnswers
                ? dataOverView.others.countAnswers
                : 0}
            </span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="95%" height="100%">
            <BarChart data={dataChart}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#fcb12a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoar;
