package ucube.com.manage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ucube.com.manage.mapper.AssignMapper;
import ucube.com.manage.model.Assign;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssignService {
  private final AssignMapper assignMapper;

  public List<Assign> BpPersonList(String pjtNo, String companyNo) {
    return assignMapper.listBpPersonList(pjtNo, companyNo);
  }

  public Optional<Assign> BpPerson(String pjtNo, String companyNo, String bpPerson) {
    return assignMapper.BpPerson(pjtNo, companyNo, bpPerson);
  }

  public List<Assign> AssignList(String assignMonth) {
    return assignMapper.listAssign(assignMonth);
  }

  public Optional<Assign> AssignQuery(HashMap map) {
    return assignMapper.findById(map);
  }

  public List<Assign> AssignLikeList(HashMap map) {
    return assignMapper.listLikeAssign(map);
  }

  public int AssignSave(Assign assign) {
    return assignMapper.saveAssign(assign);
  }

  public int AssignUpdate(Assign assign) {
    return assignMapper.updateAssign(assign);
  }

  public int AssignDelete(HashMap map) {
    return assignMapper.deleteAssign(map);
  }
}
