package dk.ek.vinderneafquizzen.controller;

import dk.ek.vinderneafquizzen.service.QuizService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
public class QuizInfoController {

    private final QuizService quizService;

    public QuizInfoController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/date")
    public Map<String, String> getQuizDate(){
        LocalDate quizDate = quizService.getCurrentQuizDate();
        return Map.of("quizDate", quizDate.toString());
    }
}
