import React from "react";
import NewIssueClient from "./NewIssueClient";
import getCurrentUser from "@/app/actions/getCurrentUser";

type NewIssueProps = {};

const NewIssue: React.FC<NewIssueProps> = async () => {
  const currentUser = await getCurrentUser();

  return <NewIssueClient currentUser={currentUser} />;
};
export default NewIssue;
