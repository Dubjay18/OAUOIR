import DataRequestForm from "@/components/request-data/DataRequestForm";
import React from "react";

function page() {
  return (
    <div className="min-h-[50vh] container p-4">
      <h1 className={`font-medium text-4xl mb-4`}>Request Data</h1>
      <hr className="my-5" />

      <h4 className="text-xl font-medium">Welcome</h4>

      <p className="text-[#767676E5] text-base my-4">
        Welcome to the Data Request page of the OAU Institute of Research. We
        are committed to providing access to our rich repository of research
        data to support academic, scientific, and community-based initiatives.
        Whether you are a faculty member, student, researcher, or community
        partner, we are here to assist you in obtaining the data you need for
        your projects.
      </p>
      <br />
      <h4 className="text-xl font-medium">How to Request Data</h4>
      <p className="text-[#767676E5] text-base my-4">
        To request data, please follow the steps below:
      </p>
      <ol className="space-y-5 list-decimal ml-4">
        <li>
          Identify your Data needs
          <ul className="list-disc mt-2 ml-4 text-[#767676E5] text-base">
            <li>Clearly outline the specific data you require.</li>
            <li>
              Specify the research project or purpose for which the data will be
              used.
            </li>
          </ul>
        </li>
        <li>
          Complete the data request form
          <ul className="list-disc mt-2 ml-4 text-[#767676E5] text-base">
            <li>
              Fill out the{" "}
              <a href="#data-request-form" className="underline">
                Data Request Form
              </a>{" "}
              with accurate and detailed information.
            </li>
            <li>
              Include details such as the dataset name, time frame, and any
              specific variables or parameters.
            </li>
          </ul>
        </li>
        <li>
          Review and Approval:
          <ul className="list-disc mt-2 ml-4 text-[#767676E5] text-base">
            <li>Your request will be reviewed by our data management team.</li>
            <li>
              We may contact you for additional information or clarification.
            </li>
          </ul>
        </li>
        <li>
          Data Access and Delivery:
          <ul className="list-disc mt-2 ml-4 text-[#767676E5] text-base">
            <li>
              Upon approval, you will receive access to the requested data.
            </li>
            <li>Data will be provided in a secure and appropriate format.</li>
          </ul>
        </li>
      </ol>
      <br />
      <DataRequestForm />
      <br />
      <div>
        <h4>Data Usage Policy:</h4>
        <ul className="list-disc mt-2 ml-4 text-[#767676E5] text-base">
          <li>
            Data obtained from the Institute of Research must be used in
            accordance with ethical guidelines and institutional policies.
          </li>
          <li>
            Proper attribution and citation of data sources are required in any
            publications or presentations resulting from the use of our data.
          </li>
          <li>
            Users must comply with all relevant data protection and privacy
            regulations.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default page;
