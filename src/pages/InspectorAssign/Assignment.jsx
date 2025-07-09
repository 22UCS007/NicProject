import React, { useState } from 'react';
import AckTable from './AckTable';
import AssignmentForm from './AssignmentForm';

const Assignment = () => {
  const [selectedAck, setSelectedAck] = useState(null);

  const handleSelect = (ackData) => {
    setSelectedAck(ackData);
  };

  const handleBack = () => {
    setSelectedAck(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!selectedAck ? (
        // CENTER ONLY AckTable
        <div className="flex justify-center items-center h-screen">
          <AckTable onSelect={handleSelect} />
        </div>
      ) : (
        <div className="p-4">
          <AssignmentForm data={selectedAck} onBack={handleBack} />
        </div>
      )}
    </div>
  );
};

export default Assignment;
