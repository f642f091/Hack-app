import React, { useState } from "react";
import styled from "styled-components";
import ClusterTabs from "./components/ClusterTabs";
import ClusterCard from "./components/ClusterCard";

// Styled container that fills the screen
const AppContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #fffbe0, #d0f0ff);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  box-sizing: border-box;
`;

// Content block centered with max width
const Content = styled.div`
  max-width: 700px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #555;
  margin-bottom: 30px;
`;

// Hardcoded clusters from CSV data
const clusters = [
  {
    id: "Cluster A",
    size: "N/A",
    medications: [
      { name: "Azathioprine", frequency: "17.3%" },
      { name: "Prednisone", frequency: "8.5%" },
      { name: "Vitamin D3", frequency: "8.3%" },
      { name: "Infliximab", frequency: "5.9%" },
      { name: "Mercaptopurine", frequency: "5.9%" },
      { name: "Vitamin d", frequency: "5.4%" },
      { name: "Allopurinol", frequency: "4.5%" },
    ],
  },
  {
    id: "Cluster B",
    size: "N/A",
    medications: [
      { name: "Prednisone", frequency: "8.6%" },
      { name: "Azathioprine", frequency: "8.1%" },
      { name: "Mesalazine", frequency: "5.4%" },
      { name: "Prednisolone", frequency: "4.7%" },
      { name: "Omeprazole", frequency: "4.0%" },
      { name: "Pentasa", frequency: "4.0%" },
      { name: "Asacol", frequency: "3.1%" },
    ],
  },
  {
    id: "Cluster C",
    size: "N/A",
    medications: [
      { name: "Mesalazine", frequency: "7.5%" },
      { name: "Prednisone", frequency: "7.0%" },
      { name: "Pentasa", frequency: "6.0%" },
      { name: "Prednisolone", frequency: "5.6%" },
      { name: "Dolocatilcodeina", frequency: "5.5%" },
      { name: "Entocord", frequency: "5.5%" },
      { name: "Lialda", frequency: "5.5%" },
    ],
  },
  {
    id: "Cluster D",
    size: "N/A",
    medications: [
      { name: "Pentasa", frequency: "9.7%" },
      { name: "Prednisone", frequency: "7.8%" },
      { name: "Humira", frequency: "5.6%" },
      { name: "Vitamin b12", frequency: "5.4%" },
      { name: "Mercaptopurine", frequency: "5.3%" },
      { name: "Remicade", frequency: "5.1%" },
      { name: "Melatonin", frequency: "4.5%" },
    ],
  },
];

function App() {
  const [activeTab, setActiveTab] = useState("Cluster A");
  const selectedCluster = clusters.find((c) => c.id === activeTab);

  return (
    <AppContainer>
      <Content>
        <Title>IBD Patient Clusters</Title>
        <Subtitle>
          Explore the clusters and see what medications people in each cluster use
        </Subtitle>
        <ClusterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {selectedCluster && <ClusterCard cluster={selectedCluster} />}
      </Content>
    </AppContainer>
  );
}

export default App;
