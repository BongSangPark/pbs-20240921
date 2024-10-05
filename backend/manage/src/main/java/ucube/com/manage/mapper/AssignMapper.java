package ucube.com.manage.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import ucube.com.manage.model.Assign;

@Mapper
public interface AssignMapper {

  public List<Assign> listBpPersonList(String pjtNo, String companyNo);
  public Optional<Assign> BpPerson(String pjtNo, String companyNo, String bpPerson);

  public List<Assign> listAssign(String assignMonth);

  public Optional<Assign> findById(HashMap map);

  public List<Assign> listLikeAssign(HashMap map);

  public int saveAssign(Assign assign);

  public int updateAssign(Assign assign);

  public int deleteAssign(HashMap map);

}
