package ucube.com.manage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ucube.com.manage.mapper.MonitorMapper;
import ucube.com.manage.model.Home;
import ucube.com.manage.model.Monitor;

@Service
@RequiredArgsConstructor
@Slf4j
public class MonitorService {
  private final MonitorMapper monitorMapper;

  public List<Monitor> monitorList(HashMap map) {
    return monitorMapper.listMonitor(map);
  }

  public List<Monitor> contractBpList(String pjtNo, String companyNo) {
    return monitorMapper.listBpContract(pjtNo, companyNo);
  }

  public List<Monitor> assignBpList(String pjtNo, String companyNo) {
    return monitorMapper.listBpAssign(pjtNo, companyNo);
  }

  public List<Monitor> signBpList(String pjtNo, String companyNo) {
    return monitorMapper.listBpSign(pjtNo, companyNo);
  }

  public List<Home> homeList(HashMap map) {
    return monitorMapper.listHome(map);
  }

  // public Optional<Monitor> signQuery(HashMap map) {
  //   return monitorMapper.findById(map);
  // }

}
