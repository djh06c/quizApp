package dk.ek.vinderneafquizzen.service;

import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Service
public class QuizService {

    public LocalDate getCurrentQuizDate(){
        LocalDate today = LocalDate.now();
        DayOfWeek target = DayOfWeek.WEDNESDAY;

        int diff = target.getValue() - today.getDayOfWeek().getValue();
        if (diff < 0) {
            diff += 7;
        }

        return today.plusDays(diff);
    }
}
