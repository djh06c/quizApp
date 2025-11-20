package dk.ek.vinderneafquizzen.controller;

import dk.ek.vinderneafquizzen.model.Deltager;
import dk.ek.vinderneafquizzen.repository.DeltagerRepo;
import dk.ek.vinderneafquizzen.service.QuizService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DeltagerController {

    private final DeltagerRepo repo;
    private final QuizService quizService;

    public DeltagerController(DeltagerRepo repo, QuizService quizService){
        this.repo = repo;
        this.quizService = quizService;
    }

    @GetMapping("/deltagere")
    public List<Deltager> getAllForCurrentQuiz(){
        LocalDate quizDate = quizService.getCurrentQuizDate();
        return repo.findByQuizDate(quizDate);
    }

    @PostMapping("/deltagere")
    public Deltager opret(@RequestBody Deltager deltager){
        LocalDate quizDate = quizService.getCurrentQuizDate();
        deltager.setQuizDate(quizDate);
        return repo.save(deltager);
    }

    @DeleteMapping("/deltagere/{id}")
    public void slet(@PathVariable long id){
        repo.deleteById(id);
    }
}
