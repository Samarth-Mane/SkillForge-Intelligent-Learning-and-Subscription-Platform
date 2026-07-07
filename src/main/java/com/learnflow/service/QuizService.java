package com.learnflow.service;

import com.learnflow.dto.response.QuizResponse;
import com.learnflow.dto.response.QuizResultResponse;
import com.learnflow.entity.*;
import com.learnflow.exception.ResourceNotFoundException;
import com.learnflow.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final AuthService authService;

    public QuizService(QuizRepository quizRepository,
                       QuizAttemptRepository quizAttemptRepository,
                       AuthService authService) {
        this.quizRepository = quizRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.authService = authService;
    }

    public QuizResponse getQuizByCourse(Long courseId) {
        Quiz quiz = quizRepository.findByCourseId(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found for course: " + courseId));
        return toResponse(quiz);
    }

    @Transactional
    public QuizResultResponse submitQuiz(Long quizId, Map<Long, Integer> answers) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz", quizId));

        List<Question> questions = quiz.getQuestions();
        int correct = 0;
        for (Question q : questions) {
            Integer selected = answers.get(q.getId());
            if (selected != null && selected.equals(q.getCorrectOption())) {
                correct++;
            }
        }

        int total = questions.size();
        int score = total > 0 ? (int) ((correct * 100.0) / total) : 0;
        boolean passed = score >= quiz.getPassMark();

        User user = authService.getCurrentUser();
        QuizAttempt attempt = new QuizAttempt(user, quiz, score, correct, total, passed);
        quizAttemptRepository.save(attempt);

        return new QuizResultResponse(score, correct, total, passed, attempt.getAttemptedAt());
    }

    public QuizResultResponse getBestResult(Long quizId) {
        Long userId = authService.getCurrentUserId();
        return quizAttemptRepository
                .findTopByUserIdAndQuizIdOrderByScoreDesc(userId, quizId)
                .map(a -> new QuizResultResponse(
                        a.getScore(), a.getCorrectAnswers(),
                        a.getTotalQuestions(), a.getPassed(), a.getAttemptedAt()))
                .orElseThrow(() -> new ResourceNotFoundException("No attempt found"));
    }

    public QuizResponse toResponse(Quiz q) {
        long attempts = quizAttemptRepository.countByQuizId(q.getId());
        Double avgScore = quizAttemptRepository.findAverageScoreByQuizId(q.getId());

        List<QuizResponse.QuestionData> questionList = q.getQuestions().stream()
                .map(question -> {
                    QuizResponse.QuestionData qd = new QuizResponse.QuestionData();
                    qd.setId(question.getId());
                    qd.setText(question.getText());
                    qd.setOptions(question.getOptions());
                    qd.setCorrectOption(question.getCorrectOption());
                    qd.setQuestionOrder(question.getQuestionOrder());
                    return qd;
                }).toList();

        QuizResponse r = new QuizResponse();
        r.setId(q.getId());
        r.setTitle(q.getTitle());
        r.setTimeLimit(q.getTimeLimit());
        r.setPassMark(q.getPassMark());
        r.setCourseId(q.getCourse().getId());
        r.setCourseName(q.getCourse().getTitle());
        r.setQuestions(questionList);
        r.setTotalAttempts(attempts);
        r.setAvgScore(avgScore);
        return r;
    }
}
