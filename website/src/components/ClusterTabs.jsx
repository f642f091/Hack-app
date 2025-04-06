import React from "react";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 10px 18px;
  border-radius: 999px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  background-color: ${({ active, color }) => (active ? color : "#f3f4f6")};
  color: ${({ active }) => (active ? "#000" : "#555")};
  box-shadow: ${({ active }) =>
    active ? "0 4px 10px rgba(0,0,0,0.1)" : "none"};
  transition: 0.2s ease;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

const ClusterTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "Cluster A", label: "Cluster A", color: "#fecaca" },
    { id: "Cluster B", label: "Cluster B", color: "#fef08a" },
    { id: "Cluster C", label: "Cluster C", color: "#fdba74" },
    { id: "Cluster D", label: "Cluster D", color: "#86efac" },
  ];

  return (
    <TabContainer>
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          active={activeTab === tab.id}
          color={tab.color}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabContainer>
  );
};

export default ClusterTabs;
