import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AssessmentDashboard from '../components/AssessmentDashboard';
import AssessmentQuestion from '../components/AssessmentQuestion';
import AssessmentResult from '../components/AssessmentResult';
import Timer from '../components/Timer';
import AdminAssessmentManager from '../components/AdminAssessmentManager';
import { ASSESSMENT_TYPES, TIMER_TYPES, createAssessment, createQuestion } from '../utils/types';
import { toast } from 'react-hot-toast';

const SelfAssessmentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState('dashboard');

  // Ensure dashboard view is shown when component mounts
  useEffect(() => {
    setView('dashboard');
  }, []);

  console.log("Current View:", view);

  const [assessments, setAssessments] = useState(() => {
    const savedAssessments = localStorage.getItem('assessments');
    return savedAssessments ? JSON.parse(savedAssessments) : [];
  });
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [couponInput, setCouponInput] = useState('');
  const [currentSelectedAssessment, setCurrentSelectedAssessment] = useState(null);
  const [assessmentHistory, setAssessmentHistory] = useState(() => {
    const savedHistory = localStorage.getItem('assessmentHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const [selectedPaymentCategory, setSelectedPaymentCategory] = useState(null);

  // Mock payment transactions data (frontend only simulation)
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [statusFilter, setStatusFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Save assessments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('assessments', JSON.stringify(assessments));
  }, [assessments]);

  // Save assessment history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('assessmentHistory', JSON.stringify(assessmentHistory));
  }, [assessmentHistory]);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleStartAssessment = (assessment) => {
    // If not logged in and assessment is not free, prompt user to log in
    if (!user?.id && !assessment.isFree) {
        toast.error('Please log in to access this paid assessment.');
        return;
    }

    if (!assessment.isFree) {
      setCurrentSelectedAssessment(assessment);

      // Check if user already has a completed payment for this assessment
      const existingCompletedPayment = transactions.find(
        txn => txn.userId === user?.id && txn.assessmentId === assessment.id && txn.status === 'completed'
      );
      if (existingCompletedPayment) {
        toast.success('Assessment already purchased. Starting now!');
        setCurrentAssessment(assessment);
        setCurrentQuestion(0);
        setAnswers({});
        setStartTime(new Date());
        setView('assessment');
        return;
      }

      // Check if there's a pending payment for this assessment
      const existingPendingPayment = transactions.find(
        txn => txn.userId === user?.id && txn.assessmentId === assessment.id && txn.status === 'pending'
      );
      if (existingPendingPayment) {
        toast('Your payment is pending. Please wait for admin confirmation.', {
          icon: '⏳',
          style: {
            background: '#1A1A1A',
            color: '#E5E5E5',
            border: '1px solid #FFD700',
          },
        });
        setView('paymentPending');
        return;
      }

      // If no completed or pending payment, proceed to payment screen
      setView('payment');
      return;
    }
    setCurrentAssessment(assessment);
    setCurrentQuestion(0);
    setAnswers({});
    setStartTime(new Date());
    setView('assessment');
  };

  const handleCouponSubmit = () => {
    if (couponInput === currentSelectedAssessment?.couponCode) {
      toast.success('Coupon applied! Starting assessment...');
      // Create a completed transaction for coupon-based access
      setTransactions(prev => [
        ...prev,
        {
          id: `txn_${Date.now()}`,
          userId: user?.id || 'guest',
          assessmentId: currentSelectedAssessment.id,
          amount: 0, // Coupon payment is free
          status: 'completed',
          date: new Date().toISOString(),
          description: `${currentSelectedAssessment.title} (Coupon Access)`,
        },
      ]);
      setCurrentAssessment(currentSelectedAssessment);
      setCurrentQuestion(0);
      setAnswers({});
      setStartTime(new Date());
      setView('assessment');
      setCouponInput('');
      setCurrentSelectedAssessment(null);
    } else {
      toast.error('Invalid coupon code.');
    }
  };

  const handleSimulatePayment = () => {
    if (!currentSelectedAssessment || !user?.id) {
      toast.error('Error: No assessment selected or user not logged in.');
      handleBackToDashboard();
      return;
    }

    const newTransaction = {
      id: `txn_${Date.now()}`,
      userId: user.id,
      assessmentId: currentSelectedAssessment.id,
      amount: currentSelectedAssessment.price || 0,
      status: 'pending',
      date: new Date().toISOString(),
      description: `${currentSelectedAssessment.title} Payment`,
    };

    setTransactions(prev => [...prev, newTransaction]);
    toast.success('Payment simulated! Awaiting admin confirmation.');

    setView('paymentPending'); // Redirect to payment pending view
    setCouponInput('');
    setCurrentSelectedAssessment(null);
    setSelectedPaymentOption(null);
  };

  const handleSimulateIncomingPayment = () => {
    const randomUserId = `user_${Math.floor(Math.random() * 10000)}`;
    const randomAssessmentId = `assessment_${Math.floor(Math.random() * 100)}`;
    const randomAmount = (Math.random() * (50 - 5) + 5).toFixed(2);

    const newTransaction = {
      id: `txn_${Date.now()}`,
      userId: randomUserId,
      assessmentId: randomAssessmentId,
      amount: parseFloat(randomAmount),
      status: 'pending',
      date: new Date().toISOString(),
      description: `Simulated Payment for Assessment ${randomAssessmentId}`,
    };

    setTransactions(prev => [...prev, newTransaction]);
    toast.success('New incoming payment simulated!');
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (!currentAssessment || !currentAssessment.questions) {
      handleBackToDashboard();
      return;
    }

    if (currentQuestion < currentAssessment.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleCompleteAssessment();
    }
  };

  const handleCompleteAssessment = () => {
    if (!currentAssessment || !startTime) {
      handleBackToDashboard();
      return;
    }

    const endTime = new Date();
    const timeSpent = (endTime - startTime) / 1000; // in seconds

    const result = {
      assessmentId: currentAssessment.id,
      assessmentTitle: currentAssessment.title,
      score: calculateScore(),
      timeSpent,
      completedAt: endTime.toISOString(),
      answers
    };

    setAssessmentHistory(prev => [...prev, result]);
    setView('result');
  };

  const calculateScore = () => {
    if (!currentAssessment || !currentAssessment.questions) {
      return 0;
    }

    let totalPoints = 0;
    let earnedPoints = 0;

    currentAssessment.questions.forEach(question => {
      if (question.type === ASSESSMENT_TYPES.POINT_BASED) {
        totalPoints += question.points;
        if (answers[question.id] === question.correctAnswer) {
          earnedPoints += question.points;
        }
      } else if (question.type === ASSESSMENT_TYPES.LIKERT) {
        totalPoints += 5; // Max score for Likert
        earnedPoints += parseInt(answers[question.id]) || 0;
      }
    });

    return totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  };

  const handleSaveAssessment = (assessment) => {
    setAssessments(prev => {
      const existingIndex = prev.findIndex(a => a.id === assessment.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = assessment;
        return updated;
      }
      return [...prev, assessment];
    });
    toast.success('Assessment saved successfully!');
    setView('dashboard'); // Return to dashboard after saving
  };

  const handleDeleteAssessment = (assessmentId) => {
    setAssessments(prev => prev.filter(a => a.id !== assessmentId));
    toast.success('Assessment deleted successfully!');
  };

  const handleCreateNewAssessment = () => {
    setView('admin');
  };

  const handleBackToDashboard = () => {
    console.log('handleBackToDashboard called');
    // Reset all assessment-related states
    setCurrentAssessment(null);
    setCurrentQuestion(0);
    setAnswers({});
    setStartTime(null);
    setCurrentSelectedAssessment(null);
    setSelectedPaymentOption(null);
    setSelectedPaymentCategory(null);
    setCouponInput('');
    
    // Set view to dashboard instead of navigating
    setView('dashboard');
  };

  // Simulated refund function
  const handleRefund = (transactionId) => {
    setTransactions(prev =>
      prev.map(txn =>
        txn.id === transactionId ? { ...txn, status: 'refunded' } : txn
      )
    );
    toast.success(`Refund simulated for transaction ${transactionId}!`);
  };

  // Simulated confirm payment function
  const handleConfirmPayment = (transactionId) => {
    setTransactions(prev =>
      prev.map(txn =>
        txn.id === transactionId ? { ...txn, status: 'completed' } : txn
      )
    );
    toast.success(`Payment for transaction ${transactionId} confirmed!`);
  };

  // Filter transactions based on state
  const filteredTransactions = transactions.filter(txn => {
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
    const matchesUser = userFilter === '' || txn.userId.toLowerCase().includes(userFilter.toLowerCase());
    const matchesDate = dateFilter === '' || txn.date.startsWith(dateFilter);
    return matchesStatus && matchesUser && matchesDate;
  });

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Self Assessments</h1>
              {user?.role === 'admin' && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCreateNewAssessment}
                    className="btn-primary"
                    type="button"
                  >
                    Manage Assessments
                  </button>
                  <button
                    onClick={() => setView('adminPayments')}
                    className="btn-secondary"
                    type="button"
                  >
                    Manage Payments
                  </button>
                </div>
              )}
            </div>
            <AssessmentDashboard
              assessments={assessments}
              history={assessmentHistory}
              onStartAssessment={handleStartAssessment}
              onCreateNewAssessment={() => setView('admin')}
              isAdmin={user?.role === 'admin'}
            />
          </div>
        );

      case 'assessment':
        if (!currentAssessment || !currentAssessment.questions || !currentAssessment.questions[currentQuestion]) {
          return (
            <div className="space-y-6">
              <button
                onClick={handleBackToDashboard}
                className="text-blue-600 hover:text-blue-500"
              >
                ← Back to Dashboard
              </button>
              <div className="text-red-500">Error: Assessment not found or invalid.</div>
            </div>
          );
        }

        const currentQuestionData = currentAssessment.questions[currentQuestion];
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBackToDashboard}
                className="text-blue-600 hover:text-blue-500"
              >
                ← Back to Dashboard
              </button>
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {currentAssessment.questions.length}
              </div>
            </div>

            {currentAssessment.timerType === TIMER_TYPES.FULL_TEST && (
              <div className="bg-white shadow rounded-lg p-4">
                <Timer
                  initialTime={currentAssessment.totalTime * 60}
                  onTimeUp={handleCompleteAssessment}
                  isActive={true}
                />
              </div>
            )}

            <AssessmentQuestion
              question={currentQuestionData}
              onAnswer={handleAnswer}
              answer={answers[currentQuestionData.id]}
              onNext={handleNextQuestion}
              isLastQuestion={currentQuestion === currentAssessment.questions.length - 1}
              timerType={currentAssessment.timerType}
              timeLimit={currentAssessment.totalTime}
            />
          </div>
        );

      case 'result':
        if (!currentAssessment) {
          return (
            <div className="space-y-6">
              <button
                onClick={handleBackToDashboard}
                className="text-blue-600 hover:text-blue-500"
              >
                ← Back to Dashboard
              </button>
              <div className="text-red-500">Error: Assessment results not found.</div>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <button
              onClick={handleBackToDashboard}
              className="text-blue-600 hover:text-blue-500"
            >
              ← Back to Dashboard
            </button>
            <AssessmentResult
              assessment={currentAssessment}
              score={calculateScore()}
              answers={answers}
              timeSpent={(new Date() - startTime) / 1000}
            />
          </div>
        );

      case 'payment':
        if (!currentSelectedAssessment) {
          return (
            <div className="space-y-6">
              <button
                onClick={handleBackToDashboard}
                className="text-blue-600 hover:text-blue-500"
              >
                ← Back to Dashboard
              </button>
              <div className="text-red-500">Error: No assessment selected for payment.</div>
            </div>
          );
        }

        return (
          <div className="bg-white shadow rounded-lg p-6 space-y-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unlock "{currentSelectedAssessment.title}"</h2>
            <p className="text-gray-700">This assessment is not free. Please complete payment or enter a valid coupon code to proceed.</p>

            {currentSelectedAssessment.couponCode && (
              <div className="space-y-2">
                <label htmlFor="couponCodeInput" className="block text-sm font-medium text-gray-700">Enter Coupon Code</label>
                <input
                  type="text"
                  id="couponCodeInput"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., DISC2024"
                />
                <button
                  onClick={handleCouponSubmit}
                  className="btn-primary w-full"
                >
                  Apply Coupon
                </button>
              </div>
            )}

            <div className="border-t pt-4 mt-4">
              <p className="text-gray-700 mb-2">Choose a payment method:</p>

              {/* Step 1: Choose Payment Category (Cards, UPI, Wallets) */}
              {!selectedPaymentCategory && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <button
                    onClick={() => {
                      setSelectedPaymentCategory('cards');
                      setSelectedPaymentOption(null); // Reset sub-option
                    }}
                    className={`btn-tertiary flex flex-col items-center justify-center p-4 ${selectedPaymentCategory === 'cards' ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <i className="fas fa-credit-card text-2xl mb-2"></i>
                    <span>Cards</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPaymentCategory('upi');
                      setSelectedPaymentOption(null); // Reset sub-option
                    }}
                    className={`btn-tertiary flex flex-col items-center justify-center p-4 ${selectedPaymentCategory === 'upi' ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <i className="fas fa-qrcode text-2xl mb-2"></i>
                    <span>UPI</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPaymentCategory('wallets');
                      setSelectedPaymentOption(null); // Reset sub-option
                    }}
                    className={`btn-tertiary flex flex-col items-center justify-center p-4 ${selectedPaymentCategory === 'wallets' ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <i className="fas fa-wallet text-2xl mb-2"></i>
                    <span>Wallets</span>
                  </button>
                </div>
              )}

              {selectedPaymentCategory && (
                <button
                  onClick={() => {
                    setSelectedPaymentCategory(null);
                    setSelectedPaymentOption(null);
                  }}
                  className="text-blue-600 hover:text-blue-500 mb-4 block"
                >
                  ← Back to Payment Categories
                </button>
              )}

              {/* Step 2: Choose Specific Payment Option based on Category */}
              {selectedPaymentCategory === 'cards' && (
                <div className="space-y-4">
                  <p className="text-gray-700 mb-2">Choose Card Type:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <button
                      onClick={() => setSelectedPaymentOption('credit_card')}
                      className={`btn-tertiary flex flex-col items-center justify-center p-4 ${selectedPaymentOption === 'credit_card' ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <i className="far fa-credit-card text-2xl mb-2"></i>
                      <span>Credit Card</span>
                    </button>
                    <button
                      onClick={() => setSelectedPaymentOption('debit_card')}
                      className={`btn-tertiary flex flex-col items-center justify-center p-4 ${selectedPaymentOption === 'debit_card' ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <i className="fas fa-credit-card text-2xl mb-2"></i>
                      <span>Debit Card</span>
                    </button>
                  </div>
                  {(selectedPaymentOption === 'credit_card' || selectedPaymentOption === 'debit_card') && (
                    <div className="space-y-3 mb-4">
                      <h4 className="font-medium text-gray-800">Enter Card Details (Simulated)</h4>
                      <div>
                        <label htmlFor="cardNumber" className="sr-only">Card Number</label>
                        <input type="text" id="cardNumber" placeholder="Card Number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="expiryDate" className="sr-only">Expiry Date</label>
                          <input type="text" id="expiryDate" placeholder="MM/YY" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="sr-only">CVV</label>
                          <input type="text" id="cvv" placeholder="CVV" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="cardName" className="sr-only">Cardholder Name</label>
                        <input type="text" id="cardName" placeholder="Cardholder Name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedPaymentCategory === 'upi' && (
                <div className="space-y-4">
                  <p className="text-gray-700 mb-2">Choose UPI App or Enter UPI ID:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <button
                      onClick={() => setSelectedPaymentOption('gpay')}
                      className={`btn-tertiary flex flex-col items-center justify-center p-4 ${selectedPaymentOption === 'gpay' ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <i className="fab fa-google-pay text-2xl mb-2"></i>
                      <span>GooglePay</span>
                    </button>
                    <button
                      onClick={() => setSelectedPaymentOption('phonepay')}
                      className={`btn-tertiary flex flex-col items-center justify-center p-4 ${selectedPaymentOption === 'phonepay' ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <i className="fas fa-mobile-alt text-2xl mb-2"></i>
                      <span>PhonePay</span>
                    </button>
                    <button
                      onClick={() => setSelectedPaymentOption('paytm')}
                      className={`btn-tertiary flex flex-col items-center justify-center p-4 ${selectedPaymentOption === 'paytm' ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <i className="fas fa-money-bill-alt text-2xl mb-2"></i>
                      <span>Paytm</span>
                    </button>
                    <button
                      onClick={() => setSelectedPaymentOption('other_upi_qr')}
                      className={`btn-tertiary flex flex-col items-center justify-center p-4 ${selectedPaymentOption === 'other_upi_qr' ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <i className="fas fa-qrcode text-2xl mb-2"></i>
                      <span>Other UPI (QR)</span>
                    </button>
                  </div>
                  {(selectedPaymentOption === 'gpay' || selectedPaymentOption === 'phonepay' || selectedPaymentOption === 'paytm' || selectedPaymentOption === 'other_upi_qr') && (
                    <div className="text-center space-y-3 mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                      <h4 className="font-medium text-gray-800">Scan QR Code to Pay (Simulated)</h4>
                      <div className="w-32 h-32 bg-gray-200 mx-auto flex items-center justify-center text-gray-500 text-xs rounded-md">
                        QR Code Placeholder
                      </div>
                      {selectedPaymentOption === 'other_upi_qr' && (
                        <div>
                          <label htmlFor="upiIdInput" className="sr-only">Enter UPI ID (Optional)</label>
                          <input type="text" id="upiIdInput" placeholder="Enter UPI ID (Optional)" className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                      )}
                      <p className="text-sm text-gray-600">Open your UPI app and scan this code to proceed.</p>
                    </div>
                  )}
                </div>
              )}

              {selectedPaymentCategory === 'wallets' && (
                <div className="space-y-4">
                  <p className="text-gray-700 mb-2">Choose Wallet:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <button
                      onClick={() => setSelectedPaymentOption('wallet_a')}
                      className={`btn-tertiary flex flex-col items-center justify-center p-4 ${selectedPaymentOption === 'wallet_a' ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <i className="fas fa-wallet text-2xl mb-2"></i>
                      <span>Wallet A (Simulated)</span>
                    </button>
                    <button
                      onClick={() => setSelectedPaymentOption('wallet_b')}
                      className={`btn-tertiary flex flex-col items-center justify-center p-4 ${selectedPaymentOption === 'wallet_b' ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <i className="fas fa-wallet text-2xl mb-2"></i>
                      <span>Wallet B (Simulated)</span>
                    </button>
                  </div>
                  {(selectedPaymentOption === 'wallet_a' || selectedPaymentOption === 'wallet_b') && (
                    <div className="text-center space-y-3 mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                      <h4 className="font-medium text-gray-800">Wallet Payment (Simulated)</h4>
                      <p className="text-sm text-gray-600">You would be redirected to the {selectedPaymentOption === 'wallet_a' ? 'Wallet A' : 'Wallet B'} payment page.</p>
                      <button
                        onClick={handleSimulatePayment}
                        className="btn-primary w-full mt-2"
                      >
                        Proceed with Wallet
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Simulate Payment button - only show if a specific payment option is selected */}
              {selectedPaymentOption && (
                <div className="mt-4">
                  <p className="text-gray-700 mb-2">Ready to proceed?</p>
                  <button
                    onClick={handleSimulatePayment}
                    className="btn-primary w-full"
                  >
                    Simulate Payment for {currentSelectedAssessment.title}
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleBackToDashboard}
              className="text-blue-600 hover:text-blue-500 w-full mt-4"
            >
              ← Back to Dashboard
            </button>
          </div>
        );

      case 'admin':
        if (user?.role !== 'admin') {
          return (
            <div className="text-red-500">
              Access Denied. Admin privileges required.
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Manage Assessments</h2>
              <button
                onClick={handleBackToDashboard}
                className="text-blue-600 hover:text-blue-500"
              >
                ← Back to Dashboard
              </button>
            </div>
            <AdminAssessmentManager
              assessments={assessments}
              onSave={handleSaveAssessment}
              onDelete={handleDeleteAssessment}
            />
          </div>
        );

      case 'adminPayments':
        if (user?.role !== 'admin') {
          return (
            <div className="space-y-6 text-red-500">
              <button
                onClick={handleBackToDashboard}
                className="text-blue-600 hover:text-blue-500"
              >
                ← Back to Dashboard
              </button>
              <p>Access Denied: You must be an administrator to view this page.</p>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <button
              onClick={handleBackToDashboard}
              className="text-blue-600 hover:text-blue-500"
            >
              ← Back to Dashboard
            </button>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simulated Payment Dashboard</h2>
            <p className="text-gray-600 mb-6">
              This section simulates a payment dashboard. All data is mock, and actions like refunds are frontend-only simulations. Real-time payment integration requires a secure backend.
            </p>

            {/* Simulate New Incoming Payment Button */}
            <button
              onClick={handleSimulateIncomingPayment}
              className="btn-secondary w-full mt-4"
              type="button"
            >
              Simulate New Incoming Payment
            </button>

            {/* Filters Section */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    id="statusFilter"
                    name="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="userFilter" className="block text-sm font-medium text-gray-700">User ID</label>
                  <input
                    type="text"
                    id="userFilter"
                    name="userFilter"
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., user_abc"
                  />
                </div>
                <div>
                  <label htmlFor="dateRangeFilter" className="block text-sm font-medium text-gray-700">Date Range</label>
                  <input
                    type="date"
                    id="dateRangeFilter"
                    name="dateRangeFilter"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Transactions List */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTransactions.map((txn) => (
                      <tr key={txn.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{txn.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.userId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Number(txn.amount || 0).toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            txn.status === 'completed' ? 'bg-green-100 text-green-800' :
                            txn.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            txn.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {txn.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(txn.date).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleRefund(txn.id)}
                            className={`text-blue-600 hover:text-blue-900 ${txn.status === 'completed' ? '' : 'opacity-50 cursor-not-allowed'}`}
                            disabled={txn.status !== 'completed'}
                          >
                            Refund
                          </button>
                          {txn.status === 'pending' && user?.role === 'admin' && (
                            <button
                              onClick={() => handleConfirmPayment(txn.id)}
                              className="ml-2 text-green-600 hover:text-green-900"
                            >
                              Confirm
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Real-time Webhook Updates Placeholder */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Real-time Webhook Updates (Simulated)</h3>
              <p className="text-gray-600">
                In a real application, this section would display real-time updates pushed from the backend via webhooks or WebSockets, showing new transactions or status changes as they occur.
              </p>
              <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50 text-gray-700">
                <p className="font-mono text-sm">[Simulated webhook events will appear here]</p>
                <p className="font-mono text-sm mt-1">- New Transaction: txn_005, amount: $19.99, status: completed (mock)</p>
                <p className="font-mono text-sm mt-1">- Transaction txn_002 status updated to: completed (mock)</p>
              </div>
            </div>
          </div>
        );

      case 'paymentPending': // New view for pending payments
        return (
          <div className="bg-white shadow rounded-lg p-6 space-y-4 max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold text-yellow-600 mb-4">Payment Pending</h2>
            <p className="text-gray-700 mb-4">
              Your payment for the assessment is currently pending and requires admin confirmation.
              Please wait for an administrator to approve your transaction.
            </p>
            <p className="text-sm text-gray-600">
              You will be able to access the assessment once the payment is confirmed.
            </p>
            <button
              onClick={handleBackToDashboard}
              className="btn-primary w-full mt-4"
            >
              ← Back to Dashboard
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {renderView()}
    </div>
  );
};

export default SelfAssessmentPage; 