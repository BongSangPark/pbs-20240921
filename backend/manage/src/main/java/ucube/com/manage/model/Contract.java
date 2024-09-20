package ucube.com.manage.model;

import java.math.BigDecimal;

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
@Entity(name = "Contract")
@Table(name = "contract_tb")
public class Contract {

  @Id
  private int contract_idx;
  private String pjtNo;
  private String pjtNm;
  private String companyNo;
  private String companyNm;
  private String leader;
  private String bpPerson;
  private String grade;
  private String birth;
  private String startDt;
  private String endDt;
  private String contractMm;
  private BigDecimal price;
  private BigDecimal sumPrice;

}
