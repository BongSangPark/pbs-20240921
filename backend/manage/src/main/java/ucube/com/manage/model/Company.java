package ucube.com.manage.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Company")
@Table(name = "company_tb")
public class Company {

  @Id
  @OrderBy("companyNo asc")
  private String companyNo;
  private String companyNm;
  private String leader;
  private String companyTel;
  private String companyAddr;
  private String salesLeader;
  private String position;
  private String salesTel;

}
