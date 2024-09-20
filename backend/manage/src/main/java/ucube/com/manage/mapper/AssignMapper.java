package ucube.com.manage.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import ucube.com.manage.model.Assign;
import ucube.com.manage.model.ProjectInfo;

@Mapper
public interface AssignMapper {

  public List<ProjectInfo> listProject();

  public List<ProjectInfo> listCompany();

  public List<Assign> listAssign(String assignMonth);

  public Optional<Assign> findById(HashMap map);

  public List<Assign> listLikeAssign(HashMap map);

  public int saveAssign(Assign assign);

  public int updateAssign(Assign assign);

  public int deleteAssign(HashMap map);
}
