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
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  background-color: ${({ active, color }) => (active ? color : "#eee")};
  color: ${({ active }) => (active ? "#000" : "#555")};
  box-shadow: ${({ active }) =>
    active ? "0 4px 10px rgba(0,0,0,0.1)" : "none"};
  transition: 0.2s all ease;

  &:hover {
    opacity: 0.85;
  }
`;

const ClusterTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 1, label: "Cluster 1", color: "#fca5a5" },
    { id: 2, label: "Cluster 2", color: "#fde68a" },
    { id: 3, label: "Cluster 3", color: "#fdba74" },
    { id: 4, label: "Cluster 4", color: "#86efac" },
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
