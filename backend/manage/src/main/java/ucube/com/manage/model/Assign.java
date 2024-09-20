package ucube.com.manage.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Assign")
@Table(name = "assign_tb")
public class Assign {

  @Id
  private int assign_idx;
  private String pjtNo;
  private String pjtNm;
  private String assignMonth;
  private String companyNo;
  private String companyNm;
  private String bpPerson;
  private String grade;
  private String birth;
  private String startDt;
  private String endDt;
  private String assignMm;

}
