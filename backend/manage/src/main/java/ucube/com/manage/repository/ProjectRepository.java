package ucube.com.manage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ucube.com.manage.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, String> {

    List<Project> findByPjtNmContains(String pjtNm);

}
