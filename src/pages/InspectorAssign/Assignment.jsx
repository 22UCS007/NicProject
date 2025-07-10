import React, { useState } from 'react';
import AckTable from './AckTable';
import AssignmentForm from './AssignmentForm';

const Assignment = () => {
  const [selectedAck, setSelectedAck] = useState(null);
  const [viewOnlyForm, setViewOnlyForm] = useState(false);

  const handleSelect = (ackData) => {
    setSelectedAck(ackData);
    setViewOnlyForm(true); // show form only
  };

  const handleBack = () => {
    setSelectedAck(null);
    setViewOnlyForm(false); // show both form + table again
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 space-y-6">
      {/* ✅ Top: Form */}
      <div className="bg-white p-4 rounded shadow">
        {viewOnlyForm ? (
          <AssignmentForm data={selectedAck} onBack={handleBack} />
        ) : (
          <AssignmentForm data={null} isDisabled={true} />
        )}
      </div>

      {/* ✅ Bottom: Table (only when not in form-only mode) */}
      {!viewOnlyForm && (
        <div className="bg-white p-4 rounded shadow">
          <AckTable onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
};

export default Assignment;
