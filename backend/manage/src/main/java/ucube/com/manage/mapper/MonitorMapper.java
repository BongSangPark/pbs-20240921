package ucube.com.manage.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ucube.com.manage.model.Monitor;

@Mapper
public interface MonitorMapper {

  public List<Monitor> listMonitor(HashMap map);

  public List<Monitor> listBpContract(String pjtNo, String companyNo);

  public List<Monitor> listBpAssign(String pjtNo, String companyNo);

  public List<Monitor> listBpSign(String pjtNo, String companyNo);

  // public Optional<Monitor> findById(HashMap map);

}
