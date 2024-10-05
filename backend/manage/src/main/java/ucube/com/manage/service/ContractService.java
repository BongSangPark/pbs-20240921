package ucube.com.manage.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ucube.com.manage.mapper.ContractMapper;
import ucube.com.manage.model.Contract;
import ucube.com.manage.model.ProjectInfo;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContractService {
  // private final ContractRepository contractRepository;
  private final ContractMapper contractMapper;

  public List<ProjectInfo> projectList() {
    return contractMapper.listProject();
  }

  public List<ProjectInfo> companyList() {
    return contractMapper.listCompany();
  }

  public List<ProjectInfo> contractCompanyList(String pjtNo) {
    return contractMapper.listContractCompany(pjtNo);
  }

  public List<Contract> ContractList() {
    return contractMapper.listContract();
  }

  public Optional<Contract> ContractQuery(String contract_idx) {
    return contractMapper.findById(contract_idx);
  }

  public List<Contract> ContractLikeList(HashMap map) {
    return contractMapper.listLikeContract(map);
  }

  public int ContractSave(Contract contract) {
    return contractMapper.saveContract(contract);
  }

  public int ContractUpdate(Contract contract) {
    return contractMapper.updateContract(contract);
  }

  public int ContractDelete(String contract_idx) {
    return contractMapper.deleteContract(contract_idx);
  }
}
