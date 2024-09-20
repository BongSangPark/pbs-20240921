package ucube.com.manage.model;

import java.math.BigDecimal;
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
@Entity(name = "Project")
@Table(name = "project_tb")
public class Project {

  @Id
  @OrderBy("pjtNo asc")
  private String pjtNo;
  private String pjtNm;
  private String orderOrg;
  private String startDt;
  private String endDt;
  private String term;
  private String pm;
  private String position;
  private BigDecimal totAmt;
  private BigDecimal totMm;

}
