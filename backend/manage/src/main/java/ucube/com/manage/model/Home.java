package ucube.com.manage.model;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Home {

  private int rowNum;
  private String pjtNo;
  private String pjtNm;
  private String orderOrg;
  private String companyNo;
  private String companyNm;
  private String startDt;
  private String endDt;
  private BigDecimal totAmt;
  private int totMm;
  private String contractGrade;
  private int contractMm;
  private String assignGrade;
  private int assignMm;
  private String signGrade;
  private int signMm;

}
