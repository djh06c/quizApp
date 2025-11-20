package dk.ek.vinderneafquizzen.repository;

import dk.ek.vinderneafquizzen.model.Deltager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DeltagerRepo extends JpaRepository<Deltager, Long> {
    List<Deltager> findByQuizDate(LocalDate quizDate);
}
