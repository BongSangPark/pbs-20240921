package ucube.com.manage.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "sign")
@Table(name = "sign_tb")
public class Sign {

  @Id
  private int sign_idx;
  private String pjtNo;
  private String pjtNm;
  private String signMonth;
  private String companyNo;
  private String companyNm;
  private String bpPerson;
  private String grade;
  private String birth;
  private String startDt;
  private String endDt;
  private BigDecimal signMm;
  private BigDecimal price;
  private BigDecimal sumPrice;

}
