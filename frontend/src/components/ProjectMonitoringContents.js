import React from "react";
import ProjectMonitoringAssign from "./ProjectMonitoringAssign";
import ProjectMonitoringContract from "./ProjectMonitoringContract";
import ProjectMonitoringSign from "./ProjectMonitoringSign";

const ProjectMonitoringContents = ({pjtNo, companyNo}) => {

  return (
    <div style={{ display: "flex", justifyContent: "center" }} >
      <ProjectMonitoringContract pjtNo={pjtNo} companyNo={companyNo} />
      <ProjectMonitoringAssign pjtNo={pjtNo} companyNo={companyNo} />
      <ProjectMonitoringSign pjtNo={pjtNo} companyNo={companyNo} />
    </div>
  );
};

export default ProjectMonitoringContents;
