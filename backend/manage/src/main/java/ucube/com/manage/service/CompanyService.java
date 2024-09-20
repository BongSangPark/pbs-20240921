package ucube.com.manage.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ucube.com.manage.model.Company;
import ucube.com.manage.repository.CompanyRepository;

@Service
@RequiredArgsConstructor
public class CompanyService {
  private final CompanyRepository companyRepository;
  // private final ProjectMapper projectMapper;

  public List<Company> companyList() {
    return companyRepository.findAll();
  }

  public Optional<Company> companyQuery(String companyNo) {
    return companyRepository.findById(companyNo);
  }

  public List<Company> companyLikelist(String companyNm) {
    // query creation
    return companyRepository.findByCompanyNmContains(companyNm);
  }

  public Company companySave(Company company) {
    return companyRepository.save(company);
  }

  public Company companyUpdate(Company company) {
    return companyRepository.save(company);
  }

  public String companyDelete(String companyNo) {
    companyRepository.deleteById(companyNo);
    return "Delete OK";
  }
}
