package ucube.com.manage.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ucube.com.manage.model.Project;
import ucube.com.manage.repository.ProjectRepository;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
  // private final ProjectMapper projectMapper;

  public List<Project> projectList() {
      return projectRepository.findAll();
  }

  public Optional<Project> projectQuery(String pjtNo) {
    // return projectRepository.findById(pjtNo)
    //     .orElseThrow(() -> new IllegalArgumentException("검색조건을 확인하세요!!"));
    return projectRepository.findById(pjtNo);
  }

  public List<Project> projectLikelist(String pjtNm) {
      // query creation
      return projectRepository.findByPjtNmContains(pjtNm);
  }

  public Project projectSave(Project project) {
      return projectRepository.save(project);
  }

  public Project projectUpdate(Project project) {
      // Project projectEntity = projectRepository.findById(pjtNo)
      //     .orElseThrow(() -> new IllegalArgumentException("검색조건을 확인하세요!!"));

      // projectEntity.setPjtNm(project.getPjtNm());
      // projectEntity.setStartDt(project.getStartDt());
      // projectEntity.setEndDt(project.getEndDt());
      // projectEntity.setTerm(project.getTerm());
      // projectEntity.setPm(project.getPm());
      // projectEntity.setPosition(project.getPosition());

      // return projectEntity;
      // return Project projectEntity = projectRepository.findById(pjtNo);

      return projectRepository.save(project);
  }

  public String projectDelete(String pjtNo) {
    projectRepository.deleteById(pjtNo);
    return "Delete OK";
  }
}
