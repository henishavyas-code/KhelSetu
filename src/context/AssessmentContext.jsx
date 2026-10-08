import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockDataService } from '../services/mockDataService';
import { useSystem } from './SystemContext';

const AssessmentContext = createContext();

export const AssessmentProvider = ({ children }) => {
  const { isOnline, addToOfflineQueue } = useSystem();
  
  const [submissions, setSubmissions] = useState(() => mockDataService.getSubmissions());
  const [athletes, setAthletes] = useState(() => mockDataService.getAthletes());

  useEffect(() => {
    // Subscribe to shared mockDataService changes
    const unsubscribe = mockDataService.subscribe(() => {
      setSubmissions(mockDataService.getSubmissions());
      setAthletes(mockDataService.getAthletes());
    });
    return unsubscribe;
  }, []);

  const addAssessment = (assessmentData) => {
    const newSubmission = mockDataService.saveSubmission(assessmentData, isOnline);
    if (!isOnline) {
      addToOfflineQueue(newSubmission);
    }
    return newSubmission;
  };

  const updateSubmissionStatus = (id, newStatus, reason = null) => {
    mockDataService.updateSubmissionStatus(id, newStatus, reason);
  };

  return (
    <AssessmentContext.Provider value={{
      submissions,
      athletes,
      addAssessment,
      updateSubmissionStatus
    }}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => useContext(AssessmentContext);
