package ucube.com.manage.model;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Monitor {

  private String rowNum;
  private String pjtNo;
  private String pjtNm;
  private String signMonth;
  private String companyNo;
  private String companyNm;
  private String orderOrg;
  private String startDt;
  private String endDt;
  private String pm;
  private String position;
  private String term;
  private String totMm;
  private String bpPerson;
  private String grade;
  private BigDecimal totAmt;
  private BigDecimal price;
  private BigDecimal sumPrice;
  private String contractMm;
  private String assignMm;
  private String signMm;

}
