import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 24px;
  text-align: left;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #fca5a5;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  color: #ef4444;
  margin-bottom: 12px;
`;

const ClusterInfo = styled.p`
  font-weight: 500;
  margin-bottom: 20px;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-top: 1px solid #eee;
`;

const Th = styled.th`
  text-align: left;
  padding: 10px 0;
  color: #888;
  font-size: 0.9rem;
`;

const Td = styled.td`
  padding: 10px 0;
  font-size: 1rem;
  color: #444;
`;

const ClusterCard = ({ cluster }) => (
  <Card>
    <Heading>Cluster {cluster.id}</Heading>
    <ClusterInfo>Cluster Size: {cluster.size}</ClusterInfo>
    <Table>
      <thead>
        <tr>
          <Th>Medication</Th>
          <Th style={{ textAlign: "right" }}>Frequency of Use</Th>
        </tr>
      </thead>
      <tbody>
        {cluster.medications.map((med, i) => (
          <tr key={i}>
            <Td>{med.name}</Td>
            <Td style={{ textAlign: "right" }}>{med.frequency}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Card>
);

export default ClusterCard;
