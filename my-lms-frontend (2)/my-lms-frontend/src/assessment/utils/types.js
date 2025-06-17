// Assessment Types
export const ASSESSMENT_TYPES = {
  LIKERT: 'likert',
  POINT_BASED: 'point_based'
};

// Timer Types
export const TIMER_TYPES = {
  PER_QUESTION: 'per_question',
  FULL_TEST: 'full_test',
  NONE: 'none'
};

// Score Range Interface
export const SCORE_RANGES = {
  EXCELLENT: { min: 90, max: 100, label: 'Excellent', color: 'green' },
  GOOD: { min: 70, max: 89, label: 'Good', color: 'blue' },
  AVERAGE: { min: 50, max: 69, label: 'Average', color: 'yellow' },
  NEEDS_IMPROVEMENT: { min: 0, max: 49, label: 'Needs Improvement', color: 'red' }
};

// Assessment Question Interface
export const createQuestion = ({
  id,
  text,
  type = ASSESSMENT_TYPES.LIKERT,
  options = [],
  points = 1,
  timeLimit = 0,
  correctAnswer,
  branchLogic
}) => ({
  id,
  text,
  type,
  options,
  points,
  timeLimit,
  correctAnswer,
  branchLogic
});

// Assessment Interface
export const createAssessment = ({
  id,
  title,
  description,
  type = ASSESSMENT_TYPES.LIKERT,
  questions = [],
  timerType = TIMER_TYPES.NONE,
  totalTime = 0,
  passingScore = 70,
  isFree = true,
  couponCode = null,
  price = 0
}) => ({
  id,
  title,
  description,
  type,
  questions,
  timerType,
  totalTime,
  passingScore,
  isFree,
  couponCode,
  price,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}); 