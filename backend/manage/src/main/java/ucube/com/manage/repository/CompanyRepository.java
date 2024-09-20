package ucube.com.manage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ucube.com.manage.model.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {
   List<Company> findByCompanyNmContains(String companyNm);

}
