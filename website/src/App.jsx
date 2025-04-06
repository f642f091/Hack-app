import React, { useState } from "react";
import styled from "styled-components";
import ClusterTabs from "./components/ClusterTabs";
import ClusterCard from "./components/ClusterCard";

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

const clusters = [
  {
    id: 1,
    size: 192,
    medications: [
      { name: "Mesalamine", frequency: "61%" },
      { name: "Prednisona", frequency: "49%" },
      { name: "Infliximab", frequency: "45%" },
      { name: "Adalimumab", frequency: "38%" },
      { name: "Mercaptopurine", frequency: "26%" },
      { name: "Azathioprine", frequency: "21%" },
      { name: "Ustekinumab", frequency: "18%" },
    ],
  },
];

function App() {
  const [activeTab, setActiveTab] = useState(1);
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
