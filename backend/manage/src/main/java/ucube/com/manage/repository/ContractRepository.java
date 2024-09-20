package ucube.com.manage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ucube.com.manage.model.Contract;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Integer> {
   // List<Contract> findByContractNmContains(String ContractNm);

}
